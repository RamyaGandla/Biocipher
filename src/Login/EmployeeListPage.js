import React, { Component } from 'react';
import * as reactbootstrap from 'react-bootstrap';
import { Constants } from '../_components/Constants';
import CreateUser from '../Users/CreateUser';

class EmployeeListPage extends Component {
    constructor(props) {
        super(props)
        console.log(localStorage.getItem('newUser'));
        this.state = {
          employeeData: Constants.EMPLOYEEDATA,
          dashboardType: (localStorage.getItem('adminornot') == 1) ? 'Admin dashboard' : 'User dashboard',
          showCreateUser: 0,
        }

        this.logOut = this.logOut.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    createUser() {
      this.setState({
        showCreateUser: 1,
      })
      window.location.href = '/createUser';
    }

    logOut() {
      localStorage.clear();
      window.location.href = '/loginScreen';
    }

    render() {
      const { employeeData } = this.state;
      let users = employeeData.user;

      return (
        <div className="">
        {localStorage.getItem('adminornot') == 1 &&
          <div>
            <reactbootstrap.Button style={{ float: 'right',backgroundColor: '#EC661C',borderColor: "black", marginBottom: '25px', marginTop: '25px'}} type="button" onClick={e => this.createUser()}>
                  {'Create User'}
            </reactbootstrap.Button>
          </div>
        }
        <reactbootstrap.Container className="pt-5 px-0">
          <div style={{ color: '#EC661C', fontSize: '20px'}} >
              <span><h4>{this.state.dashboardType}</h4></span>
          </div>
          <reactbootstrap.Form style={{ width: '600px', height: '200px'}}>
            <reactbootstrap.Table style={{ display: 'block', border: '2px solid lightgray'}}>
              <thead style={{ backgroundColor: '#EC661C', color: 'white', position: 'sticky', top: '0', textAlign: 'center' }}>
                  <tr style={{ textAlign: 'center', border: '2px solid black' }}>
                    <th>{'Name'}</th>
                    <th>{'Age'}</th>
                    <th>{'Gender'}</th>
                    <th>{'Email'}</th>
                    <th>{'Phone number'}</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'gray', color: 'white', position: 'sticky', top: '0', textAlign: 'center' }}>
                  {users.length > 0 &&
                    <>
                      {users.map((item) => (
                        <tr style={{ textAlign: 'center', border: '2px solid black' }}>
                           <td>{item.name}</td>
                           <td>{item.age}</td>
                           <td>{item.gender}</td>
                           <td>{item.email}</td>
                           <td>{item.phoneNo}</td>
                        </tr>
                      ))}
                    </>
                  }
                </tbody>
            </reactbootstrap.Table>
            {this.state.showCreateUser == 1 &&
              <CreateUser />
            }
            <div>
              <reactbootstrap.Button style={{ float: 'right',backgroundColor: '#EC661C',borderColor: "black", marginBottom: '25px', marginTop: '25px', width: '80px' }} type="button" onClick={e => this.logOut()}>
                    {'LogOut'}
              </reactbootstrap.Button>
            </div>
          </reactbootstrap.Form>
        </reactbootstrap.Container>
      </div>
      );
    }
}

export default (EmployeeListPage);
