import React from "react";
import './assets/screen.css';
import Loader from "./Loader";
import Menu from './Menu';

class screen extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        });
    }

    render() {
        let { loading } = this.state;

        return (
            <>
                {loading && <Loader />}

                <div className="screen">
                    <Menu />
                </div>
            </>
        );
    }
}

export default screen;