const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  console.log(ctx)
  ctx.body = '21231231231231'
})
app.listen(5005, () => {
  console.log('http://localhost:5005')
})
