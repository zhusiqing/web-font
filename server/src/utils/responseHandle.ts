export const responseHandle = <T> (data: T, code = 0, message = 'success') => ({
  data,
  code,
  message
})
