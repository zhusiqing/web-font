import { readdirSync, readFileSync, writeFileSync } from 'fs-extra'
import FontMin from 'fontmin'
import { tempDirPath } from '../config'
import { join, extname } from 'path'
import Fontmin from 'fontmin'

// const fontmin = new FontMin().src(join(__dirname, '../_temp/JMH-oda9mlx7.woff')).use(FontMin.otf2ttf()).use(FontMin.glyph({
//   text: '1234567890'
// })).dest('build/font1')
// use(FontMin.otf2ttf())
// fontmin.run((err, files) => {
//   if (err) throw err
//   console.log(files);
// })
// TODO: woff转ttf有问题
export const getFilterFontFile = (id: string, text: string) => {
  return new Promise<{ file: Buffer ,name: string, extname: string }>((resolve) => {
    const files = readdirSync(tempDirPath)
    // console.log(files);
    const file = files.find(file => file.indexOf(`-${id}`) !== -1)
    if (!file) {
      throw {
        code: -400,
        message: '文件不存在'
      };
    }
  const filePath = join(tempDirPath, file)
    let fontmin = new FontMin().src(filePath)
    if (extname(filePath) === '.otf') {
      fontmin = fontmin.use(FontMin.otf2ttf())
    }
    fontmin.use(FontMin.glyph({
      text
    })).run((err, files) => {
      if (err) throw err
      console.dir((files[0] as any).ttfObject.name.fontFamily);
      resolve({
        file: files[0],
        name: (files[0] as any).ttfObject.name.fontFamily,
        extname: extname(filePath)
      })
    })
  })

}
