import { connect } from "mongoose";

async function dbConnect() {
  try {
    await connect(process.env.LINK_MONGO);
  } catch (error) {
    console.log(error.message);
  }
}

export default dbConnect;