import opentype from 'opentype.js'

opentype.load('./src/assets/test.otf', (err, font) => {
  if (err) throw err;
  if (!font) {
    return
  }
  const len = font.numGlyphs || 0
  const charStrArr = []
  for (let index = 0; index < len; index++) {
    const element = font.glyphs.get(index) || {};
    if (element.unicode) {
      charStrArr.push({
        text: String.fromCharCode(element.unicode),
        unicode: element.unicode
      })
    }

  }
  console.log(len)
})
