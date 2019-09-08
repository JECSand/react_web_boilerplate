/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/05/2019
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


// Define & Render the App's HomePage Component
class HomePage extends React.Component {

    // Render HomePage Component
    render() {
        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.username}!</h1>
                <p>You're logged in with React!!</p>

                <p>
                    <Link to="/login">Logout</Link>
                </p>
                {(user.role === "master_admin" || user.role === "group_admin") &&
                  <p>
                      <Link to="/admin">Admin Page</Link>
                  </p>
                }
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