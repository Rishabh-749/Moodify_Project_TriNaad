import { getSong } from "../services/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";


export const useSong = () => {
    const context = useContext(SongContext);

    if (!context) {
        throw new Error("useSong must be used within a SongContextProvider");
    }

    const {
        loading,
        setLoading,
        song,
        setSong,
        songs,
        setSongs,
        currentSongIndex,
        setCurrentSongIndex,
    } = context;

    async function handleGetSong({ mood }) {
        setLoading(true);

        try {
            const data = await getSong({ mood });
            const filteredSongs = data.songs || [];

            setSongs(filteredSongs);
            setCurrentSongIndex(0);

            if (filteredSongs.length === 0) {
                setSong(null);
                return;
            }

            setSong(filteredSongs[ 0 ]);
        } finally {
            setLoading(false);
        }
    }

    function handleSelectSongByIndex(index) {
        if (index < 0 || index >= songs.length) {
            return;
        }

        setCurrentSongIndex(index);
        setSong(songs[ index ]);
    }

    function handlePreviousSong() {
        handleSelectSongByIndex(currentSongIndex - 1);
    }

    function handleNextSong() {
        handleSelectSongByIndex(currentSongIndex + 1);
    }

    return ({
        loading,
        song,
        songs,
        currentSongIndex,
        hasPrevious: currentSongIndex > 0,
        hasNext: currentSongIndex < songs.length - 1,
        handleGetSong,
        handlePreviousSong,
        handleNextSong,
        handleSelectSongByIndex,
    });
};
