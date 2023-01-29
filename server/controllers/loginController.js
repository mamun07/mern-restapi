import userModal from "../models/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// midleware for verify user
export const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;
    // check the user existance
    let exist = await userModal.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't Find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Opps! Authentication Error." });
  }
};

// POST: http://localhost:8080/register
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
                .then((result) =>
                  res.status(200).send({ msg: "User Register Successfully!" })
                )
                .catch((err) =>
                  res.status(500).send({ err: "Enable to hashed password" })
                );
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

// POST: http://localhost:8080/login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    userModal
      .findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((password) => {
            if (!password)
              return res.status(400).send({ error: "Don't have Password" });
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              process.env.JWT_SECRET,
              { expiresIn: "24" }
            );
            return res.status(200).send({
              msg: "Login Success...!",
              username: user.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password dose not match" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "User not Found!" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// GET: http://localhost:8080/user/username
export const getUser = async (req, res) => {
  const { username } = req.params;
  try {
    if (!username) return res.status(501).send({ error: "Invalid Username" });
    userModal.findOne({ username }, (err, user) => {
      if (err) return res.status(500).send({ err });
      if (!user)
        return res.status(501).send({ error: "Could not find the user" });

      const { password, ...rest } = Object.assign({}, user.toJSON());
      return res.status(201).send(rest);
    });
  } catch (error) {
    return res.status(404).send({ error: "Can not find user data" });
  }
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
