import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const userDoc = await User.findOne({ username })

    if (!userDoc) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    const isPasswordValid = bcryptjs.compareSync(password, userDoc.password)

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    if (userDoc) {
      const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

      res.cookie("token", token, {
        httpOnly: true,
        signed: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
    }

    const { password: _, ...userWithoutPassword } = userDoc.toObject()

    res.status(200).json({
      user: userWithoutPassword,
      message: "Login successful",
    })
  } catch (err) {
    console.log("Login Error: ", err.message)
    res.status(500).json({ message: "[Login Error] " + err.message || "Server error" })
  }
}

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

    const { password: _, ...userWithoutPassword } = newUser.toObject()

    res.status(201).json({
      user: userWithoutPassword,
      message: "User created successfully",
    })
  } catch (err) {
    console.log("Signup Error: ", err.message)
    res.status(500).json({ message: "[Signup Error]" + err.message || "Server error" })
  }
}

export const fetchUser = async (req, res) => {
  const userId = req.signedCookies.token
    ? jwt.verify(req.signedCookies.token, process.env.JWT_SECRET).id
    : null

  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const userDoc = await User.findById(userId).select("-password")

    if (!userDoc) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
      user: userDoc,
    })
  } catch (err) {
    console.log("Fetch User Error: ", err.message)
    res.status(500).json({ message: "[Fetch User Error] " + err.message || "Server error" })
  }
}

export const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) })
  res.status(200).json({ message: "Logout successful" })
}
