import React from 'react';
import * as $ from 'axios';
import { Container } from 'reactstrap';
import { Link } from "react-router-dom";
import AddQuestModal from './addQuestModal';
import QuestView from './questView';


class Quest extends React.Component {
    state = {
        acctId: localStorage.getItem('acctId'),
        title: '',
        description: '',
        bucksvalue: '',
        quests: []
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    getQuests = acctId => {
        $.get('/api/quests/' + acctId)
        .then( (res) => {
            console.log(res);
            this.setState({ quests: res.data});
        });
    }

    componentDidMount() {
        console.log(this.state.acctId);
        this.getQuests(this.state.acctId);
    }

    addQuests = e => {
        e.preventDefault();
        const acctId = this.state.acctId;
        console.log(this.state.title);
        console.log(this.state.bucksvalue);
        console.log(this.state.description);
        const newQuest = {
            title: this.state.title,
            description: this.state.description,
            value: this.state.bucksvalue,
            show: true,
            acctId: acctId
        }
        $.post('/api/quests', newQuest)
        .then( (res) => {
            console.log(res);
        });
    }

    render() {
        return (
            <Container>
                <nav>
                    <Link to={'/family'} >Home | </Link>
                    <Link to={'/family/add'} >Quests</Link>
                </nav>
                <AddQuestModal buttonLabel='Add Quests'
                    handleChange={this.handleChange}
                    addQuests={this.addQuests}
                    {...this.state}
                />
                <QuestView 
                    quests={this.state.quests}
                />
            </Container>)
    }
}

export default Quest;