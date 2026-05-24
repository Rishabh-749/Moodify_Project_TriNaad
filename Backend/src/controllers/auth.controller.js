const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");
const { isAdminEmail, normalizeEmail } = require("../config/admins");

function serializeUser(userDocument) {
  const user = userDocument.toObject ? userDocument.toObject() : { ...userDocument };

  delete user.password;

  return {
    ...user,
    isAdmin: isAdminEmail(user.email)
  };
}

const registerController = async (req, res) => {
  const username = req.body.username?.trim();
  const password = req.body.password;
  const email = normalizeEmail(req.body.email);

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User Already Exists",
    });
  }

  const user = await userModel.create({
    username,
    password,
    email,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User Registered successfully.",
    user: serializeUser(user)
  });
};

const loginController = async (req, res) => {
  const username = req.body.username?.trim();
  const password = req.body.password;
  const email = normalizeEmail(req.body.email);

   const user = await userModel.findOne({
    $or: [{ username }, { email }],
  }).select("+password");

  if(!user){
    return res.status(400).json({
        message: "Invalid Credentials"
    })
  }
  
  const isPasswordValid = await bcrypt.compare(password,user.password);

  if(!isPasswordValid){
    return res.status(400).json({
        message: "Invalid Credentials"
    })
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User Login Successfully.",
    user: serializeUser(user)
  })
};

const getMe = async (req, res) => {
  const user = await userModel.findById(req.user.id).select("-password");

  res.status(200).json({
    message: "User Fetch Successfully",
    user: serializeUser(user)
  })
}

const logoutUser = async (req, res) => {
  const token = req.cookies.token;

  res.clearCookie("token");
  
  await redis.set(token, Date.now().toString(), "EX", 60 * 60)

   res.status(200).json({
    message: "Logout Successfully"
   })
}

module.exports = {
  registerController,
  loginController,
  getMe,
  logoutUser
};
