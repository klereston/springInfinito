import express from 'express'
import { sendMessage , getMessages } from '../controllers/message.controller'
import protectRoute from '../middleware/protectRoute'


const router = express.Router()

//Create controlers with the functions (req, res)
router.get('/send/:id', protectRoute, getMessages)
router.post('/send/:id', protectRoute ,sendMessage)

//-------------------------------------------

export default router


