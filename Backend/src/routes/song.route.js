const express = require("express");
const songController = require("../controllers/song.controller");
const authUser = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/admin.middleware");
const upload = require("../middlewares/upload.middleware");
const songProvider = express.Router();

songProvider.post("/", authUser, adminOnly, upload.single("song"), songController.uploadSong);
songProvider.get("/", songController.getSongs);

module.exports = songProvider;
