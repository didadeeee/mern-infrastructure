const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

const create = async (req, res) => {
  const { password } = req.body;
  if (password.length < 3) {
    res.status(400).json({ message: "password too short" });
    return;
  }

  try {
    const user = await User.create(req.body);
    const payload = { user };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 });
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (password.length < 3) {
    res.status(400).json({ message: "password too short" });
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (user === null) {
      res.status(401).json({ message: "no user" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const payload = { user };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "wrong password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  create,
  login,
};
