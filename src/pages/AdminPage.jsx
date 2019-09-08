/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/05/2019
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions, groupActions } from '../actions';
import { AdminTable } from '../components';


// Define & Render the App's AdminPage Component
class AdminPage extends React.Component {

    // Get a list of all users from backend once the component mounts via a dispatch action
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        if (this.props.user.role === "master_admin") {
            this.props.dispatch(groupActions.getAll());
        }
    }

    // Render AdminPage Component
    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi { this.props.user.username }!</h1>
                <p>You're logged in with React!!</p>
                <AdminTable objects={ this.props.users } tableType={ "users" } dispatch={ this.props.dispatch } />
                {(this.props.user.role === "master_admin") &&
                  <AdminTable objects={ this.props.groups } tableType={ "groups" } dispatch={ this.props.dispatch } />
                }
                <p>
                    <Link to="/">Home Page</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, groups, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users,
        groups
    };
}

const connectedAdminPage = connect(mapStateToProps)(AdminPage);
export { connectedAdminPage as AdminPage };