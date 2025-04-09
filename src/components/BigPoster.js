import React from "react";
import "../styles/BigPoster.css";

const BigPoster = ({ mainImgUrl }) => {
  return (
    <div className="popular-now-right">
      <img src={mainImgUrl} alt="scene" className="main-img" />
      <div className="controls">
        <button className="control-btn"><img src="/mute-icon.svg" alt="Mute Icon"></img></button>
        <button className="control-btn"><img src="/pause-icon.svg" alt="Pause Icon"></img></button>
      </div>
    </div>
  );
};

export default BigPoster;
