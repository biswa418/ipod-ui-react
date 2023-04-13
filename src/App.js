import Wheel from "./Wheel";
import React from "react";
import Screen from "./Screen";
import Loader from "./Loader";
import ZingTouch from 'zingtouch';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  controlWheel = (e) => {
    console.log(e, "Rotating wheel");
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
            <Screen />
            <Wheel />
          </div >
        }
      </>
    )
  }
}

export default App;
