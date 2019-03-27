import React from 'react';
import * as $ from 'axios';
import { Link } from "react-router-dom";
import { Container } from 'reactstrap';
import RewardModal from './rewardModal';
import RewardsView from './rewardsView';

class Reward extends React.Component {
    state = {
        acctId: localStorage.getItem('acct_id'),
        token: localStorage.getItem('token'),
        title: '',
        description: '',
        rewardvalue: '',
        rewards: []
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    getRewards = acctId => {
        const config = {
            headers: {authorization: this.state.token}
        };
        $.get('/api/rewards/' + acctId, config)
        .then( (res) => {
            // console.log(res);
            this.setState({ rewards: res.data});
        });
    }

    componentDidMount() {
        this.getRewards(this.state.acctId);
    }

    addRewards = e => {
        e.preventDefault();
        const acctId = this.state.acctId;
        // console.log(acctId);
        // console.log(this.state.title);
        // console.log(this.state.description);
        // console.log(this.state.rewardvalue);
        const reward = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.rewardvalue,
            show: true,
            acctId: acctId
        }
        const config = {
            headers: {authorization: this.state.token}
        };
        $.post('/api/reward', reward, config)
        .then( (res) => {
            this.getRewards(acctId);
            this.setState({ title: '', description: '', rewardvalue: ''});
        });


    }

    render() {
        return (
            <Container>
                <nav>
                    <Link to={'/family'} >Family Members | </Link>
                    <Link to={'/quest'} >Quests | </Link>
                    <Link to={'/reward'} >Rewards</Link>
                </nav>
                <RewardModal buttonLabel='Create Rewards'
                     handleChange={this.handleChange}
                     addRewards={this.addRewards}
                     {...this.state}
                /><br></br>
                <RewardsView 
                    rewards={this.state.rewards}
                />
        </Container>)
    }
}

export default Reward