import mongoose from "mongoose";
import config from "./config/key";

const mongoURI = config.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { dbName: "tuti" });
    console.log("mongoDB connected");
  } catch (err) {
    console.log(err);
  }
};

mongoose.connection.on("error", (err) => {
  console.log("mongoDB Error occurred", err);
});

export default connectDB;
