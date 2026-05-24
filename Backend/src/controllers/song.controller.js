const songModel = require("../models/song.model");
const id3 = require("node-id3");
const storageService = require("../services/storage.service");

const uploadSong = async (req, res)=>{
    const songBuffer = req.file.buffer;
    const {mood} = req.body;
    const tags = id3.read(songBuffer);

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
        buffer: songBuffer,
        fileName: tags.title,
        folder: "/Moodify/Songs"
    }),
    storageService.uploadFile({
        buffer: tags.image.imageBuffer,
        fileName: tags.title + ".jpeg",
        folder: "/Moodify/Posters"
    })

    ])

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    return res.status(201).json({
        message: "song created successfully",
        song
    })
}

const getSongs = async (req, res)=>{
    const normalizedMood = req.query.mood?.trim().toLowerCase();
    let query = {};

    if (normalizedMood) {
        if (normalizedMood === "surprised" || normalizedMood === "suprised") {
            query.mood = { $in: ["surprised", "suprised"] };
        } else {
            query.mood = normalizedMood;
        }
    }

    const songs = await songModel.find(query).sort({ _id: -1 });

    res.status(200).json({
        message: "Songs fetched successfully.",
        songs
    })
}

module.exports = {
    uploadSong,
    getSongs
}
