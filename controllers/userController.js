const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const saltRound = 10;
    //hashing password before saving it in db.
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);

    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = async (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};

const generateToken = (user) => {
  const payload = {
    // i put id and username from model because it is a unique (not nessasry) and i want username to appeare it in FE
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  //library that generate token contain payload and secret key
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};
