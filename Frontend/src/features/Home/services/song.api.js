import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
})

export async function getSong({ mood }) {
    const response = await api.get("/api/songs?mood=" + mood)
    return response.data
}

export async function uploadSong({ mood, songFile }) {
    const formData = new FormData();

    formData.append("mood", mood);
    formData.append("song", songFile);

    const response = await api.post("/api/songs", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
}
