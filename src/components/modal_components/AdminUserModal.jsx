/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/01/2019
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { userActions} from "../../actions";


class AdminUserModal extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.dataObject) {
            this.modalType = 'Modify';
            this.btnColor = 'secondary';
            this.state = {modal: false, username: this.props.dataObject.username, password: '', uuid: this.props.dataObject.uuid,
                    firstname: this.props.dataObject.firstname, lastname: this.props.dataObject.lastname,
                    email: this.props.dataObject.email, groupuuid: this.props.dataObject.groupuuid, role: this.props.dataObject.role};
        } else {
            this.btnColor = 'primary';
            this.modalType = 'Create';
            this.state = { modal: false, email: '', username: '' , password: '',
                firstname: '', lastname: '', groupuuid: '', role: 'member'};
        }
        this.roleData = [
            { value: 'member', name: 'Member' },
            { value: 'group_admin', name: 'Admin' },
            { value: 'master_admin', name: 'System Admin' }
        ];
        this.toggle = this.toggle.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeLastname= this.handleChangeLastname.bind(this);
        this.handleChangeGroupuuid= this.handleChangeGroupuuid.bind(this);
        this.handleChangeRole= this.handleChangeRole.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }
    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }
    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }
    handleChangeFirstname(event) {
        this.setState({firstname: event.target.value});
    }
    handleChangeLastname(event) {
        this.setState({lastname: event.target.value});
    }
    handleChangeGroupuuid(event) {
        this.setState({groupuuid: event.target.value});
    }
    handleChangeRole(event) {
        this.setState({role: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let newUser = {
            "username": this.state.username,
            "password": this.state.password,
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "email": this.state.email,
            "groupuuid": this.state.groupuuid,
            "role": this.state.role
        };
        this.toggle();
        if (this.props.dataObject) {
            newUser['uuid'] = this.state.uuid;
            return this.props.dispatch(userActions.modify(newUser));
        }
        if (this.props.useContext === 'admin') {
            return this.props.dispatch(userActions.create(newUser));
        }
    }

    render() {
        return (
            <div>
                <Button color={ this.btnColor } onClick={this.toggle}>{ this.modalType } User</Button>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader>{ this.modalType } User</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>Email:</label>
                                    <input type="email" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>Username:</label>
                                    <input type="text" value={this.state.username} onChange={this.handleChangeUsername} className="form-control" />
                                </div>
                            </div>
                            {(this.props.useContext === 'admin' && this.props.groups.items) &&
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>Password:</label>
                                    <input type="password" value={this.state.password}
                                           onChange={this.handleChangePassword} className="form-control"/>
                                </div>
                            </div>
                            }
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>First Name:</label>
                                    <input type="text" value={this.state.firstname} onChange={this.handleChangeFirstname} className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>Last Name:</label>
                                    <input type="text" value={this.state.lastname} onChange={this.handleChangeLastname} className="form-control" />
                                </div>
                            </div>
                            {(this.props.role === 'master_admin' && this.props.useContext === 'admin' && this.props.groups.items) &&
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>Select a User Group:</label>
                                    <select name="groupuuid" value={this.state.groupuuid} onChange={this.handleChangeGroupuuid} className="form-control" >
                                        {this.props.groups.items.map((e, key) => {
                                            return <option key={key} value={e.uuid}>{e.name}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>
                            }
                            {(this.props.useContext === 'admin' && this.props.groups.items) &&
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>Select User Role:</label>
                                    <select name="role" value={this.state.role} onChange={this.handleChangeRole}
                                            className="form-control">
                                        {this.roleData.map((e, key) => {
                                            return <option key={key} value={e.value}>{e.name}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>
                            }
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

function mapStateToProps(state) {
    const { groups } = state;
    return {
        groups
    };
}

const connectedAdminUserModal = connect(mapStateToProps)(AdminUserModal);
export { connectedAdminUserModal as AdminUserModal };