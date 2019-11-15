/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/04/2019
*/

import React from 'react';
import { connect } from 'react-redux';
import { userActions } from "../actions";

// Define & Render the App's GroupProfilePage Component
class GroupProfilePage extends React.Component {

    // Get a list of all users from backend once the component mounts via a dispatch action
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    // Render AdminPage Component
    render() {
        return (
            <div>
                <h1>Group Profile</h1>
                <div className="row">
                    <p>Users Detail list Will go Here</p>
                </div>
            </div>
        );
    }


}

function mapStateToProps(state) {
    const { authentication, users } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedGroupProfilePage = connect(mapStateToProps)(GroupProfilePage);
export { connectedGroupProfilePage as GroupProfilePage };