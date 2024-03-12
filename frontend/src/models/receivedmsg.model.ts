import { ReceivedMsgInterface } from "./interfaces/receivedmsgInterface";

export class ReceivedMsg implements ReceivedMsgInterface {
    whoSend: string;
    receivedMessage: string;
    
    constructor(whoSend: string, receivedMessage: string){
        this.whoSend = whoSend;
        this.receivedMessage = receivedMessage;
    }
}