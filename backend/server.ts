import express from "express";
//import { Server } from "socket.io"
//import { createServer } from "node:http"

import cors from 'cors'
import authRoutes from "./routes/auth.routes"
import connectToPrismaDB from "./db/connectToPrismaDB"
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
app.use(cors())


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

//Methods get and post
app.get('/', (_req, res) => {
  res.status(200).send(`<h1>hola mundo!</h1>`)
})

app.listen(PORT, () => {
  
  //Instance db
  connectToPrismaDB()

  console.log(`Server running on port ${PORT}`)
})
