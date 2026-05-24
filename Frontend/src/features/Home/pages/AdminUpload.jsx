import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import { uploadSong } from "../services/song.api";
import "./AdminUpload.scss";

function UploadCloudIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 16V8" />
      <path d="m8.5 11.5 3.5-3.5 3.5 3.5" />
      <path d="M7 18h10a4 4 0 1 0-.78-7.92A5.5 5.5 0 0 0 5.8 11.5 3.5 3.5 0 0 0 7 18Z" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
      <path d="M9 12h10" />
    </svg>
  );
}

const moods = [
  { label: "Happy", value: "happy" },
  { label: "Sad", value: "sad" },
  { label: "Surprised", value: "surprised" },
  { label: "Neutral", value: "neutral" },
];

const AdminUpload = () => {
  const fileInputRef = useRef(null);
  const { user } = useAuth();
  const [ uploadMood, setUploadMood ] = useState("happy");
  const [ uploadFile, setUploadFile ] = useState(null);
  const [ uploadStatus, setUploadStatus ] = useState("");
  const [ isUploading, setIsUploading ] = useState(false);

  const statusTone = useMemo(() => {
    if (!uploadStatus) {
      return "";
    }

    return uploadStatus.toLowerCase().includes("success") ? " success" : " error";
  }, [ uploadStatus ]);

  async function handleSongUpload(event) {
    event.preventDefault();

    if (!uploadFile) {
      setUploadStatus("Please choose a song file first.");
      return;
    }

    setIsUploading(true);
    setUploadStatus("");

    try {
      await uploadSong({
        mood: uploadMood,
        songFile: uploadFile,
      });

      setUploadStatus("Song uploaded successfully.");
      setUploadFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setUploadStatus(error.response?.data?.message || "Song upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <main className="admin-upload-page">
      <div className="admin-upload-page__glow admin-upload-page__glow--one" />
      <div className="admin-upload-page__glow admin-upload-page__glow--two" />

      <section className="admin-upload-page__shell">
        <header className="admin-upload-page__topbar">
          <div>
            <span className="admin-upload-page__eyebrow">TriNaad Admin</span>
            <h1>Upload Song</h1>
            <p>Add a new track to the exact mood playlist it belongs to.</p>
          </div>

          <div className="admin-upload-page__topbar-actions">
            <div className="admin-upload-page__admin-chip">
              <strong>{user?.username || "Admin"}</strong>
              <span>{user?.email}</span>
            </div>

            <Link className="admin-upload-page__back" to="/">
              <BackIcon />
              Back home
            </Link>
          </div>
        </header>

        <div className="admin-upload-page__layout">
          <aside className="admin-upload-page__info-card">
            <div className="admin-upload-page__icon-wrap">
              <UploadCloudIcon />
            </div>

            <h2>Admin Upload Console</h2>
            <p>
              Upload MP3 files only. The server will read the song metadata and poster
              image, then place the track inside the selected mood collection.
            </p>

            <ul className="admin-upload-page__notes">
              <li>Choose the correct mood before uploading.</li>
              <li>The song should contain title and cover metadata for best results.</li>
              <li>Only approved admin accounts can access this screen.</li>
            </ul>
          </aside>

          <section className="admin-upload-card">
            <div className="admin-upload-card__header">
              <div>
                <h2>Track Details</h2>
                <p>Clean, direct, and ready for playlist curation.</p>
              </div>
            </div>

            <form className="admin-upload-card__form" onSubmit={handleSongUpload}>
              <label className="admin-upload-card__field">
                <span>Mood</span>
                <select
                  onChange={(event) => setUploadMood(event.target.value)}
                  value={uploadMood}
                >
                  {moods.map((mood) => (
                    <option key={mood.value} value={mood.value}>
                      {mood.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="admin-upload-card__field">
                <span>Song file</span>

                <button
                  className="admin-upload-card__file-trigger"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  <UploadCloudIcon />
                  <div>
                    <strong>{uploadFile ? uploadFile.name : "Choose an MP3 file"}</strong>
                    <small>
                      {uploadFile ? "Ready to upload" : "The track metadata will be read automatically."}
                    </small>
                  </div>
                </button>

                <input
                  ref={fileInputRef}
                  accept=".mp3,audio/mpeg"
                  className="admin-upload-card__file-input"
                  onChange={(event) => setUploadFile(event.target.files?.[ 0 ] || null)}
                  type="file"
                />
              </div>

              {uploadStatus ? (
                <p className={`admin-upload-card__status${statusTone}`}>{uploadStatus}</p>
              ) : null}

              <button
                className="admin-upload-card__submit"
                disabled={isUploading}
                type="submit"
              >
                {isUploading ? "Uploading..." : "Upload Song"}
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
};

export default AdminUpload;
