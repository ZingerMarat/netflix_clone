import express from "express"
import { connectToDB } from "./config/db.js"
import dotenv from "dotenv"
import authRouter from "./routes/auth.router.js"

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3030

app.get("/", (req, res) => {
  res.send("hi ;)")
})

app.use("/auth", authRouter)

app.listen(PORT, () => {
  connectToDB()
  console.log("Server is running on port:", PORT)
})
