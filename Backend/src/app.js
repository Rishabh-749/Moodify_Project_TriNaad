const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const authProvider = require("./routes/auth.route");
const songRoutes = require("./routes/song.route");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(express.static("./public"))
app.use(cookie());
app.use(cors({
    origin: ["http://localhost:5173", "https://moodify-project-trinaad.onrender.com"],
    credentials: true
}))

app.use("/api/auth", authProvider);
app.use("/api/songs", songRoutes);

app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

module.exports = app;