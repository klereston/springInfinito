import { Msg } from "../models/msg.model"
import { PrismaClient } from "@prisma/client"
import { User } from "../models/user.model"
import { SendMsg } from "../models/sendmsg.model"
import { ReceivedMsg } from "../models/receivedmsg.model"
import { ioConnection } from "../server"


export const sendMessage: any = async (req: any, res: any) => {
    
    try {
        const prisma = new PrismaClient()
        const {message} = req.body
        const {id: userToSendMsg } = req.params
        //const user: User = req.user
        //const senderId = user.id   //from token user.id
        
        const loggedInUserId = Number(req.body.user_id) //from token user.id
        
        const findUser = async () => {
            const user_db = await prisma.user.findUnique({
                where: {
                    id: loggedInUserId
                }
            })
            if(user_db){
                const user = new User(user_db.id, user_db.password, user_db.fullName, [])
                console.log("soy el puto user: "+user)
            

                    //Find the userToChat in db
                    const findUserToChatInDb = async () => {
                        const userexist = await prisma.user.findUnique({
                            where: {
                            fullName: userToSendMsg
                        }
                    });
                        
                        if(!(userexist)) { 
                            console.log("User to chat not in database")

                        }
                        console.log({id: userexist?.id, fullName: userexist?.fullName})
                        return userexist
                    }

                    await findUserToChatInDb()
                    .then(async (u)=>{
                        //create new user userToChat
                        if(u){
                            const userToChat = new User(u.id, u.password, u.fullName,[])
                        


                        //Saving My Own message sended in current USER db
                    async function sendMsgToDb() {
                        const sendMessageToUser = new SendMsg(userToChat.fullName , message)
                        await prisma.sendMessageToUser.create({
                            data: {
                                //id: 0,//msg.id,
                                userToSend: sendMessageToUser.userToSend,
                                sendMessage: sendMessageToUser.sendMessage
                            }
                        })
                        return sendMessageToUser
                    }

                    const messageSended = await sendMsgToDb()
                    console.log("messageSended success")



                    //Saving Send message in the USER to chat db
                    async function receivingMsgToDb() {
                        const receivedMessageFromUser = new ReceivedMsg(user.fullName , message)
                        await prisma.receivedMessageFromUser.create({
                            data: {
                                //id: 0,//msg.id,
                                whoSend: receivedMessageFromUser.whoSend,
                                receivedMessage: receivedMessageFromUser.receivedMessage
                            }
                        })
                        return receivedMessageFromUser
                    }

                    const messageReceived = await receivingMsgToDb()

                    //find the id of the just created received msg
                    async function findmessageReceivedIdInDb() {
                        const latestQuery = await prisma.receivedMessageFromUser.findMany({
                        orderBy: {
                            id: 'desc',
                        },
                        take: 1,
                    })
                
                console.log(latestQuery)
                return latestQuery
                }
                const latestMsgReceived = await findmessageReceivedIdInDb()
                console.log("this is the query latest msg received: "+latestMsgReceived[0].whoSend)        



                    //send a new msg to the userTochat db
                    async function createReceivedMsg(messageReceived: ReceivedMsg) {
                        const msg: Msg = new Msg(0,{userToSend:"", sendMessage:""}, messageReceived, userToChat, userToChat.id)
                        console.log("this is msg from createMsg: " + msg.author.id )

                        await prisma.msg.create({
                            data: {
                                //id: 0,//msg.id,
                                sendMessageToUserId: 1,    //1 the default message
                                receivedMessageId: latestMsgReceived[0].id,  //the id of the message send just created!
                                authorId: msg.authorId,
                            }
                        })
                        console.log("createReceivedMsg successfuly")
                        return msg
                    }

                    await createReceivedMsg(messageReceived)
                    .then(async (m) => {
                        //res.status(201).json({m})
                        await prisma.$disconnect()
                    })
                    .catch(async (e) => {
                        console.error(e)
                        res.status(400).json({error: "Invalid msg data"})
                        await prisma.$disconnect()
                        //process.exit(1)
                    })

                    //send a new msg to my own db
                    async function findmessageSendedIdInDb() {
                        const latestQuery = await prisma.sendMessageToUser.findMany({
                        orderBy: {
                            id: 'desc',
                        },
                        take: 1,
                    })
                
                console.log(latestQuery)
                return latestQuery
                }
                const latestMsgSended = await findmessageSendedIdInDb()
                console.log("this is the query latest msg send: "+latestMsgSended[0].userToSend)

                    async function createSendMsg(messageSended: SendMsg) {
                        console.log("Show the value of: "+JSON.stringify(messageSended))

                        const msg: Msg = new Msg(0, messageSended, {whoSend:"", receivedMessage:""}, user, loggedInUserId/*authorId*/)
                        console.log("this is msg from createMsg: " + msg.author.fullName )

                        await prisma.msg.create({
                            data: {
                                //id: 0,//msg.id,
                                sendMessageToUserId: latestMsgSended[0].id,  //the id of the message send just created!
                                receivedMessageId: 1,    //1 the default message
                                authorId: loggedInUserId //msg.authorId,
                                
                            }
                        })
                        return msg
                    }

                    await createSendMsg(messageSended)
                    .then(async (m) => {


                        //Create id to EACH user!! IO.on create connection
                        //socket.io listen what heppen to the connection server and client side
                        


                        //SOCKET IO, Send the message to other user here
                        // const receiverSocketId = getReceiverSocketId(userToSendMsg)
                        
                        //ioConnection.to(m.sendMessageToUser.userToSend).emit("newMessage",m.sendMessageToUser.sendMessage)
                        

                        res.status(201).json({m})
                        await prisma.$disconnect()
                    })
                    .catch(async (e) => {
                        console.error(e)
                        res.status(400).json({error: "Invalid msg data"})
                        await prisma.$disconnect()
                        //process.exit(1)
                    })

                    } else {
                        console.log("User to chat does not exist.")
                    }

                }).catch(async (e) => {
                    console.error(e)
                })
            }   

        }

    await findUser().then()
    .catch((e)=>{
        console.log("Error in logged user: "+e)
    })

    } catch (error) {
        res.status(500).json({message: "Error in message" + error})
    }
} 

//Result (201).json(m):
// {
//     "m": {
//       "id": 0,
//       "sendMessageToUser": {
//         "userToSend": "Kaka",
//         "sendMessage": "Que pasa x3"
//       },
//       "receivedMessageFromUser": {
//         "whoSend": "",
//         "receivedMessage": ""
//       },
//       "author": {
//         "id": 40,
//         "password": "$2a$10$H8QcWKuonnEtZsuokc1f2uxOn4Prmg0wJem.WkGCt1Vl94BwcdYuW",
//         "fullName": "Pepetico1",
//         "msg": []
//       },
//       "authorId": 40
//     }
//   }


export const getMessages = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()
        const {id: userToChatId} = req.params
        const loggedInUserId = Number(req.body.user_id) //from token user.id

        const messagesSended = await prisma.$queryRaw`
            SELECT SendMessageToUser.sendMessage
            FROM Msg
            INNER JOIN SendMessageToUser ON Msg.sendMessageToUserId=SendMessageToUser.id
                WHERE authorId = ${loggedInUserId} AND userToSend = ${userToChatId} AND SendMessageToUser.id > 1
            ;
        `

        //console.log({messagesSended:messagesSended})

        const receivedMessages = await prisma.$queryRaw`
            SELECT whoSend, ReceivedMessageFromUser.receivedMessage
            FROM Msg
            INNER JOIN ReceivedMessageFromUser ON Msg.receivedMessageId=ReceivedMessageFromUser.id
                WHERE authorId = ${loggedInUserId} AND whoSend = ${userToChatId} AND ReceivedMessageFromUser.id > 1
            ;
        `

        console.log("message sended: "+messagesSended)

        res.status(200).json({userId: loggedInUserId, chatWith: userToChatId, sendMessage: messagesSended, receivedMessage: receivedMessages})

    } catch (error) {
        res.status(500).json({error : "Internal sever error" })
    }
}









//find the author send msgs in db
        // async function findSendedMessagesInDbToUserFromUser() {
        //     const m = await prisma.msg.findMany({
        //         where: {
        //             authorId: senderId
        //         }
        //     })
     
        //     return m
        // }
        // const x = await findSendedMessagesInDbToUserFromUser()
        // console.log(x.map((m)=>m))

        // //find the messages between this two users
        // //one is the actual user logged and the user to connect(send msg)
        // //user to connect params

        // //find the send msgs in db
        // async function findSendedMessagesInDbToUser() {
        //     const messagesSended = await prisma.sendMessageToUser.findMany({
        //         where: {
        //             userToSend: userToChatId
        //         }
        //     })
     
        //     return messagesSended
        // }

        // //find the received msgs in db
        // async function findReceivedMessagesInDbFromUser() {
        //     const receivedMessages = await prisma.receivedMessageFromUser.findMany({
        //         where: {
        //             whoSend: userToChatId
        //         }
        //     })
     
        //     return receivedMessages
        // }

        // const messagesSended = await findSendedMessagesInDbToUser()
        // const receivedMessages = await findReceivedMessagesInDbFromUser()
        
        //console.log(messagesSended.map((m)=>m))