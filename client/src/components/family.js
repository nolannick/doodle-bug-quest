import React from 'react';
import * as $ from "axios";
import { Container, Row, Col } from 'reactstrap';
// import { Link } from "react-router-dom";
import LoginForm from './loginForm';
import FamilyView from './familyView';
import AddMemberModal from './addMemberModal';

class Family extends React.Component {

    state = {
        username: '',
        password: '',
        // acctIId: localStorage.getItem('userId'),
        // familyname: localStorage.getItem('familyname'),
        acctId: '',
        familyname: '',
        memberName: '',
        members: []
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    getFamilyMembers = (acctId) => {
        $.get('/api/familyMembers/' + acctId)
            .then((res) => {
                console.log(res);
                this.setState({ members: res.data });
            });
    }
    // DELETE this form (fake login) once switch to /api/users/session authentication
    handleClick = e => {
        e.preventDefault();
        const loginAccount = {
            username: this.state.username,
            password: this.state.password
        }
        $.post('/api/login', loginAccount)
            .then((res) => {
                console.log(res);
                this.setState({ familyname: res.data[0].familyname, acctId: res.data[0]._id });
                this.getFamilyMembers(this.state.acctId);
            });
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
        $.post('/api/familyMembers', memberData)
            .then((res) => {
                console.log(res);
                this.getFamilyMembers(acctId);
            });
    }

    render() {
        return (
            <Container className='App'>
                <Row>
                    <LoginForm
                        handleChange={this.handleChange}
                        handleClick={this.handleClick}
                        username={this.state.username}
                        password={this.state.password}
                    />
                </Row><br></br>
                <Row>
                    <Col>
                        <AddMemberModal buttonLabel='Add Members'
                            handleChange={this.handleChange}
                            memberName={this.state.memberName}
                            addFamilyMembers={this.addFamilyMembers}
                        /><br></br>
                        <FamilyView
                            familyname={this.state.familyname}
                            members={this.state.members}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Family;