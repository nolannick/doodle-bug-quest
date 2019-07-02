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
        return (
            <div className="Bug gifWrapper">
                <h2>You did it! <br />Great job Doodle Bugger!</h2>

                <iframe title="success" frameBorder='0' src={this.state.gifUrl} ></iframe>

                <Link to='/family' className="gifDoneLink">
                    <button className="gifDone btn btn-success">Back to Family</button>
                </Link>
            </div>
        )
    };
}

export default RandomGif;