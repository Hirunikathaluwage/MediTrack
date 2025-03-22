import express from 'express'
import { Register, VerifyEmail, Login } from '../controllers/Auth.js'

const AuthRoutes = express.Router()

AuthRoutes.post('/register', Register)
AuthRoutes.post('/verifyEmail', VerifyEmail)
AuthRoutes.post('/login', Login)
export default AuthRoutes