import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const login = (req, res) => {}

export const signup = async (req, res) => {
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
      signed: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production" ? true : false,
    })

    res.status(201).json({
      username: newUser.username,
      email: newUser.email,
      message: "User created successfully",
    })
  } catch (err) {
    res.status(500).json({ message: "[Signup Error]" + err.message || "Server error" })
  }
}
