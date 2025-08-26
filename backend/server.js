import express, { json } from "express"
import { connectToDB } from "./config/db.js"
import dotenv from "dotenv"
import User from "./models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3030

app.get("/", (req, res) => {
  res.send("hi ;)")
})

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body

  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required")
    }

    const emailExists = await User.findOne({ email })
    const userNameExists = await User.findOne({ username })

    if (emailExists) {
      return res.status(400).json({ message: "User already exists." })
    }
    if (userNameExists) {
      return res.status(400).json({ message: "Username is taken, try another name" })
    }

    //hashed password
    const hashedPassword = await bcryptjs.hash(password, 10)

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    })

    //JWT
    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" })
    }

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    res.status(201).json({ email: newUser.email, message: "User created successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" })
  }
})

app.listen(PORT, () => {
  connectToDB()
  console.log("Server is running on port:", PORT)
})
