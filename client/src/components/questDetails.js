import React from 'react';
import { Badge } from 'reactstrap';
import CompleteQuestModal from './completQuestModal';
import {secure} from '../utility/util';
import Popup from 'reactjs-popup';

class QuestDetails extends React.Component {
    state = {
        acctId: localStorage.getItem('acct_id'),
        members: [],
        memberId: '',
        questId: '',
        doodlebugBucks: ''
    }

    onChange = e => {
        e.preventDefault();
        this.setState({ memberId: e.target.value});
    }

    getFamilyMembers = (acctId) => {
        secure.get('/api/familyMembers/' + acctId)
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
        const newQuest = {
            questId: this.state.questId,
            doodlebugBucks: this.state.doodlebugBucks
        }
        secure.put('/api/familyMembers/familyMember/' + this.state.memberId, newQuest)
        .then( (res) => {
            console.log(res);
           
        });
    }

    onRemoveClick = () => {
        const questKey = this.props.questKey;
        secure.delete('/api/quests/quest/' + questKey)
            .then((res) => {
                window.location.href = "/quest";
            });
    }

    render() {
        return (
            <div className="inLine">
                <CompleteQuestModal buttonLabel={this.props.title} 
                    members={this.state.members}
                    onClick={this.onClick}
                    onChange={this.onChange}
                    completeQuest={this.completeQuest}
                />
                <Popup trigger={<button className='btn btn-link remove'>Remove</button>} position="left center">
                    <div>Are you sure you want to remove this quest?
                        <button onClick={this.onRemoveClick}>Remove</button>
                    </div>
                </Popup>
                <p>{this.props.description}</p>
                <p className="floatR"> Quest bucks:{' '}<Badge color="info" size='lg'>{this.props.questbucks}</Badge></p>
            </div>
        )
    }
}

export default QuestDetails;