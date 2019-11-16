/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/01/2019
*/

import React from 'react';
import {Button, Card, CardBody, Collapse} from 'reactstrap';
import {groupActions, todoActions} from '../../actions';
import {userActions} from '../../actions/user.actions'
import {AdminUserModal} from '../modal_components/AdminUserModal';
import {AdminGroupModal} from '../modal_components/AdminGroupModal';
import {AdminTodoModal} from '../modal_components/AdminTodoModal';


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
            return (e) => this.props.dispatch(userActions._delete(id));
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
        const { tableType } = this.props;
        let objectName = "name";

        if (tableType === "users") {
            objectName = "username";
        }
        return (

            <div>
                <h3>{ tableType } Manager:</h3>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Show { tableType }</Button>
                {this.props.objects.loading && <em>Loading { tableType } ...</em>}
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
                                {(tableType === "users") &&
                                <AdminUserModal role={this.props.role} dataObject={object} useContext={this.useContext}
                                                dispatch={this.props.dispatch}/>
                                }
                                {(tableType === "groups") &&
                                <AdminGroupModal dispatch={this.props.dispatch} dataObject={object}/>
                                }
                                {(tableType === "todos") &&
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
                                    {(tableType === "users") &&
                                    <AdminUserModal role={this.props.role} dataObject={object} useContext={this.useContext}
                                                    dispatch={this.props.dispatch}/>
                                    }
                                </div>
                            }
                        </li>
                    )}
                </ul>
                }
                {(tableType === "users" && this.useContext === "admin") &&
                <AdminUserModal role={ this.props.role } dataObject={ null } useContext={ this.useContext } dispatch={ this.props.dispatch } />
                }
                {(tableType === "groups") &&
                <AdminGroupModal dispatch={ this.props.dispatch } dataObject={ null } />
                }
                {(tableType === "todos") &&
                <AdminTodoModal dispatch={ this.props.dispatch } dataObject={ null } />
                }
                </CardBody>
                </Card>
                </Collapse>
            </div>
        );
    }
}
