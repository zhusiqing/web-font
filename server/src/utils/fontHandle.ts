import FontMin from 'fontmin'
const fontmin = new FontMin().src('./src/assets/test.otf').use(FontMin.otf2ttf()).use(FontMin.glyph({
  text: '1234567890'
})).use(FontMin.ttf2svg()).dest('build/font1')
// use(FontMin.otf2ttf())
fontmin.run((err, files) => {
  if (err) throw err
  console.log(files);
})
