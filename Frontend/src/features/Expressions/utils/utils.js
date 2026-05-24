import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";


export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1
        }
    );

    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
};

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
    if (!landmarkerRef.current || !videoRef.current) return;

    const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
    );

    if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[ 0 ].categories;

        const getScore = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");
        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");

        console.log(getScore("mouthFrownLeft"))

        let currentExpression = "neutral";
        let confidence = 0.68;

        if (smileLeft > 0.5 && smileRight > 0.5) {
            currentExpression = "happy";
            confidence = (smileLeft + smileRight) / 2;
        } else if (jawOpen > 0.2 && browUp > 0.2) {
            currentExpression = "surprised";
            confidence = (jawOpen + browUp) / 2;
        } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
            currentExpression = "sad";
            confidence = Math.max(frownLeft, frownRight);
        } else {
            confidence = Math.max(0.55, 1 - Math.max(smileLeft, smileRight, jawOpen, browUp, frownLeft, frownRight));
        }

        setExpression(currentExpression);

        return {
            expression: currentExpression,
            confidence: Math.min(0.99, confidence)
        }
    }
};
