import type { Context } from 'koa'
import { writeFile, mkdirp } from 'fs-extra'
import path from 'path'
import { parseFontFile } from '../utils/opentypeHandle'
import { responseHandle } from '../utils/responseHandle'
const tempPath = path.join(__dirname, '../_temp')

const getFont = async (ctx:Context) => {
  ctx.body = '1,2,3,4,5,6,7,8,9,0'
}
const uploadFont = async (ctx:Context) => {
  const { file } = ctx
  const fontFilePath = path.join(tempPath, file.originalname)
  const r1 = await mkdirp(tempPath)
  const r2 = await writeFile(fontFilePath, file.buffer)
  const fileList = await parseFontFile(fontFilePath)
  ctx.body = responseHandle(fileList)
}
export default {
  getFont,
  uploadFont
}
