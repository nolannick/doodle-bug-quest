import React from "react";
import { Container, Col, Row } from "reactstrap";
import RewardModal from "./rewardModal";
import RewardsView from "./rewardsView";
import { secure } from "../utility/util";

class Reward extends React.Component {
  state = {
    acctId: localStorage.getItem("acct_id"),
    title: "",
    description: "",
    rewardvalue: "",
    rewards: [],
    disabled: true
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (this.state.title && this.state.description && this.state.rewardvalue) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  getRewards = acctId => {
    secure.get("/api/rewards/" + acctId).then(res => {
      // console.log(res);
      this.setState({ rewards: res.data });
    });
  };

  componentDidMount() {
    this.getRewards(this.state.acctId);
  }

  addRewards = e => {
    e.preventDefault();
    const acctId = this.state.acctId;
    const reward = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.rewardvalue,
      show: true,
      acctId: acctId
    };
    secure.post("/api/reward", reward).then(res => {
      this.getRewards(acctId);
      this.setState({ title: "", description: "", rewardvalue: "" });
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col className="Bug">
            <RewardsView rewards={this.state.rewards} />
          </Col>
        </Row>
        <Row>
          <Col className="Bug">
            <RewardModal
              buttonLabel="Create Rewards"
              handleChange={this.handleChange}
              addRewards={this.addRewards}
              {...this.state}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Reward;
