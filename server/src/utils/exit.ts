let isExiting = false
const tasks: ExitTaskFnType[] = []
export type ExitTaskFnType = (error: Error|unknown, callback?: () => void) => void
export const addExitTask = (fn: ExitTaskFnType) => tasks.push(fn)
const handleExit = (code: number, error?: Error|unknown) => {
  if (isExiting) return
  isExiting = true
  // 标记已经执行了退出动作，避免多次调用
  let hasDoExit = false
  const doExit = () => {
    if (hasDoExit) return
    hasDoExit = true
    process.nextTick(() => process.exit(code))
  }
  // 记录有多少个异步任务
  let asyncTaskCount = 0
  // 异步任务结束后，用户需要调用的回调
  let ayncTaskCallback = () => {
    process.nextTick(() => {
      asyncTaskCount--
      if (asyncTaskCount === 0) doExit()
    })
  }
  // 执行所有的退出任务

  tasks.forEach(taskFn => {
    // 如果 taskFn 函数的参数个数大于 1，认为传递了 callback 参数，是一个异步任务
    if (taskFn.length > 1) {
      asyncTaskCount++
      taskFn(error, ayncTaskCallback)
    } else {
      taskFn(error)
    }
  });

  // 如果存在异步任务
  if (asyncTaskCount > 0) {
      // 超过 10s 后，强制退出
      setTimeout(() => {
          doExit();
      }, 10 * 1000)
  } else {
      doExit()
  }

}

// 监听各种退出事件
process.addListener('exit', code => handleExit(code));
// 按照 POSIX 的规范，我们用 128 + 信号编号 得到最终的退出码
// 信号编号参考下面的图片，大家可以在 linux 系统下执行 kill -l 查看所有的信号编号
process.addListener('SIGHUP', () => handleExit(128 + 1));
process.addListener('SIGINT', () => handleExit(128 + 2));
process.addListener('SIGTERM', () => handleExit(128 + 15));
// windows 下按下 ctrl+break 的退出信号
process.addListener('SIGBREAK', () => handleExit(128 + 21));
// 退出码 1 代表未捕获的错误导致进程退出
process.addListener('uncaughtException', error => handleExit(1, error))
process.addListener('unhandledRejection', error => handleExit(1, error))
