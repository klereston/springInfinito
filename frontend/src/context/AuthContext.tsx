import { createContext, useContext, useState } from "react";
//import { UserInterface } from "../models/interfaces/userInterface";

export const AuthContext = createContext<any>(null)

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({children}: any) => {
    type TparseData = {id:number, fullName:string}
    let parseData: TparseData
    if(localStorage.getItem("chat-user")){
        parseData = JSON.parse(localStorage.getItem("chat-user") || "")
        console.log("local storage data: "+parseData.id)
        const [authUser, setAuthUser] = useState(parseData)
        return <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    } else {
        const [authUser, setAuthUser] = useState(null)
        return <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    }
}


//JSON.parse(localStorage.getItem("chat-user") || "") || null

// {
//     id: 0,
//     password: "123",
//     fullName: "Prueba",
//     msg: []
// }

//JSON.parse(localStorage.getItem("chat-user") || "")