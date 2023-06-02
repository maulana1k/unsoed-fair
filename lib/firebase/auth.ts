import app from './config'
import { getAuth } from 'firebase/auth'

const auth = getAuth(app)
export default auth
