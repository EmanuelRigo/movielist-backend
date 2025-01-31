import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect('mongodb://127.0.0.1:27017/movies');
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;