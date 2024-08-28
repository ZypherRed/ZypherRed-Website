import React from 'react';
import './App.css';
import TwitchPlayer from './components/TwitchPlayer';
import YouTubeVideos from './components/YouTubeVideos';
import EventList from './components/EventList';
import LinkTree from './components/LinkTree';
import banner from './assets/banner.png';
import avatarGif from './assets/avatar.gif';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={banner} className="App-banner" alt="ZypherRed Banner" />
      </header>

      <div className="App-content">
        <div className="linktree-section">
          <LinkTree />
        </div>

        <div className="main-section">
          <TwitchPlayer channel="ZypherRed" />
        </div>

        <div className="profile-section">
          <img src={avatarGif} className="avatar" alt="ZypherRed Avatar" />
          <div className="description-box">
            <p>I'm here to have fun playing games and streaming, and I love discussing all things gaming and technical with friends!</p>
          </div>
        </div>

        <div className="schedule-section">
          <h3 className="countdown">Next Stream Time: <span id="countdown-timer">Loading...</span></h3>
          <EventList icalLink="https://api.twitch.tv/helix/schedule/icalendar?broadcaster_id=810021866" />
        </div>

        <div className="youtube-section">
          <YouTubeVideos />
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 ZypherRed. All Rights Reserved. Business@ZypherRed.com</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
