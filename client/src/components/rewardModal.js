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
        <Button color="outline-info" onClick={this.toggle}>{this.props.buttonLabel}
        </Button><br></br>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Set rewards...</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Col>
                  <Input type="text" name="title" placeholder="Quest Title"
                    value={this.props.title}
                    onChange={this.props.handleChange}
                  />
                </Col>
                <Col>
                <Input type="select" name="rewardvalue" onChange={this.props.handleChange}>
                    <option>Select Value...</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                      <option value='9'>9</option>
                      <option value='10'>10</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Input type="textarea" name="description" placeholder="Quest Description"
                  value={this.props.description}
                  onChange={this.props.handleChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="info" size='sm' onClick={this.toggle} onClickCapture={this.props.addRewards}>Create</Button>{' '}
            <Button color="secondary" size='sm' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div >
    );
  }
}

export default AddMemberModal;