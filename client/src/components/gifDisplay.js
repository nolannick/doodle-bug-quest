import React from 'react';
import * as $ from "axios";
import { Link } from 'react-router-dom'

// const getFilteredPosts = () => {
//     $({
//         url:`/api/gifs`,
//         method: "GET"
//         // headers: {'Authorization': 'Bearer ' + this.props.accessToken}
//     }).then((posts) =>{
//         this.setState({posts: posts.data});
//     });
// };

// const RandomGif = () => {
//         $.get({
//             url:`/api/gifs`
//             // headers: {'Authorization': 'Bearer ' + this.props.accessToken}
//         }).then((gif) =>{
//             console.log(gif)
//             return (
//                 <div>
//                 {gif.data.gifName}
//                 </div>
//             )
//         });
// }

class RandomGif extends React.Component {

    state = {
        gifUrl: ''
    }

    componentDidMount = () => {
        $({
            url: "/api/gifs",
            method: "GET"
            // headers: {'Authorization': 'Bearer ' + this.props.accessToken}
        }).then((randomGif) => {
            // console.log(randomGif)
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
            position: 'absolute',
            frameBorder: '0',
        }
        return (
            <div>
                You did it! Good job Doodle Bugger!
            <div style={divStyle}>
                    <iframe title="success" src={this.state.gifUrl} style={iFrameStyle}></iframe>
                </div>
                <Link to='/family'>
                    <button className="gifDone">Back to Family</button>
                </Link>
            </div>
        )
    };
}

export default RandomGif;