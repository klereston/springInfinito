import { Msg } from "../msg.model"
export interface UserInterface {
    id: number,
    password: string,
    fullName:  string,
    msg: Msg[]
  }