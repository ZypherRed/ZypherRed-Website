import React from 'react';

function TwitchPlayer({ channel }) {
  return (
    <div className="twitch-player">
      <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=localhost&parent=yourdomain.com`}
        height="400"
        width="100%"
        allowFullScreen
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default TwitchPlayer;
