import Router from 'koa-router'
import controllers from './controllers'

const apiRouter = new Router()
apiRouter.get('/fonts', controllers.font.getFonts)

const router = new Router()
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

export default router
