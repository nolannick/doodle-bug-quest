import React from 'react';
import * as $ from 'axios';
import { Container } from 'reactstrap';
import { Link } from "react-router-dom";
import AddQuestModal from './addQuestModal';
import QuestView from './questView';


class Quest extends React.Component {
    state = {
        acctId: localStorage.getItem('acct_id'),
        title: '',
        description: '',
        bucksvalue: '',
        quests: [],
        token: localStorage.getItem('token')
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    getQuests = acctId => {
        const config = {
            headers: {authorization: this.state.token}
        };
        $.get('/api/quests/' + acctId, config)
        .then( (res) => {
            this.setState({ quests: res.data});
        });
    }

    componentDidMount() {
        // console.log(this.state.acctId);
        this.getQuests(this.state.acctId);
    }

    addQuests = e => {
        e.preventDefault();
        const acctId = this.state.acctId;
        const newQuest = {
            title: this.state.title,
            description: this.state.description,
            value: this.state.bucksvalue,
            show: true,
            acctId: acctId
        }
        const config = {
            headers: {authorization: this.state.token}
        };
        $.post('/api/quests', newQuest, config)
        .then( (res) => {
            // console.log(res);
            this.getQuests(acctId);
            this.setState({ title: '', description: '', bucksvalue: ''});
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
                <AddQuestModal buttonLabel='Create Quests'
                    handleChange={this.handleChange}
                    addQuests={this.addQuests}
                    {...this.state}
                /><br></br>
                <QuestView 
                    quests={this.state.quests}
                />
            </Container>)
    }
}

export default Quest;