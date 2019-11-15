/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/04/2019
*/

import React from 'react';
import { connect } from 'react-redux';
import { AdminUserModal } from '../components/modal_components/AdminUserModal';
import { UpdatePasswordModal } from '../components/modal_components/UpdatePasswordModal';
import { APIKeyButton } from '../components/page_components/APIKeyButton';


// Define & Render the App's HomePage Component
class UserProfilePage extends React.Component {

    // Render UserProfilePage Component
    render() {
        const { user } = this.props;
        return (
            <div>
                <h1>User Profile</h1>
                <div className="col-md-6 col-md-offset-3">
                    <h1>Hello, {user.firstname}!</h1>
                    <p>You can manage your account settings below: </p>
                </div>
                <div className={"row align-items-center"}>
                    <div className={"col"}>
                        <AdminUserModal role={ user.role } dataObject={ user } useContext={ 'profile' } dispatch={ this.props.dispatch } />
                    </div>
                    <div className={"col"}>
                        <UpdatePasswordModal dispatch={ this.props.dispatch } />
                    </div>
                    <div className={"col"}>
                        <APIKeyButton dispatch={ this.props.dispatch } />
                    </div>
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

const connectedUserProfilePage = connect(mapStateToProps)(UserProfilePage);
export { connectedUserProfilePage as UserProfilePage };