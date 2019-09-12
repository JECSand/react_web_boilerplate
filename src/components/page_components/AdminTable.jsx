/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/01/2019
*/

import React from 'react';
import { Button, Collapse, Card, CardBody } from 'reactstrap';
import { userActions, groupActions, todoActions } from '../../actions';
import { AdminUserModal } from '../modal_components/AdminUserModal';
import { AdminGroupModal } from '../modal_components/AdminGroupModal';
import { AdminTodoModal } from '../modal_components/AdminTodoModal';


export class AdminTable extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
        this.useContext = this.props.useContext ? this.props.useContext : 'member'
    }

    // Handler that dispatches a user delete action to the backend
    handleDelete(id) {
        if (this.props.tableType === "users") {
            return (e) => this.props.dispatch(userActions.delete(id));
        } else if (this.props.tableType === "groups") {
            return (e) => this.props.dispatch(groupActions.delete(id));
        } else if (this.props.tableType === "todos") {
            return (e) => this.props.dispatch(todoActions.delete(id));
        }
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        let objectName = "name";
        if (this.props.tableType === "users") {
            objectName = "username";
        }
        return (
            <div>
                <h3>{ this.props.tableType } Manager:</h3>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Show { this.props.tableType }</Button>
                {this.props.objects.loading && <em>Loading { this.props.tableType } ...</em>}
                {this.props.objects.error && <span className="text-danger">ERROR: {this.props.objects.error}</span>}
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                {this.props.objects.items &&
                <ul>
                    {this.props.objects.items.map((object, index) =>
                        <li key={object.uuid}>
                            {object.uuid + ' - ' + object[objectName]}
                            <div>
                                {(this.props.tableType === "users") &&
                                <AdminUserModal role={this.props.role} dataObject={object} useContext={this.useContext}
                                                dispatch={this.props.dispatch}/>
                                }
                                {(this.props.tableType === "groups") &&
                                <AdminGroupModal dispatch={this.props.dispatch} dataObject={object}/>
                                }
                                {(this.props.tableType === "todos") &&
                                <AdminTodoModal dispatch={this.props.dispatch} dataObject={object}/>
                                }
                                {
                                    object.deleting ? <em> - Deleting...</em>
                                        : object.deleteError ?
                                        <span className="text-danger"> - ERROR: {object.deleteError}</span>
                                        :
                                        <Button color="danger" onClick={this.handleDelete(object.uuid)}>Delete</Button>
                                }
                            </div>
                            {(this.useContext === "member") &&
                                <div>
                                    {(this.props.tableType === "users") &&
                                    <AdminUserModal role={this.props.role} dataObject={object} useContext={this.useContext}
                                                    dispatch={this.props.dispatch}/>
                                    }
                                </div>
                            }
                        </li>
                    )}
                </ul>
                }
                {(this.props.tableType === "users" && this.useContext === "admin") &&
                <AdminUserModal role={ this.props.role } dataObject={ null } useContext={ this.useContext } dispatch={ this.props.dispatch } />
                }
                {(this.props.tableType === "groups") &&
                <AdminGroupModal dispatch={ this.props.dispatch } dataObject={ null } />
                }
                {(this.props.tableType === "todos") &&
                <AdminTodoModal dispatch={ this.props.dispatch } dataObject={ null } />
                }
                </CardBody>
                </Card>
                </Collapse>
            </div>
        );
    }
}
