/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/01/2019
*/

import React from 'react';
import { userActions, groupActions, todoActions } from '../../actions';
import { AdminUserModal } from '../modal_components/AdminUserModal';
import { AdminGroupModal } from '../modal_components/AdminGroupModal';
import { AdminTodoModal } from '../modal_components/AdminTodoModal';


export class AdminTable extends React.Component {

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

    render() {
        let objectName = "name";
        if (this.props.tableType === "users") {
            objectName = "username";
        }
        return (
            <div>
                <h3>{ this.props.tableType } Manager:</h3>
                {this.props.objects.loading && <em>Loading { this.props.tableType } ...</em>}
                {this.props.objects.error && <span className="text-danger">ERROR: {this.props.objects.error}</span>}
                {this.props.objects.items &&
                <ul>
                    {this.props.objects.items.map((object, index) =>
                        <li key={object.uuid}>
                            {object.uuid + ' - ' + object[objectName]}
                            {
                                object.deleting ? <em> - Deleting...</em>
                                    : object.deleteError ? <span className="text-danger"> - ERROR: {object.deleteError}</span>
                                    : <span> - <a onClick={this.handleDelete(object.uuid)}>Delete</a></span>
                            }
                            {(this.props.tableType === "users") &&
                            <AdminUserModal role={ this.props.role } object={ object } dispatch={ this.props.dispatch } />
                            }
                            {(this.props.tableType === "groups") &&
                            <AdminGroupModal dispatch={ this.props.dispatch  } object={ object } />
                            }
                            {(this.props.tableType === "todos") &&
                            <AdminTodoModal dispatch={ this.props.dispatch } object={ object } />
                            }
                        </li>
                    )}
                </ul>
                }
                {(this.props.tableType === "users") &&
                <AdminUserModal role={ this.props.role } object={ null } dispatch={ this.props.dispatch } />
                }
                {(this.props.tableType === "groups") &&
                <AdminGroupModal dispatch={ this.props.dispatch } object={ null } />
                }
                {(this.props.tableType === "todos") &&
                <AdminTodoModal dispatch={ this.props.dispatch } object={ null } />
                }
            </div>
        );
    }
}
