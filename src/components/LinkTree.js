import React from 'react';

import twitchIcon from '../assets/twitch.svg';
import discordIcon from '../assets/discord.svg';

function LinkTree() {
  const links = [
    { href: "https://www.twitch.tv/ZypherRed", icon: twitchIcon, text: "Twitch", tooltip: "Follow me on Twitch!" },
    { href: "https://discord.com/invite/E26RVWPv2J", icon: discordIcon, text: "Discord", tooltip: "Join the Discord!" },
    { href: "https://www.youtube.com/@ZypherRed", icon: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png", text: "YouTube", tooltip: "Subscribe to my YouTube!" },
    { href: "https://www.youtube.com/@ZypherRed2", icon: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png", text: "YouTube VODs", tooltip: "Subscribe to my VODs!" },
    { href: "https://twitter.com/ZypherRed", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg", text: "Twitter", tooltip: "Follow me on Twitter!" },
    { href: "https://patreon.com/ZypherRed", icon: "https://upload.wikimedia.org/wikipedia/commons/9/94/Patreon_logo.svg", text: "Patreon", tooltip: "Support me on Patreon!" },
    { href: "https://www.instagram.com/Zypher.Red/", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", text: "Instagram", tooltip: "Follow me on Instagram!" },
    { href: "https://www.facebook.com/ZypherRedLP", icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", text: "Facebook", tooltip: "Like me on Facebook!" },
    { href: "https://www.tiktok.com/@zypherred", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Tiktok_icon.svg", text: "TikTok", tooltip: "Follow me on TikTok!" },
  ];

  return (
    <div className="link-tree">
      <h3>Connect with Me</h3>
      <div className="links">
        {links.map((link, index) => (
          <a href={link.href} target="_blank" rel="noopener noreferrer" data-tooltip={link.tooltip} key={index} className="link-box">
            <img src={link.icon} alt={link.text} className="link-icon" />
            <span>{link.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default LinkTree;
