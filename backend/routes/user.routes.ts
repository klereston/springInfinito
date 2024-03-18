import express from 'express'
import protectRoute from '../middleware/protectRoute'
import { getAllUsers, getUserForSideBar } from '../controllers/user.controller'

const router = express.Router()

//Create controlers with the functions (req, res)
router.get('/conversations', protectRoute, getUserForSideBar)
router.get('/contacts', protectRoute, getAllUsers)
//router.get('/conversations', getUserForSideBar)

//-------------------------------------------

export default router