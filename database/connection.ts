import mongoose from "mongoose";

const dbConnection = async () => {
  mongoose.connect(
    "mongodb+srv://artyom:1234@cluster0.wpr1947.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("database connected");
};

export default dbConnection;
