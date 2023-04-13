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
    }
    this.activeId = 2;
  }

  //rotation event handling
  controlWheel = (e) => {
    //get the list of all menu item
    let menuItems = document.querySelectorAll('.list')[0].childNodes;

    //check if the distance is more than 15 deg
    if (Math.abs(e.detail.distanceFromOrigin) > 15) {
      //rotation is clockwise
      if (e.detail.distanceFromLast > 0) {
        //reset
        e.detail.distanceFromOrigin = 0;
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

  async componentDidMount() {
    await this.setState({
      isLoading: false
    });

    const controlWheel = this.controlWheel;
    const wheel = document.getElementById("wheel");
    const activeRegion = ZingTouch.Region(wheel);

    activeRegion.bind(wheel, 'rotate', function (e) {
      controlWheel(e);
    });
  }

  render() {
    let { isLoading } = this.state;

    return (
      <>
        {isLoading && <Loader />}
        {!isLoading &&
          < div className="App" >
            <Screen
            />
            <Wheel />
          </div >
        }
      </>
    )
  }
}

export default App;
