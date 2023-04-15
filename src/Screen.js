import React from "react";
import './assets/screen.css';
import Menu from './Menu';
import Song from './Song';

const Screen = (props) => {
    let { menuId } = props;
    menuId = parseInt(menuId);

    let ismusicSection = (menuId === 4 || menuId >= 8);

    return (
        <>
            <div className="screen">
                {
                    ismusicSection ? <Song selected={menuId} /> : <Menu selected={menuId} />
                }
            </div>
        </>
    );
}


export default Screen;