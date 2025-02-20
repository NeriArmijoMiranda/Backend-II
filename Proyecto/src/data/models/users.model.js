import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
    avatar: { type: String, default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
    },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;