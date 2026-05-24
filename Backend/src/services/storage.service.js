const ImageKit = require("@imagekit/nodejs").default;

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const uploadFile = async ({buffer, fileName, filename, folder = ""})=>{
    const resolvedFileName = fileName || filename;

    const file = await client.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName: resolvedFileName,
        folder
    })

    return file;
}

module.exports = {uploadFile};
