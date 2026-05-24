import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "./FaceExpression.scss";

function FaceScanIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
            <path d="M8.5 10a3.5 3.5 0 0 1 7 0c0 1.93-1.57 3.5-3.5 3.5S8.5 11.93 8.5 10Z" />
            <path d="M6.5 18a6.5 6.5 0 0 1 11 0" />
        </svg>
    );
}

function LiveIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3.2" />
            <path d="M18.4 5.6a9 9 0 0 1 0 12.8M5.6 18.4a9 9 0 0 1 0-12.8" />
        </svg>
    );
}

const moodCopy = {
    happy: {
        title: "Mood Detected: Happy",
        subtitle: "A bright track is ready for you.",
    },
    sad: {
        title: "Mood Detected: Sad",
        subtitle: "Queued something softer and calmer.",
    },
    surprised: {
        title: "Mood Detected: Surprised",
        subtitle: "Picked something energetic and vivid.",
    },
    neutral: {
        title: "Mood Detected: Neutral",
        subtitle: "Balanced mood, balanced soundtrack.",
    },
};

export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("neutral");
    const [ confidence, setConfidence ] = useState(0.92);
    const [ isReady, setIsReady ] = useState(false);
    const [ detecting, setDetecting ] = useState(false);

    useEffect(() => {
        async function bootstrap() {
            await init({ landmarkerRef, videoRef, streamRef });
            setIsReady(true);
        }

        bootstrap();

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        setDetecting(true);

        try {
            const result = detect({ landmarkerRef, videoRef, setExpression });

            if (!result) {
                return;
            }

            setExpression(result.expression);
            setConfidence(Math.round(result.confidence * 100));
            onClick(result.expression);
        } finally {
            setDetecting(false);
        }
    }

    const activeMood = moodCopy[ expression ] || moodCopy.neutral;

    return (
        <section className="mood-panel">
            <div className="mood-panel__header">
                <div>
                    <h2>Mood Detection</h2>
                    <p>Look into the camera and let TriNaad translate your emotion into sound.</p>
                </div>
                <span className={`mood-panel__live${isReady ? " mood-panel__live--active" : ""}`}>
                    <LiveIcon />
                    {isReady ? "Live" : "Starting"}
                </span>
            </div>

            <div className="mood-panel__camera">
                <video
                    ref={videoRef}
                    className="mood-panel__video"
                    muted
                    playsInline
                />

                <span className="mood-panel__frame mood-panel__frame--top-left" />
                <span className="mood-panel__frame mood-panel__frame--top-right" />
                <span className="mood-panel__frame mood-panel__frame--bottom-left" />
                <span className="mood-panel__frame mood-panel__frame--bottom-right" />
            </div>

            <div className="mood-panel__actions">
                <button
                    className="mood-panel__button"
                    disabled={!isReady || detecting}
                    onClick={handleClick}
                    type="button"
                >
                    <FaceScanIcon />
                    {detecting ? "Analyzing..." : "Detect mood"}
                </button>
            </div>

            <div className={`mood-panel__result mood-panel__result--${expression}`}>
                <div className="mood-panel__result-icon">
                    <FaceScanIcon />
                </div>
                <div>
                    <h3>{activeMood.title}</h3>
                    <p>{activeMood.subtitle}</p>
                    <span>Confidence: {confidence}%</span>
                </div>
            </div>
        </section>
    );
}
