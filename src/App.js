/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/06/2019
*/

import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './helpers/history';
import { alertClear } from './actions/alert.actions';
import { PrivateRoute, NavBar } from './components';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminPage } from './pages/AdminPage';
import { TodosPage } from './pages/TodosPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { GroupProfilePage } from './pages/GroupProfilePage';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertClear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
        <div className="jumbotron">
          <div className="container">
            <NavBar path={ window.location.pathname } />
            <div className="col-sm-8 col-sm-offset-2">
              {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <Router history={history}>
                <div>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  <PrivateRoute exact path="/admin" component={AdminPage} />
                  <PrivateRoute exact path="/todos" component={TodosPage} />
                  <PrivateRoute exact path="/user" component={UserProfilePage} />
                  <PrivateRoute exact path="/group" component={GroupProfilePage} />
                </div>
              </Router>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = ({alert}) => {
  return {
    alert
  };
}

const mapDispatchToProps = () => {

}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };