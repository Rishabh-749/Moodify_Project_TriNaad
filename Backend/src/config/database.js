const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const { syncAdminUsers } = require("./admins");

const connectTODB = async()=>{
    await mongoose.connect(process.env.MONGO_URL);
    await syncAdminUsers(userModel);
    console.log("Connected to DB");
}

module.exports = connectTODB;
