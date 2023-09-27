import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890qwertyuioplkjhgfdsazxcvbnm', 8)

export const getUUID = () => nanoid()
