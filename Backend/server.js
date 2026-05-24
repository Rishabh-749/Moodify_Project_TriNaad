require("dotenv").config();
const app = require("./src/app");
const connectTODB = require("./src/config/database");
const {cyanBright, redBright, greenBright} = require("console-log-colors");
const port = process.env.PORT || 3000;

connectTODB();

app.listen(port, ()=>{
    console.log(`${cyanBright("Server is running at :- ")} ${greenBright(`http://localhost:${port}`)}`);
})