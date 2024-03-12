import { PrismaClient } from "@prisma/client"
import jwt from 'jsonwebtoken'
//import { User } from "../models/user.model"

const JWT_SECRET="ASD123"
export const getUserForSideBar = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()

        //const token = req.cookies
        //const token = req.body.token;
        console.log("token del user controller: ")
        console.log("Esta es la jwtCookie "+req.cookies)
        
        //const decoded = jwt.verify(token, JWT_SECRET);  
        //const strdecoded = JSON.stringify(decoded)
        //console.log("User id decoded: " +strdecoded[10])
        //console.log("User id decoded: " + (<any>decoded).userId)




        //const user: User = req.user
        const loggedInUserId = 43 //user.id   //from token user.id

        console.log("get user for chat req.user id "+loggedInUserId)

        //fetch all user from the database
        // const allUsers = await prisma.user.findMany(
        //     {
        //         where: {
        //             NOT: { id: loggedInUserId }
        //         }
        //     }
        // )

        const usersMessagesSended = await prisma.$queryRaw`
            SELECT DISTINCT userToSend
            FROM Msg
            INNER JOIN SendMessageToUser ON Msg.sendMessageToUserId=SendMessageToUser.id
            WHERE authorId = ${loggedInUserId} AND SendMessageToUser.id > 1
        ;`


        const usersReceivedMessages = await prisma.$queryRaw`
            SELECT DISTINCT whoSend
            FROM Msg
            INNER JOIN ReceivedMessageFromUser ON Msg.receivedMessageId=ReceivedMessageFromUser.id
            WHERE authorId = ${loggedInUserId} AND ReceivedMessageFromUser.id > 1
        ;`

        res.status(200).json({usersMessagesSended: usersMessagesSended, usersReceivedMessages: usersReceivedMessages})
    
    } catch (error) {

        res.status(500).json({ error: "Internal server error in get users" })
    }
}