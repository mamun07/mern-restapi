import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    require: [true, "Please provide unique username"],
    unique: [true, "Username already exist"],
  },
  password: {
    type: String,
    require: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    require: [true, "Please provide a unique emial"],
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
});

export default mongoose.model.Users || mongoose.model("Users", userSchema);
