import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Login/LoginScreen';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// import EmployeeListPage from './Login/EmployeeListPage'
import { createBrowserHistory } from 'history';
import Routes from './_components/Routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const NotFoundRedirect = () => <Redirect to='/loginscreen' />
    const history = createBrowserHistory();
    const localUser = localStorage.getItem('user');

    if (localUser !== undefined && localUser === null) {
      return (
        <div className="App">
          <header className="App-header">
              <BrowserRouter>
                <Switch>
                  <Route exact path='/loginscreen' {...history} component={LoginScreen} />
                  <Route component={NotFoundRedirect} />
                </Switch>
              </BrowserRouter>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <Routes />
          </header>
        </div>
      );
    }
  }
}

export default (App);
