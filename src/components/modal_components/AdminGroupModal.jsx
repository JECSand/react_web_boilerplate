/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/01/2019
*/

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { groupActions } from "../../actions";


export class AdminGroupModal extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.object) {
            this.modalType = 'Modify';
            this.btnColor = 'secondary';
            this.state = {modal: false, name: this.props.object.name, uuid: this.props.object.uuid};
        } else {
            this.state = {modal: false, name: ''};
            this.modalType = 'Create';
            this.btnColor = 'primary';
        }
        this.toggle = this.toggle.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let newGroup = {
            "name": this.state.name,
        };
        this.toggle();
        if (this.props.object) {
            newGroup['uuid'] = this.state.uuid;
            return this.props.dispatch(groupActions.modify(newGroup));
        }
        return this.props.dispatch(groupActions.create(newGroup));
    }

    render() {
        return (
            <div>
                <Button color={ this.btnColor } onClick={this.toggle}>{ this.modalType } Group</Button>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader>{ this.modalType } Group</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>Group Name:</label>
                                    <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}