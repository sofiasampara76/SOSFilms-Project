import React, { useRef, useState, useEffect } from "react";
import "../styles/BigPoster.css";
import ReactPlayer from "react-player/youtube";

const BigPoster = ({ trailerUrl }) => {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  return (
    <div className="popular-now-right">
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url={trailerUrl}
          playing={playing}
          controls={false}
          width={'100%'}
          height={'100%'}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                controls: 0,
              },
            },
          }}
        />
      </div>
      <div className="controls">
        <button className="control-btn" onClick={() => setMuted((m) => !m)}>
          <img src={muted ? "/mute-icon.svg" : "/volume-icon.svg"} alt="" />
        </button>
        <button className="control-btn" onClick={() => setPlaying((p) => !p)}>
          <img src={playing ? "/pause-icon.svg" : "/play-icon.svg"} alt="" />
        </button>
      </div>
    </div>
  );
};

export default BigPoster;
