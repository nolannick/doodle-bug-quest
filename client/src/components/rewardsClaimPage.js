import React from 'react';
import * as $ from 'axios';
import { Badge } from 'reactstrap';
import RewardClaimModal from './rewardClaimModal';

class RewardClaimPage extends React.Component {
    state = {
        acctId: localStorage.getItem('acct_id'),
        members: [],
        memberId: '',
        rewardId: '',
        doodlebugBucks: '',
        token: localStorage.getItem('token')
    }

    onChange = e => {
        e.preventDefault();
        this.setState({ memberId: e.target.value});
    }

    getFamilyMembers = (acctId) => {
        const config = {
            headers: {authorization: this.state.token}
        };
        $.get('/api/familyMembers/' + acctId, config)
            .then((res) => {
                // console.log(res);
                this.setState({ members: res.data });
            });
    }

    onClick = () => {
        this.getFamilyMembers(this.state.acctId);
        this.setState({ rewardId: this.props.rewardKey, doodlebugBucks: this.props.rewardbucks});
    }

    claimReward = e => {
        e.preventDefault();
        const claimBucks = -this.state.doodlebugBucks;
        const reward = {
            rewardId: this.state.rewardId,
            doodlebugBucks: claimBucks
        }
        const config = {
            headers: {authorization: this.state.token}
        };
        $.put('/api/familyMembers/familyMember/' + this.state.memberId, reward, config)
        .then( (res) => {
            console.log(res);
           
        });
    }

    render() {
        return (
            <div>
                <RewardClaimModal buttonLabel={this.props.title} 
                    members={this.state.members}
                    onClick={this.onClick}
                    onChange={this.onChange}
                    claimReward={this.claimReward}
                />
                <p>{this.props.description}, Reward bucks:{' '}<Badge color="info" size='lg'>{this.props.rewardbucks}</Badge></p>
            </div>
        )
    }
}

export default RewardClaimPage;