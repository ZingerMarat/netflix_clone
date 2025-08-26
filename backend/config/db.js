import mongoose from "mongoose"

export async function connectToDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Connected: ", conn.connection.host)
  } catch (err) {
    console.log("Error connecting to MongoDb", err.message)
    process.exit(1)
  }
}
