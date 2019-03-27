import React from 'react';
import * as $ from "axios";
import { Container } from 'reactstrap';
import { Link } from "react-router-dom";
import FamilyView from './familyView';
import AddMemberModal from './addMemberModal';

class Family extends React.Component {

    state = {
        acctId: localStorage.getItem('acct_id'),
        familyname: localStorage.getItem('familyName'),
        memberName: '',
        members: [],
        token: localStorage.getItem("token")
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    getFamilyMembers = (acctId) => {
        const config = {
            headers: {authorization: this.state.token}
        };
        $.get('/api/familyMembers/' + acctId, config )
            .then((res) => {
                console.log(res);
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
        }
        const config = {
            headers: {authorization: this.state.token}
        };
        $.post('/api/familyMembers', memberData, config)
            .then((res) => {
                // console.log(res);
                this.getFamilyMembers(acctId);
                this.setState({ memberName: ''});
            });
    }

    render() {
        return (
            <Container className="info">
            <div className="info-child">
                <nav>
                    <Link to={'/family'} >Family Members | </Link>
                    <Link to={'/quest'} >Quests</Link>
                </nav>
                <AddMemberModal
                    buttonLabel='Add Members'
                    handleChange={this.handleChange}
                    memberName={this.state.memberName}
                    addFamilyMembers={this.addFamilyMembers}
                /><br></br>
                <FamilyView
                    familyname={this.state.familyname}
                    members={this.state.members}
                />
                </div>
            </Container>
        )
    }
}

export default Family;