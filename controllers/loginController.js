const asyncHander = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// @desc Register Page
// @route GET /register
const getRegister = (req, res) => {
  res.render('register');
};

// @desc Register user
// @route POST /register
const registerUser = asyncHander(async (req, res) => {
  const { username, password, password2 } = req.body;
  if (password === password2) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'Register successful', user });
  } else {
    res.send('Register Failed');
  }
});

// @desc Get login page
// @route GET/
const getLogin = (req, res) => {
  res.render('home');
};

// @desc Login user
// @route POST /
const loginUser = asyncHander(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: '일치하는 사용자가 없습니다.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
  }
  const token = jwt.sign({ id: user._id }, jwtSecret);
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/contacts');
});

// @desc Logout
// @route GET /logout
const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};

module.exports = { getRegister, registerUser, getLogin, loginUser, logout };
