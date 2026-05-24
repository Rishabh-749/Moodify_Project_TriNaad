import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import "./Player.scss";

const speedOptions = [ 0.75, 1, 1.25, 1.5 ];

function formatTime(time) {
  if (!Number.isFinite(time)) {
    return "0:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20.5s-7-4.4-7-10a4.3 4.3 0 0 1 7-3.2 4.3 4.3 0 0 1 7 3.2c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

function ShuffleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 4h4v4" />
      <path d="m20 4-5.2 5.2M4 6h3c2.2 0 3.4.7 4.6 2.2l.8 1" />
      <path d="M4 18h3c2.2 0 3.4-.7 4.6-2.2L20 8" />
      <path d="m16 20 4-4" />
      <path d="M20 20h-4v-4" />
    </svg>
  );
}

function PreviousIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 6v12" />
      <path d="m18 7-8 5 8 5V7Z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 6v12" />
      <path d="m6 7 8 5-8 5V7Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 6 10 6-10 6Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 6h3v12H8zM13 6h3v12h-3z" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11V9a3 3 0 0 1 3-3h15" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 13v2a3 3 0 0 1-3 3H3" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 9v6h4l5 4V5l-5 4H5Z" />
      <path d="M18 9.5a4.5 4.5 0 0 1 0 5" />
      <path d="M20.5 7a8 8 0 0 1 0 10" />
    </svg>
  );
}

const Player = () => {
  const audioRef = useRef(null);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ duration, setDuration ] = useState(0);
  const [ currentTime, setCurrentTime ] = useState(0);
  const [ volume, setVolume ] = useState(0.82);
  const [ playbackRate, setPlaybackRate ] = useState(1);
  const [ isFavorite, setIsFavorite ] = useState(false);
  const [ isShuffleOn, setIsShuffleOn ] = useState(false);
  const [ isRepeatOn, setIsRepeatOn ] = useState(false);
  const {
    song,
    hasPrevious,
    hasNext,
    handlePreviousSong,
    handleNextSong,
  } = useSong();

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [ volume ]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.playbackRate = playbackRate;
  }, [ playbackRate ]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !song?.url) {
      setIsPlaying(false);
      return;
    }

    setCurrentTime(0);
    setDuration(0);
    audio.load();

    const playPromise = audio.play();

    if (playPromise?.then) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [ song?.url ]);

  function handleTogglePlay() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    const playPromise = audio.play();

    if (playPromise?.then) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }

  function handleSeek(event) {
    const audio = audioRef.current;
    const nextTime = Number(event.target.value);

    if (!audio) {
      return;
    }

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function handleVolumeChange(event) {
    setVolume(Number(event.target.value));
  }

  function handleSpeedCycle() {
    const currentIndex = speedOptions.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % speedOptions.length;

    setPlaybackRate(speedOptions[ nextIndex ]);
  }

  function handleLoadedMetadata(event) {
    setDuration(event.target.duration || 0);
  }

  function handleTimeUpdate(event) {
    setCurrentTime(event.target.currentTime);
  }

  function handleEnded() {
    if (isRepeatOn) {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      audio.currentTime = 0;
      audio.play();
      return;
    }

    if (hasNext) {
      handleNextSong();
      return;
    }

    setIsPlaying(false);
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="player-dock">
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadedMetadata}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={song?.url || ""} />
      </audio>

      <div className="player-dock__track">
        <div className="player-dock__cover">
          {song?.posterUrl ? (
            <img src={song.posterUrl} alt={song.title || "Selected song"} />
          ) : (
            <div className="player-dock__cover-placeholder">TriNaad</div>
          )}
        </div>
        <div className="player-dock__copy">
          <strong>{song?.title || "No track selected"}</strong>
          <span>{song?.mood ? `Mood: ${song.mood}` : "Choose a feeling to let TriNaad load matching songs"}</span>
        </div>
        <button
          className={`player-dock__icon-button${isFavorite ? " player-dock__icon-button--active" : ""}`}
          onClick={() => setIsFavorite((value) => !value)}
          disabled={!song}
          type="button"
        >
          <HeartIcon />
        </button>
      </div>

      <div className="player-dock__center">
        <div className="player-dock__controls">
          <button
            className={`player-dock__icon-button${isShuffleOn ? " player-dock__icon-button--active" : ""}`}
            onClick={() => setIsShuffleOn((value) => !value)}
            disabled={!song}
            type="button"
          >
            <ShuffleIcon />
          </button>

          <button
            className="player-dock__icon-button"
            disabled={!hasPrevious}
            onClick={handlePreviousSong}
            type="button"
          >
            <PreviousIcon />
          </button>

          <button
            className="player-dock__play-button"
            onClick={handleTogglePlay}
            disabled={!song}
            type="button"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            className="player-dock__icon-button"
            disabled={!hasNext}
            onClick={handleNextSong}
            type="button"
          >
            <NextIcon />
          </button>

          <button
            className={`player-dock__icon-button${isRepeatOn ? " player-dock__icon-button--active" : ""}`}
            onClick={() => setIsRepeatOn((value) => !value)}
            disabled={!song}
            type="button"
          >
            <RepeatIcon />
          </button>
        </div>

        <div className="player-dock__timeline">
          <span>{formatTime(currentTime)}</span>

          <div className="player-dock__progress">
            <div
              className="player-dock__progress-fill"
              style={{ width: `${progress}%` }}
            />
            <input
              aria-label="Seek song"
              className="player-dock__slider"
              max={duration || 0}
              min="0"
              disabled={!song}
              onChange={handleSeek}
              step="0.1"
              type="range"
              value={currentTime}
            />
          </div>

          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-dock__tools">
        <button
          className="player-dock__speed"
          onClick={handleSpeedCycle}
          disabled={!song}
          type="button"
        >
          {playbackRate}x
        </button>

        <div className="player-dock__volume">
          <VolumeIcon />
          <input
            aria-label="Volume"
            max="1"
            min="0"
            disabled={!song}
            onChange={handleVolumeChange}
            step="0.01"
            type="range"
            value={volume}
          />
        </div>
      </div>
    </section>
  );
};

export default Player;
