const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: [true, "Username must be unique"],
        required: [true, "Username is required"]
    },    
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "Email must be unique"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    }
})

userSchema.pre("save", async function(){
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
