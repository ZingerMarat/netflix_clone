import express from "express"
import { connectToDB } from "./config/db.js"

const app = express()

const PORT = 3000

app.get("/", (req, res) => {
  res.send("hi ;)")
})

app.listen(PORT, () => {
  connectToDB()
  console.log("Server is running on port:", PORT)
})
