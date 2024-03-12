import express from 'express'
import { sendMessage , getMessages } from '../controllers/message.controller'


const router = express.Router()

//Create controlers with the functions (req, res)
router.get('/send/:id' ,getMessages)
router.post('/send/:id' ,sendMessage)

//-------------------------------------------

export default router


