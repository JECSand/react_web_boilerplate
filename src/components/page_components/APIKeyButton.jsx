/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/04/2019
*/

// Define & Render the App's HomePage Component
import React from 'react';
import { connect } from 'react-redux';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { userActions } from "../../actions";


class APIKeyButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {popoverOpen: false, textVal: 'Generate API Key', loadingMsg: 'loading...', btnColor: 'primary'};
        this.toggle = this.toggle.bind(this);
        this.handleAPIKey = this.handleAPIKey.bind(this);
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
        if (!this.state.popoverOpen) {
            this.setState({textVal: 'Generate API Key', btnColor: 'primary'});
        } else {
            this.setState({textVal: 'Close', btnColor: 'danger'});
        }
    }

    handleAPIKey() {
        if (!this.state.popoverOpen) {
            return this.props.dispatch(userActions.generateAPIKey());
        }
    }

    render() {
        return (
        <div>
            <Button id="APIKeyPop" color={ this.state.btnColor } onClick={this.handleAPIKey}>{ this.state.textVal }</Button>
            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="APIKeyPop" toggle={this.toggle}>
                <PopoverHeader>API Key</PopoverHeader>
                {(!this.props.apiKey) &&<PopoverBody>{this.state.loadingMsg}</PopoverBody>}
                {(this.props.apiKey) &&<PopoverBody>{this.props.apiKey}</PopoverBody>}
            </Popover>
        </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user, apiKey } = authentication;
    return {
        user,
        apiKey
    };
}

const connectedAPIKeyButton = connect(mapStateToProps)(APIKeyButton);
export { connectedAPIKeyButton as APIKeyButton };