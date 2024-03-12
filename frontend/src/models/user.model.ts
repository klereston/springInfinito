import { Msg } from "./msg.model"
import { UserInterface } from "./interfaces/userInterface"

export class User implements UserInterface {
    id: number
    password: string
    fullName: string
    msg: Msg[]

    constructor(id: number,password: string,fullName: string, msg: Msg[]){
        this.id = id
        this.password = password
        this.fullName = fullName
        this.msg = msg
    }
}

// id: number,
//     password: string,
//     fullName:string,
//     msg: Msg[]