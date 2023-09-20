import type { Context } from 'koa'
const getFonts =async (ctx:Context) => {
  ctx.body = '1,2,3,4,5,6,7,8,9,0'
}
export default {
  getFonts
}
