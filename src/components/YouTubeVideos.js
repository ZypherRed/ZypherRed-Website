import React, { useEffect, useState } from 'react';

function YouTubeVideos() {
  const [zypherRedVideos, setZypherRedVideos] = useState([]);
  const [zypherRed2Videos, setZypherRed2Videos] = useState([]);

  useEffect(() => {
    const fetchRSSFeed = async (channelId) => {
      try {
        const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
        if (!response.ok) throw new Error('Failed to fetch RSS feed');
        const rssText = await response.text();
        const parser = new DOMParser();
        const rssDoc = parser.parseFromString(rssText, "application/xml");
        const items = rssDoc.querySelectorAll("entry");
        const videos = Array.from(items).map(item => {
          const videoId = item.querySelector("yt\\:videoId").textContent;
          const title = item.querySelector("title").textContent;
          const thumbnailUrl = item.querySelector("media\\:thumbnail").getAttribute("url");
          return { videoId, title, thumbnailUrl };
        });
        return videos;
      } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
      }
    };

    const loadVideos = async () => {
      const zypherRedVideos = await fetchRSSFeed('UCUvvCyvKOKVGG3XYeIx9rWg'); // Replace with your channel ID
      const zypherRed2Videos = await fetchRSSFeed('UCz46O_G2YIX5FF2vGbP5uEg'); // Replace with your second channel ID
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
      <div key={video.videoId} className="video-item">
        <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer">
          <img src={video.thumbnailUrl} alt={video.title} />
          <p>{video.title}</p>
        </a>
      </div>
    ));
  };

  return (
    <div className="youtube-section">
      <div className="youtube-videos">
        <div className="channel-section">
        <h3>ZypherRed YouTube Channel</h3>
          <div className="youtube-icons">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube Icon" className="youtube-icon" />
            <button className="subscribe-button">Subscribe</button>
          </div>

          <div className="videos-grid">
            {renderVideos(zypherRedVideos)}
          </div>
        </div>
      </div>

      <div className="youtube-videos">
        <div className="channel-section">
        <h3>ZypherRed2 YouTube Channel (Twitch VOD Channel)</h3>
          <div className="youtube-icons">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube Icon" className="youtube-icon" />
            <button className="subscribe-button">Subscribe</button>
          </div>
          <div className="videos-grid">
            {renderVideos(zypherRed2Videos)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YouTubeVideos;
