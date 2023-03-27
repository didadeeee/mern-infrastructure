const User = require("../models/User");

const create = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

module.exports = {
  create,
};
    