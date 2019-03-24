import React from 'react';
import * as $ from "axios";
import { Container, Row, Button, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import LoginForm from './LoginForm';
import AddFamily from './addFamily';
import AddModal from './AddModal';

class Family extends React.Component {

    state = {
        username: '',
        password: '',

        familyname: '',
        acctId: '',

        memberName: '',
        members: [],
        familes: []
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
            });
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    componentDidMount = () => {
        $.get('/api/familyMembers/'+ this.state.acctId)
            .then((res) => {
                console.log(res);
                // this.setState({ familes: res.data });
            });
        // console.log(this.state.familes);
    }

    getFamilyMembers = (acctId) => {
        $.get('/api/familyMembers/'+ acctId)
        .then( (res) => {
            console.log(res);
            this.setState({ members: res.data});
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
                </Row>
                <Row>
                    <Col>
                        <AddFamily
                            familyname={this.state.familyname}
                            account={this.state.familes} 
                            members={this.members}
                        />
                        
                    </Col>
                    <Col>
                        <Button color='link'>Add Members</Button>
                        <AddModal buttonLabel='Add Members'
                            handleChange={this.handleChange}
                            memberName={this.state.memberName}
                            addFamilyMembers={this.addFamilyMembers}
                        />
                    </Col>


                </Row>
            </Container>
        )
    }
}

export default Family