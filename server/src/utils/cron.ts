import { schedule } from 'node-cron'
import { rmdir } from 'fs-extra'
import { tempDirPath } from '../config'
const task = schedule('0 4 * * *', () => {
  rmdir(tempDirPath)
})

export const startTask = () => task.start()
export const stopTask = () => task.stop()
