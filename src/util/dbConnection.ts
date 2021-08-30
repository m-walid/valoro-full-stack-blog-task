import mongoose from "mongoose";
const mongodbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v2vx2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export async function connectToDb() {
  try {
    await mongoose.connect(mongodbUrl);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
}
