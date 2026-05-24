import React, { useEffect, useRef, useState } from "react";
import FaceExpression from "../../Expressions/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";
import "./Home.scss";

function PlaylistIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h8M4 12h8M4 17h5" />
            <path d="M17 5v10.5a2.5 2.5 0 1 1-2-2.45V7.1l6-1.6V14a2.5 2.5 0 1 1-2-2.45V5.5" />
        </svg>
    );
}

function PlayMiniIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="m10 8 6 4-6 4Z" />
        </svg>
    );
}

function DotsIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="5" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="12" cy="19" r="1.8" />
        </svg>
    );
}

function LogoutIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
            <path d="M14 16l4-4-4-4" />
            <path d="M8 12h10" />
        </svg>
    );
}

function ChevronIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

function UploadIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 16V4" />
            <path d="m7 9 5-5 5 5" />
            <path d="M5 20h14" />
        </svg>
    );
}

function formatMoodLabel(mood) {
    if (!mood) {
        return "TriNaad selection";
    }

    return `Mood: ${mood.charAt(0).toUpperCase()}${mood.slice(1)}`;
}

const Home = () => {
    const navigate = useNavigate();
    const profileMenuRef = useRef(null);
    const {
        loading,
        songs,
        currentSongIndex,
        handleGetSong,
        handleSelectSongByIndex,
    } = useSong();
    const { user, handleLogout } = useAuth();
    const [ isProfileMenuOpen, setIsProfileMenuOpen ] = useState(false);

    const displayName = user?.username || user?.email?.split("@")[ 0 ] || "TriNaad Listener";
    const avatarName = displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");

    const playlist = songs;
    const isAdmin = Boolean(user?.isAdmin);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (!profileMenuRef.current?.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        }

        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    function handleToggleProfileMenu() {
        setIsProfileMenuOpen((value) => !value);
    }

    function handleOpenUploadPage() {
        setIsProfileMenuOpen(false);
        navigate("/admin/upload");
    }

    return (
        <main className="home-dashboard">
            <div className="home-dashboard__glow home-dashboard__glow--one" />
            <div className="home-dashboard__glow home-dashboard__glow--two" />

            <div className="home-dashboard__shell">
                <header className="home-dashboard__topbar">
                    <div className="home-dashboard__brand">
                        <div className="home-dashboard__brand-icon">
                            <img src="/Om.png" alt="Om symbol" />
                        </div>
                        <div className="home-dashboard__brand-copy">
                            <h1>TriNaad</h1>
                            <p>Where emotion becomes sound</p>
                        </div>
                    </div>

                    <div className="home-dashboard__topbar-actions">
                        <div className="home-dashboard__profile-menu" ref={profileMenuRef}>
                            <button
                                className="home-dashboard__profile"
                                onClick={handleToggleProfileMenu}
                                type="button"
                            >
                                <span className="home-dashboard__avatar">{avatarName || "ML"}</span>
                                <span className="home-dashboard__profile-copy">
                                    <strong>{displayName}</strong>
                                    <small>{user?.email || "Third-eye listening session live"}</small>
                                </span>
                                <ChevronIcon />
                            </button>

                            {isProfileMenuOpen ? (
                                <div className="home-dashboard__profile-dropdown">
                                    <span className="home-dashboard__profile-role">
                                        {isAdmin ? "Admin access enabled" : "Listener account"}
                                    </span>

                                    {isAdmin ? (
                                        <button
                                            className="home-dashboard__profile-action"
                                            onClick={handleOpenUploadPage}
                                            type="button"
                                        >
                                            <UploadIcon />
                                            Upload song
                                        </button>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>

                        <button
                            className="home-dashboard__logout"
                            onClick={handleLogout}
                            type="button"
                        >
                            <LogoutIcon />
                            Logout
                        </button>
                    </div>
                </header>

                <section className="home-dashboard__content">
                    <div className="home-dashboard__grid">
                        <FaceExpression
                            onClick={(expression) => {
                                handleGetSong({ mood: expression });
                            }}
                        />

                        <section className="playlist-panel">
                            <div className="playlist-panel__header">
                                <div className="playlist-panel__title">
                                    <span className="playlist-panel__icon">
                                        <PlaylistIcon />
                                    </span>
                                    <div>
                                        <h2>Recommended Playlist</h2>
                                        <p>Songs aligned with your current inner state</p>
                                    </div>
                                </div>

                                <span className="playlist-panel__tag">
                                    {loading ? "Refreshing..." : `${playlist.length} Tracks`}
                                </span>
                            </div>

                            <div className="playlist-panel__list">
                                {playlist.length === 0 ? (
                                    <div className="playlist-panel__empty">
                                        <strong>No songs found</strong>
                                        <span>Try another emotion after detection and TriNaad will reveal the matching songs here.</span>
                                    </div>
                                ) : (
                                    playlist.map((item, index) => {
                                        const isActive = index === currentSongIndex;

                                        return (
                                            <button
                                                className={`playlist-panel__item${isActive ? " playlist-panel__item--active" : ""}`}
                                                key={`${item.url}-${index}`}
                                                onClick={() => handleSelectSongByIndex(index)}
                                                type="button"
                                            >
                                                <div className="playlist-panel__cover">
                                                    <img src={item.posterUrl} alt={item.title} />
                                                    <span className="playlist-panel__play">
                                                        <PlayMiniIcon />
                                                    </span>
                                                </div>

                                                <div className="playlist-panel__copy">
                                                    <strong>{item.title}</strong>
                                                    <span>{formatMoodLabel(item.mood)}</span>
                                                </div>

                                                <div className="playlist-panel__meta">
                                                    <span>{isActive ? "Now" : `#0${index + 1}`}</span>
                                                    <DotsIcon />
                                                </div>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </section>
                    </div>

                    <Player />
                </section>
            </div>
        </main>
    );
};

export default Home;
