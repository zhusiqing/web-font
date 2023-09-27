import type { Context } from 'koa'
import { writeFile, mkdirp } from 'fs-extra'
import path from 'path'
import { parseFontFile } from '../utils/opentypeHandle'
import { responseHandle } from '../utils/responseHandle'
import { getUUID } from '../utils/uuid'
import { tempDirPath } from '../config'

const getFont = async (ctx:Context) => {
  ctx.body = '1,2,3,4,5,6,7,8,9,0'
}
const uploadFont = async (ctx:Context) => {
  const { file } = ctx
  const uuid = getUUID()
  const fontFilePath = path.join(tempDirPath, `${file.originalname}-${uuid}`)
  await mkdirp(tempDirPath)
  await writeFile(fontFilePath, file.buffer)
  const fileList = await parseFontFile(fontFilePath)
  ctx.body = responseHandle({
    fileList,
    id: uuid
  })
}
export default {
  getFont,
  uploadFont
}
