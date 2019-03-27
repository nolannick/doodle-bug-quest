import React from 'react';
import * as $ from 'axios';
import { Badge } from 'reactstrap';
import CompleteQuestModal from './completQuestModal';

class QuestDetails extends React.Component {
    state = {
        acctId: localStorage.getItem('acct_id'),
        members: [],
        memberId: '',
        questId: '',
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
        this.setState({ questId: this.props.questKey, doodlebugBucks: this.props.questbucks});
    }

    completeQuest = e => {
        e.preventDefault();
        console.log(this.state.questId);
        console.log(this.state.doodlebugBucks);
        const newQuest = {
            questId: this.state.questId,
            doodlebugBucks: this.state.doodlebugBucks
        }
        const config = {
            headers: {authorization: this.state.token}
        };
        $.put('/api/familyMembers/familyMember/' + this.state.memberId, newQuest, config)
        .then( (res) => {
            console.log(res);
           
        });
    }

    render() {
        return (
            <div>
                <CompleteQuestModal buttonLabel={this.props.title} 
                    members={this.state.members}
                    onClick={this.onClick}
                    onChange={this.onChange}
                    completeQuest={this.completeQuest}
                />
                <p>{this.props.description}, Quest bucks:{' '}<Badge color="info" size='lg'>{this.props.questbucks}</Badge></p>
            </div>
        )
    }
}

export default QuestDetails;