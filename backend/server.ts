import express from "express";
import { Server } from "socket.io"
import http from 'http'
//import { createServer } from "node:http"

import cors from 'cors'
import authRoutes from "./routes/auth.routes"
import messageRoutes from "./routes/message.routes"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes"

//Server port
const PORT = process.env.PORT || 5000

//Express
const app = express()
//const server = createServer(app)

// middleware transform the req.body to json
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded()) 
app.use(express.static('public'))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

//Socket.io
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin:['http://localhost:3000'],
    methods:['GET','POST']
  }
})

export const ioConnection:any = () => { 
    io.on('connection', (socket)=>{
    console.log("A User Connnected",socket.id)

    const userId = socket.handshake.query.userId
    if(userId){
      
    }

    socket.on('disconnect',()=>{
    console.log("This user disconnect", socket.id)
    })
  }) 
}

ioConnection()

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

//Methods get and post
app.get('/', (_req, res) => {
  res.status(200).send(`<h1>hola mundo!</h1>`)
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
