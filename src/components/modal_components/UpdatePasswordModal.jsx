/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/01/2019
*/

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { userActions } from "../../actions";


export class UpdatePasswordModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {modal: false, current_password: '', new_password: ''};
        this.btnColor = 'primary';
        this.toggle = this.toggle.bind(this);
        this.handleChangeCurrentPassword = this.handleChangeCurrentPassword.bind(this);
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChangeCurrentPassword(event) {
        this.setState({current_password: event.target.value});
    }

    handleChangeNewPassword(event) {
        this.setState({new_password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let passwordUpdate = {
            "current_password": this.state.current_password,
            "new_password": this.state.new_password
        };
        this.toggle();
        return this.props.dispatch(userActions.updatePassword(passwordUpdate));
    }

    render() {
        return (
            <div>
                <Button color={ this.btnColor } onClick={this.toggle}>Update Password</Button>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader>Update Password</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>Current Password:</label>
                                    <input type="password" value={this.state.current_password} onChange={this.handleChangeCurrentPassword} className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>New Password:</label>
                                    <input type="password" value={this.state.new_password} onChange={this.handleChangeNewPassword} className="form-control" />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <input type="submit" value="Update Password" color="primary" className="btn btn-primary" />
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}