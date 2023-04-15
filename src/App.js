import Wheel from "./Wheel";
import React from "react";
import Screen from "./Screen";
import Loader from "./Loader";
import ZingTouch from 'zingtouch';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      menuId: 0 //which page to load 0-4 --> music, games, settings, nowPlaying - 4-7 --> Music menu
    }
    this.activeId = 2;
  }

  //rotation event handling
  controlWheel = (e) => {
    //get the list of all menu item
    let menuItems = document.querySelectorAll('.list')[0].childNodes;

    //check if the distance is more than 15 deg
    if (Math.abs(e.detail.distanceFromOrigin) > 15) {
      e.detail.distanceFromOrigin = 0;

      //rotation is clockwise
      if (e.detail.distanceFromLast > 0) {
        //reset
        e.detail.distanceFromLast = 0;

        Object.keys(menuItems).forEach((index) => {
          if (menuItems[index].className === 'active') {
            this.activeId = index;
          }
        });

        let id = parseInt(this.activeId);
        menuItems[id].className = ''; //remove the class name active

        //if out of index -- reset
        if (menuItems[id + 1] == undefined) {
          menuItems[0].className = "active"
          this.activeId = 0;
        }
        else {
          menuItems[id + 1].className = "active";
          this.activeId = id + 1;
        }
        return;

        //rotation is clockwise
      } else if (e.detail.distanceFromLast < 0) {
        e.detail.distanceFromOrigin = 0;
        e.detail.distanceFromLast = 0;

        Object.keys(menuItems).forEach((index) => {
          if (menuItems[index].className === 'active') {
            this.activeId = index;
          }
        });

        let id = parseInt(this.activeId);
        menuItems[id].className = '';
        menuItems[id - 1] == undefined ? menuItems[menuItems.length - 1].className = "active" : menuItems[id - 1].className = "active";
        return;
      }
    }
  }

  //menu button is clicked
  clickMenu = () => {
    let currentmenuId = this.state.menuId;

    console.log(currentmenuId);

    if (currentmenuId <= 0) {
      this.setState({
        isLoading: false,
        menuId: 0
      });
      return;
    }

    if (currentmenuId > 3 && currentmenuId <= 7) {
      currentmenuId -= 4;
    }

    currentmenuId < 0 ? currentmenuId = 0 : currentmenuId = currentmenuId;

    this.setState({
      isLoading: false,
      menuId: currentmenuId
    });
  }

  //okay button is clicked
  proceed = async () => {
    let menuItems = document.querySelectorAll('.list')[0].childNodes;

    Object.keys(menuItems).forEach((index) => {
      if (menuItems[index].className === 'active') {
        this.activeId = menuItems[index].value;
      }
    });

    this.setState({
      isLoading: false,
      menuId: this.activeId + 4
    });
  }

  async componentDidMount() {
    await this.setState({
      isLoading: false,
      menuId: 0
    });

    //get all buttons
    const controlWheel = this.controlWheel;
    const that = this;
    const wheel = document.getElementById("wheel");
    const activeRegion = ZingTouch.Region(wheel);
    const menuBtn = document.querySelector('.top');
    const rightBtn = document.querySelector('.right');
    const playBtn = document.querySelector('.bottom');
    const leftBtn = document.querySelector('.left');
    const okay = document.querySelector('.okay');

    activeRegion.bind(menuBtn, 'tap', function (e) {
      that.clickMenu();
    });

    activeRegion.bind(okay, 'tap', function (e) {
      that.proceed();
    });

    activeRegion.bind(wheel, 'rotate', function (e) {
      controlWheel(e);
    });
  }

  render() {
    let { isLoading, menuId } = this.state;

    return (
      <>
        {isLoading && <Loader />}
        {!isLoading &&
          < div className="App" >
            <Screen
              menuId={menuId}
              keys={menuId}
            />
            <Wheel />
          </div >
        }
      </>
    )
  }
}

export default App;
