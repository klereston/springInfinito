import express from 'express'
import { login, logout, signup } from '../controllers/auth.controllers'

const router = express.Router()

//Create controlers with the functions (req, res)
router.post('/signup', signup)
router.post('/login', login)   
router.post('/logout', logout)
//-------------------------------------------

export default router