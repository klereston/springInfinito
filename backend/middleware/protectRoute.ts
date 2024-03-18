import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { User } from '../models/user.model'
import { UserInterface } from '../models/interfaces/userInterface'

const JWT_SECRET = "ASD123"
const protectRoute: any = async (req: any, res: any, next: any) => {
    const token = req.cookies.jwtCookie
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            
            //const user  = JSON.parse(String(decoded)) as UserInterface
            //console.log("este es el resultado del decoded: "+ user.id)
            //const u = new User(user.id, user.password, user.fullName, [])
            //req.user = u
            req.body.user_id = JSON.stringify((<any>decoded).user_id)
            console.log(req.body.user_id)
            next()
        } catch (error) {
            return res.status(401).json("Unautorized - No token Provided")
        }
    }
        // try {
        //     const prisma = new PrismaClient()

        // const token = req.cookies.jwtCookie
        // //const token = req.body.token;
        // console.log("token: "+ token)
        // const decoded = jwt.verify(token, JWT_SECRET);  
        // //const strdecoded = JSON.stringify(decoded)
        // //console.log("User id decoded: " +strdecoded[10])
        // console.log("User id decoded: " + (<any>decoded).userId)


        // if(!token){
        //     return res.status(401).json({error: "Unautorized - No token Provided"})
        // }

        // //const decoded = jwt.verify(token, JWT_SECRET)

        // if(!decoded){
        //     return res.status(401).json({error: "Unautorized - Invalid token"})
        // }

        // const findUserId = async () => {
        //     return await prisma.user.findFirst({
        //         where: { id: (<any>decoded).userId},
        //     })
        // }
        // const user = await findUserId()

        // console.log(user)

        // if(user){
        //     const u = new User(user.id, user.password, user.fullName, [])
        //     req.user = u
        // }

        // if(!user){
        //     return res.status(404).json({error: "User not found"})
        // }


        // //next means go to the next function if the token is valid,
        // //in the router.post('/send/:id', protectRoute ,sendMessage)
        // //go to sendMessage
        // next();

        // } catch (error) {
        //     res.status(500).json({error: "Internal server error (middleware)"})
        // }
    }

    export default protectRoute





// token.ts
// export interface TokenInterface {
//     user: {
//        email: string;
//        name: string;
//        userId: number;
//     };
//   }
//   and then you can cast using
//   
//   (decoded as TokenInterface)
//   
//   or more exactly in that case
//   return res.send({
//      user: (decoded as TokenInterface).user
//   });
