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

class CompleteQuestModal extends React.Component {
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
                <Button color="link" onClick={this.toggle} onClickCapture={this.props.onClick}>{this.props.buttonLabel}
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Select a member to claim the reward: {this.props.buttonLabel}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input type="select" name="memberId" onChange={this.props.onChange}>
                                    <option>Select Doodle Bugger...</option>
                                    {this.props.members.map(x => (
                                        <option key={x._id} value={x._id}>{x.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" size='lg' block onClick={this.toggle} onClickCapture={this.props.claimReward}>Claim!</Button>{' '}
                        <Button color="secondary" size='sm' onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
}

export default CompleteQuestModal;