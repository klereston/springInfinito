import { PrismaClient } from "@prisma/client"
// import jwt from 'jsonwebtoken'
// import { User } from "../models/user.model"

const JWT_SECRET="ASD123"
export const getUserForSideBar = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()
        //const {id: userToChatId} = req.params
        const loggedInUserId = Number(req.body.user_id) //from token user.id


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
        console.log(error)
        res.status(500).json({ error: "Internal server error in get users" })
    }
}




export const getAllUsers = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()
        //const {id: userToChatId} = req.params
        const loggedInUserId = Number(req.body.user_id) //from token user.id


        //fetch all user from the database
        const allUsers = await prisma.user.findMany(
            {
                where: {
                    NOT: { id: loggedInUserId }
                }
            }
        )

        res.status(200).json({allUsers:allUsers})
    
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error in get users" })
    }
}