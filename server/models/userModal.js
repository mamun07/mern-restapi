import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    require: false,
  },
  phone: {
    type: Number,
    require: true,
    unique: true,
  },
});

const userModal = mongoose.model("user", userSchema);
export default userModal;
