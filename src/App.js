// eslint-disable
import Wheel from "./Wheel";
import React from "react";
import Screen from "./Screen";
import Loader from "./Loader";
import ZingTouch from 'zingtouch';

//import songs
import song1 from './assets/songs/Kesariya.mp3';
import song2 from './assets/songs/RaatanLambiyan.mp3';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      menuId: 0, //which page to load 0-4 --> music, games, settings, nowPlaying - 4-7 --> Music menu
      currentSong: new Audio(song1)
    }
    this.activeId = 0; //which one of the menu is selected
    this.songList = [song1, song2];
    this.currentSongId = 0;
    this.isSongPlaying = false;
  }

  //rotation event handling
  controlWheel = (e) => {
    //get the list of all menu item
    let menuItems = document.querySelectorAll('.list')[0]

    menuItems ? menuItems = menuItems.childNodes : menuItems = undefined;

    if (menuItems) {
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
          if (menuItems[id + 1] === undefined) {
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
          menuItems[id - 1] === undefined ? menuItems[menuItems.length - 1].className = "active" : menuItems[id - 1].className = "active";
          return;
        }
      }
    }
  }

  //menu button is clicked
  clickMenu = () => {
    let currentmenuId = this.state.menuId;

    if (currentmenuId <= 0) {
      this.setState(prevState => ({
        ...prevState,
        menuId: 0
      }));

      return;
    }

    if (currentmenuId > 3 && currentmenuId <= 7) {
      currentmenuId -= 4;
    }

    currentmenuId < 0 ? currentmenuId = 0 : currentmenuId = currentmenuId;

    this.setState(prevState => ({
      ...prevState,
      menuId: currentmenuId
    }));
  }

  //okay button is clicked
  proceed = async () => {
    let menuItems = document.querySelectorAll('.list')[0];

    menuItems ? menuItems = menuItems.childNodes : menuItems = undefined;

    if (menuItems) {
      Object.keys(menuItems).forEach((index) => {
        if (menuItems[index].className === 'active') {
          this.activeId = menuItems[index].value;
        }
      });

      this.setState(prevState => ({
        ...prevState,
        menuId: this.activeId + 4
      }));
    }
  }

  async componentDidMount() {
    //load the component and stop the loader
    await this.setState(prevState => ({
      ...prevState,
      isLoading: false,
      menuId: 0
    }));

    //get all buttons
    const controlWheel = this.controlWheel;
    const that = this;
    const wheel = document.getElementById("wheel");
    const activeRegion = ZingTouch.Region(wheel);
    var longTap = new ZingTouch.Tap({
      maxDelay: 7000
    }); //longtap happens -- for seeking the song
    const menuBtn = document.querySelector('.top');
    const rightBtn = document.querySelector('.right');
    const playBtn = document.querySelector('.bottom');
    const leftBtn = document.querySelector('.left');
    const okay = document.querySelector('.okay');

    activeRegion.bind(menuBtn, 'tap', function (e) {
      that.clickMenu();
    });

    activeRegion.bind(rightBtn, longTap, async function (e) {
      if (e.detail.interval > 200) {
        let cSong = that.state.currentSong;

        if (cSong.paused) return; //if song is not playing return
        cSong.pause();

        cSong.currentTime += 10; // seekForward 10 sec

        if (cSong.currentTime >= cSong.duration) {
          that.nextSong();
        }

        cSong.play();
        return;
      }

      that.nextSong();
    });

    activeRegion.bind(leftBtn, longTap, function (e) {
      if (e.detail.interval > 200) {
        let cSong = that.state.currentSong;

        if (cSong.paused) return; //if song is not playing return
        cSong.pause();

        cSong.currentTime -= 10; // seekForward 10 sec

        if (cSong.currentTime < 0) {
          that.previousSong();
        }

        cSong.play();
        return;
      }
      that.previousSong();
    });

    activeRegion.bind(playBtn, 'tap', function () {
      that.play();
    })

    activeRegion.bind(okay, 'tap', function (e) {
      that.proceed();
    });

    activeRegion.bind(wheel, 'rotate', function (e) {
      controlWheel(e);
    });
  }

  //start playing
  play = async () => {
    let cSong = this.state.currentSong;
    cSong.paused ? cSong.play() : cSong.pause();
  }

  //go to next Song
  nextSong = async () => {
    let cSong = this.state.currentSong;

    //first stop the first song
    if (!cSong.paused) {
      cSong.pause();
    } else {
      return;
    }

    if (this.currentSongId + 1 >= this.songList.length) {
      this.currentSongId = 0;
    } else {
      this.currentSongId++;
    }

    let nextSong = new Audio(this.songList[this.currentSongId]);

    nextSong.addEventListener('loadeddata', async () => {
      console.log(nextSong.duration);

      await this.setState(prevState => ({
        ...prevState,
        currentSong: nextSong
      }));

      nextSong.play();
    });
  }

  //play previous song
  previousSong = async () => {
    let cSong = this.state.currentSong;

    //first stop the first song
    if (!cSong.paused) {
      cSong.pause();
    } else {
      return;
    }

    if (this.currentSongId - 1 < 0) {
      this.currentSongId = this.songList.length - 1;
    } else {
      this.currentSongId--;
    }

    let nextSong = await new Audio(this.songList[this.currentSongId]);

    if (cSong.currentTime > 5) {
      cSong.currentTime = 0;
      this.currentSongId++;
    } else {
      cSong = nextSong;
    }


    await this.setState(prevState => ({
      ...prevState,
      currentSong: cSong
    }));

    cSong.play();
  }

  render() {
    let { isLoading, menuId, currentSong } = this.state;

    return (
      <>
        {isLoading && <Loader />}
        {!isLoading &&
          < div className="App" >
            <Screen
              menuId={menuId}
              keys={menuId}
              currentSong={this.currentSongId}
              play={currentSong}
            />
            <Wheel />
          </div >
        }
      </>
    )
  }
}

export default App;
