import React from "react";
import './assets/screen.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Play from "./Play";

const Song = (props) => {

    const { selected, play, currentSong } = props;
    let isSong = false;

    if (selected >= 8) {
        isSong = true;
    }

    return (
        <>
            {
                !isSong &&
                <div className="menu" >
                    <h3>&nbsp; Songs</h3>
                    <ul className="list">
                        <li className="active" value="4">
                            &nbsp;
                            All Songs
                            <FontAwesomeIcon style={{ margin: '5' }} icon="fa-solid fa-greater-than" size="2xs" inverse />
                        </li>
                        <li className="" value="5">
                            &nbsp;
                            Artists
                            <FontAwesomeIcon icon="fa-solid fa-greater-than" size="2xs" inverse />
                        </li>
                        <li className="" value="6">
                            &nbsp;
                            Albums
                            <FontAwesomeIcon icon="fa-solid fa-greater-than" size="2xs" inverse />
                        </li>
                    </ul>
                </div>
            }

            {
                isSong &&
                <Play
                    play={play}
                    currentSong={currentSong}
                />
            }
        </>
    );

}


export default Song;