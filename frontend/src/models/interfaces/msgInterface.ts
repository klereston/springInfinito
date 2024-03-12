import { User } from "../user.model"
export interface MsgInterface {
    id: number,
    sendMessageToUser: { userToSend: string; sendMessage: string; };
    receivedMessageFromUser: {whoSend: string, receivedMessage: string},
    author: User,
    authorId: number
  }