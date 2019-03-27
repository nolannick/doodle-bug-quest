import React from 'react';
import { Container } from 'reactstrap';
import { Link } from "react-router-dom";
import AddQuestModal from './addQuestModal';
import QuestView from './questView';
import {secure} from '../utility/util';


class Quest extends React.Component {
    state = {
        acctId: localStorage.getItem('acct_id'),
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
        secure.get('/api/quests/' + acctId)
        .then( (res) => {
            this.setState({ quests: res.data});
        });
    }

    componentDidMount() {
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
        secure.post('/api/quests', newQuest)
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
                    <Link to={'/quest'} >Quests</Link>
                </nav>
                <AddQuestModal buttonLabel='Add Quests'
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