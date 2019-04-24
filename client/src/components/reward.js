import React from 'react';
import { Container } from 'reactstrap';
import RewardModal from './rewardModal';
import RewardsView from './rewardsView';
import {secure} from '../utility/util';
import Nav from './navigation';

class Reward extends React.Component {
    state = {
        acctId: localStorage.getItem('acct_id'),
        title: '',
        description: '',
        rewardvalue: '',
        rewards: [],
        disabled: true
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (this.state.title && this.state.description && this.state.rewardvalue) {
            this.setState({disabled: false})
        } else {this.setState({disabled: true})} 
    }

    getRewards = acctId => {
        secure.get('/api/rewards/' + acctId)
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
        const reward = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.rewardvalue,
            show: true,
            acctId: acctId
        }
        secure.post('/api/reward', reward)
        .then( (res) => {
            this.getRewards(acctId);
            this.setState({ title: '', description: '', rewardvalue: ''});
        });


    }

    render() {
        return (
            <Container className="Bug">
                <Nav />
                <RewardModal buttonLabel='Create Rewards'
                     handleChange={this.handleChange}
                     addRewards={this.addRewards}
                     {...this.state}
                />
                <RewardsView 
                    rewards={this.state.rewards}
                />
        </Container>)
    }
}

export default Reward