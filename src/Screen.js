import React from "react";
import './assets/screen.css';
import Menu from './Menu';
import Song from './Song';

const Screen = (props) => {
    let { menuId, keys, currentSong, play } = props;
    menuId = parseInt(menuId);
    let currentSongId = parseInt(currentSong);

    let ismusicSection = (menuId === 4 || menuId >= 8);

    return (
        <>
            <div className="screen">
                {
                    ismusicSection ? <Song selected={menuId} currentSong={currentSongId} play={play} /> : <Menu selected={menuId} currentSong={currentSongId} play={play} />
                }
            </div>
        </>
    );
}


export default Screen;