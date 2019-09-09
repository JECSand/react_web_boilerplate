/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/05/2019
*/

import React from 'react';
import { connect } from 'react-redux';


// Define & Render the App's HomePage Component
class HomePage extends React.Component {

    // Render HomePage Component
    render() {
        const { user } = this.props;
        return (
            <div>
                <h1>Home</h1>
                <div className="col-md-6 col-md-offset-3">
                    <h1>Welcome Back, {user.firstname}!</h1>
                    <p>You're logged in with React!!</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };