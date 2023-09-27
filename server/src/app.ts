import Koa from 'koa'
import kaoBodyParser from 'koa-bodyparser'
import koaHelmet from 'koa-helmet'
import koaStatic from 'koa-static'
import koaProxy from 'koa-proxies'
import path from 'path'
import router from './router'
import { startTask, stopTask } from './utils/cron'
import { addExitTask } from './utils/exit'
import { responseHandle } from './utils/responseHandle'

const port = 5555

const app = new Koa()
app.proxy = true
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error: any) {
    console.log('catch error: ', error);
    if (error?.code) {
      ctx.body = responseHandle(null, error.code, error.message)
    }
  }
})
app.use(koaHelmet())
app.use(koaStatic(path.join(__dirname, '../../dist')))
app.use(kaoBodyParser({
  formLimit: '1mb'
}))

app.use(router.routes()).use(router.allowedMethods())

app.on('error', (err) => {
  console.log(err);
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  startTask()
  addExitTask(() => {
    stopTask()
  })
})
