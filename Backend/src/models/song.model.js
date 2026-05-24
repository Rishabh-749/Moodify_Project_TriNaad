const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        trim: true,
        lowercase: true,
        enum: {
            values: ["sad", "happy", "suprised", "surprised", "neutral"],
            message: "Enum is this."
        }
    }
})

const songModel = mongoose.model("song", songSchema);

module.exports = songModel;
