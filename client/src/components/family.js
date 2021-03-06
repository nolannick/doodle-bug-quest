import React from 'react';
import { Container } from 'reactstrap';
import FamilyView from './familyView';
import AddMemberModal from './addMemberModal';
import { secure } from '../utility/util';
import Nav from './navigation';

class Family extends React.Component {

    state = {
        acctId: localStorage.getItem('acct_id'),
        familyname: localStorage.getItem('familyName'),
        memberName: '',
        members: []
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    getFamilyMembers = (acctId) => {
        secure.get('/api/familyMembers/' + acctId)
            .then((res) => {
                // console.log(res);
                this.setState({ members: res.data });
            });
    }

    componentDidMount() {
        this.getFamilyMembers(this.state.acctId);
    }

    addFamilyMembers = e => {
        e.preventDefault();
        const acctId = this.state.acctId;
        const memberData = {
            name: this.state.memberName,
            doddlebugBucks: 0,
            quests: [],
            rewards: [],
            acctId: acctId
        };
        secure.post('/api/familyMembers', memberData)
            .then((res) => {
                // console.log(res);
                this.getFamilyMembers(acctId);
                this.setState({ memberName: '' });
            });
    }

    render() {
        return (
            <Container className="Bug">
                <Nav />
                <AddMemberModal buttonLabel='Add Members'
                    handleChange={this.handleChange}
                    memberName={this.state.memberName}
                    addFamilyMembers={this.addFamilyMembers}
                /><br></br>
                <FamilyView
                    familyname={this.state.familyname}
                    members={this.state.members}
                />

            </Container>
        )
    }
}

export default Family;