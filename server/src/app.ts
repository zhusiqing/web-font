import Koa from 'koa'
import kaoBodyParser from 'koa-bodyparser'
import koaHelmet from 'koa-helmet'
import koaStatic from 'koa-static'
import koaProxy from 'koa-proxies'
import path from 'path'
import router from './router'

const port = 5555

const app = new Koa()
app.proxy = true
app.use(koaHelmet())
app.use(koaStatic(path.join(__dirname, '../../dist')))
app.use(kaoBodyParser({
  formLimit: '1mb'
}))

app.use(router.routes()).use(router.allowedMethods())
app.use((ctx) => {
  ctx.body = '111111222333444444'
})
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})
