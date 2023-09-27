import opentype from 'opentype.js'

export const parseFontFile = async (path: string) => {
  const font = await opentype.load(path)
  if (!font) {
    return
  }
  const len = font.numGlyphs || 0
  const charStrArr = []
  for (let index = 0; index < len; index++) {
    const element = font.glyphs.get(index) || {};
    if (element.unicode) {
      const text = String.fromCharCode(element.unicode).trim()
      text && charStrArr.push({
        text,
        unicode: element.unicode
      })
    }

  }
  return charStrArr
}


