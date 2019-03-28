import React from 'react';
import * as $ from "axios";
import { Link } from 'react-router-dom';


class RandomGif extends React.Component {

    state = {
        gifUrl: ''
    }

    componentDidMount = () => {
        $({
            url: "/api/gifs",
            method: "GET"
        }).then((randomGif) => {
            this.setState({ gifUrl: randomGif.data.embedURL })
        });
    };

    render() {
        const divStyle = {
            width: '100%',
            height: '0',
            paddingBottom: '100%',
            float: 'left',
            position: 'relative'
        }
        const iFrameStyle = {
            width: '100%',
            position: 'absolute'
        }
        return (
            <div>
                <h2>You did it! Good job Doodle Bugger!</h2>
            <div style={divStyle}>
                    <iframe title="success" frameBorder='0' src={this.state.gifUrl} style={iFrameStyle}></iframe>
                </div>
                <Link to='/family'>
                    <button className="gifDone btn btn-success">Back to Family</button>
                </Link>
            </div>
        )
    };
}

export default RandomGif;