import React from "react";
import { Container, Col, Row } from "reactstrap";
import AddQuestModal from "./addQuestModal";
import QuestView from "./questView";
import { secure } from "../utility/util";

class Quest extends React.Component {
  state = {
    acctId: localStorage.getItem("acct_id"),
    title: "",
    description: "",
    bucksvalue: "",
    quests: [],
    disabled: true
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (this.state.title && this.state.description && this.state.bucksvalue) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  getQuests = acctId => {
    secure.get("/api/quests/" + acctId).then(res => {
      this.setState({ quests: res.data });
    });
  };

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
    };
    secure.post("/api/quests", newQuest).then(res => {
      // console.log(res);
      this.getQuests(acctId);
      this.setState({ title: "", description: "", bucksvalue: "" });
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col className="Bug">
            <QuestView quests={this.state.quests} />
          </Col>
        </Row>
        <Row>
          <Col className="Bug">
            <AddQuestModal
              buttonLabel="Create Quests"
              handleChange={this.handleChange}
              addQuests={this.addQuests}
              {...this.state}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Quest;
