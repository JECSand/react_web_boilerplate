/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/05/2019
*/

import React from 'react';
import { connect } from 'react-redux';
import { todoActions } from '../actions';
import { AdminTable } from '../components';


// Define & Render the App's TodoPage Component
class TodosPage extends React.Component {

    // Get a list of all users from backend once the component mounts via a dispatch action
    componentDidMount() {
        this.props.dispatch(todoActions.getAll());
    }

    // Render AdminPage Component
    render() {
        return (
            <div>
                <h1>Your To-dos</h1>
                <div className="row">
                    <AdminTable objects={ this.props.todos } tableType={ "todos" } dispatch={ this.props.dispatch } />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { todos, authentication } = state;
    const { user } = authentication;
    return {
        user,
        todos
    };
}

const connectedTodosPage = connect(mapStateToProps)(TodosPage);
export { connectedTodosPage as TodosPage };