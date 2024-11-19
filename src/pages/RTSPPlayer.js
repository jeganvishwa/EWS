import React, { useRef, useEffect } from 'react';

const RTSPPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:9999'); 

    ws.onmessage = (event) => {
      const video = videoRef.current;
      const data = event.data;

      if (data instanceof Blob && video) {
        video.src = URL.createObjectURL(data);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <video ref={videoRef} controls autoPlay />
  );
};

export default RTSPPlayer;