import type { Context } from 'koa'
import { writeFile, mkdirp } from 'fs-extra'
import path from 'path'
import { Duplex } from 'stream'
import { parseFontFile } from '../utils/opentypeHandle'
import { responseHandle } from '../utils/responseHandle'
import { getUUID } from '../utils/uuid'
import { tempDirPath } from '../config'
import { getFilterFontFile} from '../utils/fontHandle'

enum ResponseCode {
  success = 0,
  errParams = 400001
}

enum FontFilter {
  INCLUDE = 1,
  EXCLUED
}

const getFont = async (ctx:Context) => {
  const { text, id, type = FontFilter.INCLUDE } = ctx.query
  if (!text) {
    ctx.body = responseHandle({}, ResponseCode.errParams, '字体文件不需要处理')
    return
  }
  if (!id) {
    ctx.body = responseHandle({}, ResponseCode.errParams, '字体文件处理异常，请重新上传文件')
    return
  }
  const { file, name, extname } = await getFilterFontFile(id as string, text as string)
  console.dir(file);
  ctx.set('Content-Disposition', `attachment; filename=${encodeURIComponent(name)}.${extname}`)
  ctx.set('filename', `${encodeURIComponent(name)}${extname}`)
  // console.log(file.byteLength);
  const stream = new Duplex()
  stream.push((file as any)._contents)
  stream.push(null)
  ctx.body = stream
}
const uploadFont = async (ctx:Context) => {
  const { file } = ctx
  const uuid = getUUID()
  const extname = path.extname(file.originalname)
  const filename = file.originalname.replace(extname, `-${uuid}${extname}`)
  const fontFilePath = path.join(tempDirPath, filename)
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
