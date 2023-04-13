import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Menu extends React.Component {

    render() {
        return (
            <div className="menu">
                <h3>&nbsp; iPod</h3>
                <ul className="list">
                    <li className="">
                        &nbsp;
                        Music
                        <FontAwesomeIcon style={{ margin: '5' }} icon="fa-solid fa-greater-than" size="2xs" inverse />
                    </li>
                    <li className="">
                        &nbsp;
                        Games
                        <FontAwesomeIcon icon="fa-solid fa-greater-than" size="2xs" inverse />
                    </li>
                    <li className="active">
                        &nbsp;
                        Settings
                        <FontAwesomeIcon icon="fa-solid fa-greater-than" size="2xs" inverse />
                    </li>
                    <li className="">
                        &nbsp;
                        Now Playing
                        <FontAwesomeIcon icon="fa-solid fa-greater-than" size="2xs" inverse />
                    </li>
                </ul>
            </div>
        );
    }
}


export default Menu;


