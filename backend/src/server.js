import dotenv from "dotenv";dotenv.config();
import express from "express";
import cors from "cors";
import path from "path"
import cookieParser from "cookie-parser";
import { connectionDb } from "../lib/connectionDb.js";
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import chatRoute from "./routes/chatRoute.js"


const app = express();
const port = process.env.PORT

const __dirName = path.resolve()

app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/chat', chatRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirName, "../frontend/dist")))

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirName, "../frontend/dist/index.html"))
    })
}
 


app.listen(port, () => {
    connectionDb()
    console.log(`server is running on http://localhost:${port}`)
})
