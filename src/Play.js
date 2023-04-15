import React from "react";
import './assets/play.css';

const Play = (props) => {
    let { play, currentSong } = props;
    let minutes, seconds, maxMins, maxSeconds;
    let duration = play.duration;

    maxMins = Math.floor(duration / 60);
    maxSeconds = Math.floor(duration % 60);

    //console.log(play);
    play.ontimeupdate = function (e) {
        let progressBar = document.getElementById('progressed');
        progressBar.style.width = Math.floor(100 * (play.currentTime / play.duration)) + "%";
        //calculate time
        minutes = Math.floor(play.currentTime / 60);
        seconds = Math.floor(play.currentTime % 60);

        minutes < 10 ? minutes = "0" + minutes : minutes = minutes;
        seconds < 10 ? seconds = "0" + seconds : seconds = seconds;

        document.getElementById('currentTime').innerText = `${minutes}:${seconds}`;
    }

    //thumbnail
    const thumbnails = {
        0: "./Keshariya.jpg",
        1: "./Raatan-Lambiyan.webp",
    }

    //name of songs
    const names = {
        0: "Keshariya",
        1: "Raatan Lambiyan"
    }

    //artist names
    const artist = {
        0: "Arijit Singh",
        1: "Jubin Nautiyal, Asees Kaur"
    }

    return (
        <div className="playbox">
            <div className="cover">
                <div className="image">
                    <img className="coverImage" src={thumbnails[currentSong]} alt="cover-image" />
                </div>

                <div className="artist">
                    <h3 className="song-name">{names[currentSong]}</h3>
                    <p className="artist-details">{artist[currentSong]}</p>
                </div>
            </div>

            <div id="progress-bar" className="progress-bar">
                <div id="progressed" className="progressed">
                </div>
                <div className="time">
                    <p id="currentTime">00:00</p>
                    <p id="maxTime">{maxMins}:{maxSeconds}</p>
                </div>
            </div>
        </div>
    );
}

export default Play;