import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input
} from 'reactstrap';

class AddModal extends React.Component {
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
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add a family member...</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input type="text" name="memberName" placeholder="Super Agent Name" 
                  value={this.props.memberName}
                  onChange={this.props.handleChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="info" size='sm' onClick={this.toggle} onClickCapture={this.props.addFamilyMembers}>Create</Button>{' '}
            <Button color="secondary" size='sm' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div >
    );
  }
}

export default AddModal;