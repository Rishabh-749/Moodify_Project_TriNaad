const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authProvider = express.Router();

authProvider.post("/register", authController.registerController);
authProvider.post("/login", authController.loginController);
authProvider.get("/get-me",authMiddleware, authController.getMe);
authProvider.get("/logout",authController.logoutUser);

module.exports = authProvider;