import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    connect(process.env.MONGO_URL);
    console.log("mongo database connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;