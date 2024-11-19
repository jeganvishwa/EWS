const Stream = require('node-rtsp-stream');
const stream = new Stream({
  name: 'name',
  streamUrl: '', // Replace with your RTSP URL
  wsPort: 9999, // WebSocket port
  ffmpegOptions: {
    '-stats': '', // Optional: display stats
    '-r': 30 // Frame rate
  }
});

console.log('WebSocket server is running on ws://localhost:9999');