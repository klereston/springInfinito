import { SendMsgInterface } from "./interfaces/sendmsgInterface";

export class SendMsg implements SendMsgInterface {
    userToSend: string;
    sendMessage: string;
   
    constructor(userToSend: string, sendMessage: string){
        this.userToSend = userToSend
        this.sendMessage = sendMessage
    }
    
}