import React from "react";
import './assets/play.css';

const Play = (props) => {
    console.log('Now Playing');




    return (
        <div className="playbox">
            <div className="cover">
                <img src="{ }" alt="cover-image" />
            </div>

            <div className="artist">
                <h3 className="song-name">{ }</h3>
                <p className="artist-details">{ }</p>
            </div>
        </div>
    );
}

export default Play;