import userModal from "../models/userModal.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { username, password, profile, email } = req.body;
    // check existing username
    const existUsername = new Promise((resolve, reject) => {
      userModal.findOne({ username }, (err, user) => {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use a unique username" });
        resolve();
      });
    });

    //  For existing emial
    const existEmail = new Promise((resolve, reject) => {
      userModal.findOne({ email }, (err, email) => {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Please use a unique email" });
        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new userModal({
                username,
                password: hashedPassword,
                profile: profile || "",
                email: email,
              });
              // return save result as a responce
              user
                .save()
                .then(() => {})
                .catch((err) => {
                  return res
                    .status(500)
                    .send({ err: "Enable to hashed password" });
                });
            })
            .catch((err) => {
              return res.status(500).send({ err: "Enable to hashed password" });
            });
        }
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const loginUser = async (req, res) => {
  res.status(200).json({ msg: "Login user success" });
};

export const getUser = async (req, res) => {
  res.status(200).json({ msg: "Get user success" });
};

export const updateUser = async (req, res) => {
  res.status(200).json({ msg: "Put user success" });
};

export const generateOTP = async (req, res) => {
  res.status(200).json({ msg: "OTP Generate success" });
};

export const verifyOTP = async (req, res) => {
  res.status(200).json({ msg: "OTP Verify success" });
};

export const createResetSession = async (req, res) => {
  res.status(200).json({ msg: "Reset Session Create success" });
};

export const resetPassword = async (req, res) => {
  res.status(200).json({ msg: "Password reset success" });
};

export const deleteUser = async (req, res) => {
  res.status(200).json({ msg: "Successfully delete the user" });
};
