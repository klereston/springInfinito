import bcrypt from "bcryptjs"
import { PrismaClient } from '@prisma/client'
import { User } from '../models/user.model'
import jwt from 'jsonwebtoken'
import connectToPrismaDB from "../db/connectToPrismaDB"

const JWT_SECRET="ASD123"
export const signup: any = async (req: any, res: any) => {
    try {

        //INSTANCE DB
        const prisma = new PrismaClient()
        //REQUEST POST
        const {fullName, password} = req.body

        //FIND USER DB
        const findUserInDb = async () => {
            return await prisma.user.findFirst({
                where: { fullName: fullName },
        })}

        //OP 2
        findUserInDb().then(async (user_db)=>{
            if(!user_db){
                //hash password
                const salt = await bcrypt.genSalt()
                const hashedPassword = await bcrypt.hash(password, salt)
                
                //create a new user in db if not exist
                async function createUser() {
                    const user = new User(0, hashedPassword, fullName, [])
                        await prisma.user.create({
                            data: {
                                //id: 0,//user.id,
                                password: user.password,
                                fullName: user.fullName
                            }
                        })
                        return user
                    }
                
                await createUser().then(async (user) => {
                    const userForId = await prisma.user.findFirst({
                        where: { fullName: user.fullName },
                    })

                    //Create user for Cookie
                    const user_id = userForId!.id

                    //Generate JWT Token
                    const token = jwt.sign({user_id}, JWT_SECRET, {
                        expiresIn: '4h'
                    })

                    res.cookie("jwtCookie", token, {
                        maxAge: 60 * 60 * 4 * 1000,
                        httpOnly: false, //prevent XSS attacks cross-site scripting attacks
                        //sameSite: "strict" //CSRF attacks cross-site request forgery attacks
                    })

                    res.status(201).json({id: userForId!.id, fullName: userForId!.fullName})
                    await prisma.$disconnect()

                }).catch((error: Error)=>{
                    console.log("Error in db", error)
                })
            
            } else {
                return res.status(400).json({error: "User already exists"})
            }

        }).catch(async () => {
            res.status(400).json({error: "Invalid user data"})
            await prisma.$disconnect()
            }).finally(async ()=>{
                await prisma.$disconnect()
        })

    } catch (error) {
            res.status(500).json({error: "Internal Server Error"})
    }
}

export const login: any = async (req: any, res: any) => {
    try {
        //INSTANCE DB
        const prisma = new PrismaClient()
        //REQUEST POST
        const {fullName, password} = req.body

        //FIND USER DB
        const findUserInDb = async () => {
            return await prisma.user.findFirst({
                where: { fullName: fullName },
        })}

        //OP 2
        findUserInDb().then(async (user_db)=>{
           const bc = await bcrypt.compare(password, user_db?.password || "")
            
            if(!(user_db && bc)) { 
                return res.status(400).json({error: "Invalid username or password"}) 
            }

            //Create user for Cookie
            const user = new User(
                user_db.id,
                user_db.password,
                user_db.fullName,
                []
            )

            const user_id = user.id

            //Generate JWT Token and Cookie
            const token = jwt.sign({user_id}, JWT_SECRET, {
                expiresIn: '4h'
            })

            res.cookie("jwtCookie", token, {
                maxAge: 60 * 60 * 4 * 1000,
                httpOnly: false, //prevent XSS attacks cross-site scripting attacks
                sameSite: "none" //CSRF attacks cross-site request forgery attacks
            })
            

            res.status(200).json({id: user.id, fullName: user.fullName})
        
        }).catch(async () => {
            res.status(400).json({error: "Invalid user data"})
            await prisma.$disconnect()
            }).finally(async ()=>{
                await prisma.$disconnect()
        })
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const logout: any = (req: any, res: any) => {
    try {
        res.cookie("jwt","",{maxAge: 0})
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller: " + error)
        res.status(500).json({error: "Internal Server Error"})
    }
}




// const prismadb = async () => {
//     const allUsers = await prisma.user.findMany()
//     console.log(allUsers)
// }
// prismadb()