import userModal from "../models/userModal.js";

export const getUser = async (req, res) => {
  res.status(200).json({ msg: "Get user success" });
};

export const postUser = async (req, res) => {
  const postUserReq = req.body;
  const newUser = new userModal(postUserReq);
  try {
    await newUser.save();
    res.status(200).json({ msg: "User create Success" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const deleteUser = async (req, res) => {
  res.status(200).json({ msg: "Delete user success" });
};

export const putUser = async (req, res) => {
  res.status(200).json({ msg: "Put user success" });
};

export const patchUser = async (req, res) => {
  res.status(200).json({ msg: "Patch user success" });
};
