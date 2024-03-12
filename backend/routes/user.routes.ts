import express from 'express'
//import protectRoute from '../middleware/protectRoute'
import { getUserForSideBar } from '../controllers/user.controller'

const router = express.Router()

//Create controlers with the functions (req, res)
//router.get('/conversations', protectRoute, getUserForSideBar)
router.get('/conversations', getUserForSideBar)

//-------------------------------------------

export default router