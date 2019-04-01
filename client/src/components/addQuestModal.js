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
          <ModalHeader toggle={this.toggle}>Set a family quest...</ModalHeader>
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
                <Input type="number" min="0" name="bucksvalue" onChange={this.props.handleChange}>
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
            <Button color="info" size='sm' onClick={this.toggle} onClickCapture={this.props.addQuests}>Create</Button>{' '}
            <Button color="secondary" size='sm' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div >
    );
  }
}

export default AddMemberModal;