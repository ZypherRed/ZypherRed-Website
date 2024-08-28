import React, { useEffect, useState } from 'react';

function YouTubeVideos() {
  const [zypherRedVideos, setZypherRedVideos] = useState([]);
  const [zypherRed2Videos, setZypherRed2Videos] = useState([]);

  useEffect(() => {
    const fetchVideos = async (channelId) => {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=YOUR_API_KEY&channelId=${channelId}&part=snippet&order=date&maxResults=3`);
        if (!response.ok) throw new Error('Failed to fetch YouTube videos');
        const data = await response.json();
        return data.items || [];
      } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
      }
    };

    const loadVideos = async () => {
      const zypherRedVideos = await fetchVideos('UCUvvCyvKOKVGG3XYeIx9rWg');
      const zypherRed2Videos = await fetchVideos('UCz46O_G2YIX5FF2vGbP5uEg');
      setZypherRedVideos(zypherRedVideos);
      setZypherRed2Videos(zypherRed2Videos);
    };

    loadVideos();
  }, []);

  const renderVideos = (videos) => {
    if (videos.length === 0) {
      return (
        <>
          <div className="video-item placeholder">No videos available</div>
          <div className="video-item placeholder">No videos available</div>
          <div className="video-item placeholder">No videos available</div>
        </>
      );
    }

    return videos.map((video) => (
      <div key={video.id.videoId} className="video-item">
        <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
          <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
          <p>{video.snippet.title}</p>
        </a>
      </div>
    ));
  };

  return (
    <div className="youtube-section">
      <div className="youtube-videos">
        <div className="channel-section">
          <div className="youtube-icons">
            <img src="assets/zypherred-icon.png" alt="ZypherRed Icon" className="channel-icon" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube Icon" className="youtube-icon" />
            <button className="subscribe-button">Subscribe</button>
          </div>
          <h3>ZypherRed YouTube Channel</h3>
          <div className="videos-grid">
            {renderVideos(zypherRedVideos)}
          </div>
        </div>
      </div>

      <div className="youtube-videos">
        <div className="channel-section">
          <div className="youtube-icons">
            <img src="assets/zypherred2-icon.png" alt="ZypherRed2 Icon" className="channel-icon" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube Icon" className="youtube-icon" />
            <button className="subscribe-button">Subscribe</button>
          </div>
          <h3>ZypherRed2 YouTube Channel</h3>
          <div className="videos-grid">
            {renderVideos(zypherRed2Videos)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YouTubeVideos;
