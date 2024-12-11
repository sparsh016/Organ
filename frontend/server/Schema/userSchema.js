import { mongoose, Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    hospitalname: {
      type: String,
      required: [true, "Name ris required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is requied"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
      unique: true,
    },
    username: {
      type: String,
      minlength: [3, "Username must be 3 letters long"],
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
