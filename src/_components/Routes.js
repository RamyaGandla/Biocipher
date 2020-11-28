import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import EmployeeListPage from '../Login/EmployeeListPage';
import CreateUser from '../Users/CreateUser';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const NotFoundRedirect = () => <Redirect to='/manageEmployees' />

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/manageEmployees' component={EmployeeListPage} />
          <Route exact path='/createUser' component={CreateUser} />
          <Route component={NotFoundRedirect} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes
