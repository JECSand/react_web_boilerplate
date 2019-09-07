/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/05/2019
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';


// Define & Render the App's HomePage Component
class HomePage extends React.Component {

    // Get a list of all users from backend once the component mounts via a dispatch action
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    // Handler that dispatches a user delete action to the backend
    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    // Render HomePage Component
    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.username}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.uuid}>
                            {user.uuid + ' - ' + user.username}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.uuid)}>Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };