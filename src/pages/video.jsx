import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ cctvId }) => {
    const [playerObj, setPlayerObj] = useState(null);
    const [latestDivId, setLatestDivId] = useState('someUniqueId');
    const divRef = useRef(null);
    const [sdk, setSdk] = useState(null);

    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.type = 'text/javascript';
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };
        Promise.all([
            loadScript('/video/moment.min.js'),
            loadScript('/video/i2v_player.min.js'),
        ]).then(() => {
            setSdk(new window.I2vSdk()); 
        }).catch(err => {
            console.error('Error loading external scripts:', err);
        });

        return () => {
            if (playerObj) {
                playerObj.stop(); 
            }
        };
    }, []);

    useEffect(() => {
        if (cctvId) {
            playLive();
        }
    }, [cctvId]);

    const playLive = () => {
        if (!sdk) {
            console.error("SDK not loaded yet!");
            return;
        }

        // Hardcoded cameraId
        const cameraId = cctvId;
        let streamType = "0"; // Default stream type

        const isUsingTranscoding = "0";
        const startTime = "0";
        const ctrlInputRate = "0";

        // Assign a new random ID to the div for the player
        const newDivId = `playerDiv-${Math.trunc(Math.random() * 1000)}`;
        setLatestDivId(newDivId);

        // Set the new ID to the div
        const providedDiv = divRef.current;
        if (providedDiv) {
            providedDiv.id = newDivId;
        }

        // Initialize the player using the SDK
        const newPlayerObj = sdk.GetPlayer(newDivId, cameraId, "Live", streamType, isUsingTranscoding, ctrlInputRate, startTime);

        // Set error and retry callbacks
        newPlayerObj.setErrorCallback((err) => {
            console.error("Player error:", err);
        });

        newPlayerObj.setRetryingCallback(() => {
            console.log("Disconnected, retrying to connect!");
        });

        newPlayerObj.play();
        setPlayerObj(newPlayerObj); 
    };

    return (
        <div>
            <button onClick={playLive}>Play Live</button>
            <div
                style={{ height: '300px', width: '100%' }}
                id={latestDivId}
                ref={divRef}
            />
        </div>
    );
};

export default VideoPlayer;
