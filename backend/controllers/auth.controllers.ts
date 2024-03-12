import bcrypt from "bcryptjs"
import { PrismaClient } from '@prisma/client'
import { User } from '../models/user.model'
import jwt from 'jsonwebtoken'

const JWT_SECRET="ASD123"
export const signup: any = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()
        
        const fullName = req.body.fullName
        const password = req.body.password

        console.log(fullName)

        const findUserInDb = async () => {
            const userexist = await prisma.user.findFirst({
                where: { fullName: fullName },
            })

            console.log(userexist)
            
            if(userexist) { 
                return true
            }else {
                return false
            }
        }

        if(await findUserInDb()){
            return res.status(400).json({error: "fullname already exists"})
        } else {
            //hash password later
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)

            //create a new user in db
            async function createUser() {
                const user = new User(0, hashedPassword, fullName, [])
                console.log(user)
                await prisma.user.create({
                    data: {
                        //id: 0,//user.id,
                        password: user.password,
                        fullName: user.fullName
                    }
                })
                return user
            }

            await createUser()
            .then(async (u) => {
                const userForId = await prisma.user.findFirst({
                    where: { fullName: u.fullName },
                })

                const user = new User(
                    43,
                    '$2a$10$cUagqGZsuz0cIiwngqRq4.jxxAbwYstcUT1YzxPMkfR66P4.GBKxi',
                    'Kaka',
                    []
                )


                //Generate JWT Token
                const token = jwt.sign({user}, JWT_SECRET, {
                    expiresIn: 7200 
                })
            
                console.log("Token creado: "+token)
            
                res.cookie("jwtCookie", token, {
                    maxAge: 60 * 60 * 4 * 1000,
                    httpOnly: false, //prevent XSS attacks cross-site scripting attacks
                    //sameSite: "strict" //CSRF attacks cross-site request forgery attacks
                })
            
                console.log("COOKIE CREADA")
                
                

                res.status(201).json({id: userForId?.id, fullName: u.fullName})
                await prisma.$disconnect()
            })
            .catch(async (e) => {
                console.error(e)
                res.status(400).json({error: "Invalid user data"})
                await prisma.$disconnect()
                //process.exit(1)
            })
        }
        
        
        
    } catch (error) {
        console.log("Error in signup controller: " + error)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const login: any = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()
        
        const fullName = req.body.fullName
        const password = req.body.password

        console.log(fullName, password)

        const findUserInDb = async () => {
            const userexist = await prisma.user.findFirst({
                where: {
                   fullName: fullName
               }
           });
        
           const bc = await bcrypt.compare(password, userexist?.password || "")
           console.log(userexist)
            
            if(!(userexist && bc)) { 
                return res.status(400).json({error: "Invalid username or password"}) 
            }

            console.log("the user id before create token: " + userexist.id)
            const id =  userexist.id
            

            res.status(200).json({id: userexist?.id, fullName: userexist.fullName})
        }

        await findUserInDb()
           
    } catch (error) {
        console.log("Error in login controller: " + error)
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