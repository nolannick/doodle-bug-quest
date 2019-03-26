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
        quests: []
    }

    onChange = e => {
        e.preventDefault();
        this.setState({ memberId: e.target.value});
    }

    getFamilyMembers = (acctId) => {
        $.get('/api/familyMembers/' + acctId)
            .then((res) => {
                // console.log(res);
                this.setState({ members: res.data });
            });
    }

    onClick = () => {
        this.getFamilyMembers(this.state.acctId);
        this.setState({ questId: this.props.questKey});
    }

    // componentDidMount() {
       
    // }

    getQuestValue = questId => {
        $.get('/api/quest/' + questId)
        .then( (res) => {
           console.log(res);
        });
    }

    completeQuest = e => {
        e.preventDefault();
        // console.log(this.state.memberId);
        // console.log(this.state.questId);
        const quest = {
            id: this.state.questId
        }
        $.put('/api/familyMembers/quest/' + this.state.memberId, quest)
        .then( (res) => {
            console.log(res);
            const quests = res.data.quests;
            console.log(quests);
            // let scores = 0;
            // for ( let i = 0; i < quests.length; i++){
                // this.getQuestValue(quest[i])
                // scores = scores + quests[i].value;
            // }
            // console.log(scores);
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
                <p>{this.props.description}, Quest bucks:{' '}<Badge color="info">{this.props.questbucks}</Badge></p>
            </div>
        )
    }
}


export default QuestDetails;