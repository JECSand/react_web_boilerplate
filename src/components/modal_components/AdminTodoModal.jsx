/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/01/2019
*/

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { todoActions } from "../../actions";


export class AdminTodoModal extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.dataObject) {
            this.modalType = 'Modify';
            this.btnColor = 'secondary';
            this.state = { modal: false, name: this.props.dataObject.name, due: this.props.dataObject.due, uuid: this.props.dataObject.uuid, description: this.props.dataObject.description};
        } else {
            this.state = { modal: false, name: '', due: '' , description: '' };
            this.modalType = 'Create';
            this.btnColor = 'primary';
        }
        this.toggle = this.toggle.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDue = this.handleChangeDue.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
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
    handleChangeDue(event) {
        this.setState({due: event.target.value});
    }
    handleChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let newTodo = {
            "name": this.state.name,
            "due": this.state.due,
            "description": this.state.description
        };
        this.toggle();
        if (this.props.dataObject) {
            newTodo['uuid'] = this.state.uuid;
            return this.props.dispatch(todoActions.modify(newTodo));
        }
        return this.props.dispatch(todoActions.create(newTodo));
    }

    render() {
        return (
            <div>
                <Button color={ this.btnColor } onClick={this.toggle}>{ this.modalType } Todo</Button>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader>{ this.modalType } Todo</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="form-group col-md-5">
                                    <label>Name:</label>
                                    <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-5">
                                    <label>Due:</label>
                                    <input type="date" value={this.state.due} onChange={this.handleChangeDue} className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-5">
                                    <label>Description:</label>
                                    <input type="text" value={this.state.description} onChange={this.handleChangeDescription} className="form-control" />
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