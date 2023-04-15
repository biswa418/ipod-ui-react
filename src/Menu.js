import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Play from "./Play";

const Menu = (props) => {

    //possible options from 1st menu
    const values = {
        0: "mainMenu",
        5: "isGames",
        6: "isSetting",
        7: "NowPlaying"
    }

    //get the song and it's id from the props
    let { currentSong, play } = props;

    let selected = values[props.selected]; //selected value

    props.selected < 5 ? selected = "mainMenu" : selected = selected;

    //using menu options get the selected value
    const mainMenu = selected === "mainMenu";
    const isGames = selected === "isGames";
    const isSetting = selected === "isSetting";
    const nowPlaying = selected === "NowPlaying";

    return (
        //load individual menu
        <>
            {
                mainMenu &&
                <div className="menu" >
                    <h3>&nbsp; iPod</h3>
                    <ul className="list">
                        <li className="active" value="0">
                            &nbsp;
                            Music
                            <FontAwesomeIcon style={{ margin: '5' }} icon="fa-solid fa-greater-than" size="2xs" inverse />
                        </li>
                        <li className="" value="1">
                            &nbsp;
                            Games
                            <FontAwesomeIcon icon="fa-solid fa-greater-than" size="2xs" inverse />
                        </li>
                        <li className="" value="2">
                            &nbsp;
                            Settings
                            <FontAwesomeIcon icon="fa-solid fa-greater-than" size="2xs" inverse />
                        </li>
                        <li className="" value="3">
                            &nbsp;
                            Now Playing
                            <FontAwesomeIcon icon="fa-solid fa-greater-than" size="2xs" inverse />
                        </li>
                    </ul>
                </div>
            }

            {
                isGames &&
                <div>
                    <h4 className="heading">Games</h4>
                    <img src="./game-box-gif.gif" alt="games" style={{ height: 191, width: '100%' }} />
                </div>
            }

            {
                isSetting &&
                <div>
                    <h4 className="heading">Settings</h4>
                    <img src="./settings.gif" alt="games" style={{ height: 191, width: '100%' }} />
                </div>
            }

            {
                nowPlaying &&
                <Play
                    play={play}
                    currentSong={currentSong}
                />
            }
        </>
    );
}



export default Menu;


