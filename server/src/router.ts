import Router from '@koa/router'
import controllers from './controllers'
import multer from '@koa/multer'

const upload = multer()

const apiRouter = new Router()
apiRouter.get('/font', controllers.font.getFont)
apiRouter.post('/font', upload.single('file'), controllers.font.uploadFont)

const router = new Router()
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

export default router
