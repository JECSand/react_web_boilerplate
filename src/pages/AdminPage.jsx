/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/05/2019
*/

import React from 'react';
import { connect } from 'react-redux';
import { userActions, groupActions, todoActions } from '../actions';
import { AdminTable } from '../components';


// Define & Render the App's AdminPage Component
class AdminPage extends React.Component {

    // Get a list of all users from backend once the component mounts via a dispatch action
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(todoActions.getAll());
        if (this.props.user.role === "master_admin") {
            this.props.dispatch(groupActions.getAll());
        }
    }

    // Render AdminPage Component
    render() {
        return (
            <div>
                <h1>Admin Management Panel</h1>
                <div className="row">
                    <AdminTable objects={ this.props.users } tableType={ "users" } role={ this.props.user.role } dispatch={ this.props.dispatch } />
                </div>
                    {(this.props.user.role === "master_admin") &&
                    <div className="row">
                    <AdminTable objects={ this.props.groups } tableType={ "groups" } dispatch={ this.props.dispatch } />
                    </div>
                    }
                <div className="row">
                    <AdminTable objects={ this.props.todos } tableType={ "todos" } dispatch={ this.props.dispatch } />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, groups, todos, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users,
        groups,
        todos
    };
}

const connectedAdminPage = connect(mapStateToProps)(AdminPage);
export { connectedAdminPage as AdminPage };