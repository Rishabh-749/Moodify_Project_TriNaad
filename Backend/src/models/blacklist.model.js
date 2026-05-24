const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
    token : {
        type: String,
        required: [true, "Token is required for Blacklisting."]
    }
},{
    timestamps: true
})

const blacklistModel = mongoose.model("blacklist", blacklistSchema);

module.exports = blacklistModel;