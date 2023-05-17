const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const signup = async (req, res) => {
  const {
    image,
    name,
    gender,
    accountType,
    email,
    contactNumber,
    bio,
    domain,
    skills,
    linkedin,
    github,
    twitter,
    portfolio,
    password,
    projects,
  } = req.body;

  try {
    const exist = await User.findOne({ email: email });

    if (exist) {
      return res.status(400).json({ error: 'Email already exist.' });
    }

    // const result = await cloudinary.uploader.upload(image, {
    //   public_id: `${Date.now()}`,
    //   width: 300,
    //   height: 300,
    //   crop: 'fill',
    // });

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    const user = await User.create({
      image,
      name,
      gender,
      accountType,
      email,
      contactNumber,
      bio,
      domain,
      skills,
      linkedin,
      github,
      twitter,
      portfolio,
      password: hash,
      projects,
    });

    const token = generateToken(user._id);
    return res.status(200).json({ email, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const emptyFields = [];

  if (!email) {
    emptyFields.push('email');
  }
  if (!password) {
    emptyFields.push('password');
  }

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'All fields are required!', emptyFields });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      emptyFields.push('email');
      return res.status(400).json({ error: 'Incorrect email!', emptyFields });
    }

    const match = await bcryptjs.compare(password, user.password);

    if (!match) {
      emptyFields.push('password');
      return res
        .status(400)
        .json({ error: 'Incorrect password!', emptyFields });
    }

    const token = generateToken(user._id);

    return res.status(200).json({ email, token, id: user._id });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = { signup, login };
