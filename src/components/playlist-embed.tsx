"use client";

import { useState } from "react";
import { ArrowUpRight, Music4, Play } from "lucide-react";

const PLAYLIST_ID = "PLBUBULF4KT8k";
const PLAYLIST_URL = `https://music.youtube.com/playlist?list=${PLAYLIST_ID}`;
const COVER = "https://i.ytimg.com/vi/rn1ph-gmoLA/maxresdefault.jpg";

export function PlaylistEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="playlist-card">
      <div className="playlist-visual">
        {loaded ? (
          <iframe
            className="playlist-frame"
            src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}`}
            title="devzz playlist"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            className="playlist-cover"
            onClick={() => setLoaded(true)}
            aria-label="Load the devzz playlist player"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={COVER} alt="devzz playlist cover" width={1280} height={720} loading="lazy" />
            <span className="playlist-play" aria-hidden="true">
              <Play size={20} fill="currentColor" />
            </span>
          </button>
        )}
      </div>

      <div className="playlist-copy">
        <span className="eyebrow">OFF THE CLOCK</span>
        <h3>devzz</h3>
        <p>122 tracks, 6h 37m of atmosphere. This is what plays while the code compiles.</p>
        <div className="playlist-meta">
          <span><Music4 size={13} /> YouTube Music</span>
          <a href={PLAYLIST_URL} target="_blank" rel="noreferrer" className="text-link">
            Open the playlist <ArrowUpRight size={13} />
          </a>
        </div>
        {!loaded && (
          <button type="button" className="playlist-load" onClick={() => setLoaded(true)}>
            Load player
          </button>
        )}
      </div>
    </div>
  );
}
