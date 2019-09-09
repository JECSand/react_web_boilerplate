/*
Author: Connor Sanders
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
        this.state = { modal: false, name: '', due: '' , description: ''};
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
        return this.props.dispatch(todoActions.create(newTodo));
    }

    render() {
        return (
            <div>
                <Button color="success" onClick={this.toggle}>Create Todo</Button>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader>Create Todo</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>Name:</label>
                                    <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>due:</label>
                                    <input type="text" value={this.state.due} onChange={this.handleChangeDue} className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>description:</label>
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