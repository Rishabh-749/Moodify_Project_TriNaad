import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext(undefined);

export const SongContextProvider = ({ children }) => {
    const [ song, setSong ] = useState(null);
    const [ songs, setSongs ] = useState([]);
    const [ currentSongIndex, setCurrentSongIndex ] = useState(0);
    const [ loading, setLoading ] = useState(false);

    return (
        <SongContext.Provider
            value={{
                loading,
                setLoading,
                song,
                setSong,
                songs,
                setSongs,
                currentSongIndex,
                setCurrentSongIndex,
            }}
        >
            {children}
        </SongContext.Provider>
    );
};
