import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Col,
  Input
} from 'reactstrap';

class AddMemberModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button className="addCreateBtn" color="outline-info" onClick={this.toggle}>{this.props.buttonLabel}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Set rewards...</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Col>
                  <Input type="text" name="title" placeholder="Reward Title"
                    value={this.props.title}
                    onChange={this.props.handleChange}
                  />
                </Col>
                <Col>
                <Input type="number" min="0" name="rewardvalue" onChange={this.props.handleChange}>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Input type="textarea" name="description" placeholder="Reward Description"
                  value={this.props.description}
                  onChange={this.props.handleChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="info" size='sm' disabled={this.props.disabled} onClick={this.toggle} onClickCapture={this.props.addRewards}>Create</Button>{' '}
            <Button color="secondary" size='sm' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div >
    );
  }
}

export default AddMemberModal;