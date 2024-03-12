import { User } from "./user.model"
import { MsgInterface } from "./interfaces/msgInterface";

export class Msg implements MsgInterface {
    id: number;
    sendMessageToUser: { userToSend: string; sendMessage: string; };
    receivedMessageFromUser: { whoSend: string; receivedMessage: string; };
    author: User;
    authorId: number;

    constructor( 
        id: number,
        sendMessageToUser: { userToSend: string; sendMessage: string; },
        receivedMessageFromUser: { whoSend: string; receivedMessage: string; },
        author: User,
        authorId: number){ 

        this.id = id
        this.sendMessageToUser =  sendMessageToUser;
        this.receivedMessageFromUser = receivedMessageFromUser;
        this.author = author;
        this.authorId = authorId;
    }
    
}