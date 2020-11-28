import React, { Component } from 'react';
import * as reactbootstrap from 'react-bootstrap';
import { Constants } from '../_components/Constants';

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            emailRequired: false,
            passwordRequired: false,
            loginData: Constants.USERCREDENTIALS,
            UserExist: true,
            UserError: '',
            validEmail: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            emailRequired: false,
            passwordRequired: false,
            validEmail: true,
         });
    }

    handleSubmit(event) {
      const { userName, password, loginData } = this.state
      let userEmailValidation = (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(userName)) ? true : false;

      if (userName !== '' && password !== '') {
        if (userEmailValidation) {
          const result = Object.values(loginData).filter(usersData => (usersData.email === userName && usersData.password === password));
          if (result.length > 0) {
            localStorage.setItem('user', 1);
            if (result[0]['roleId'] === 1) {
              localStorage.setItem('adminornot', 1);
            } else {
              localStorage.setItem('adminornot', 0);
            }
            localStorage.setItem('allUsers', Constants.EMPLOYEEDATA);
            window.location.href = '/manageEmployees';
          } else {
            this.setState({
              UserExist: false,
              UserError: 'UserName or password is wrong',
            })
          }
        } else {
          this.setState({
            validEmail: userEmailValidation,
          })
        }
      } else {
        this.setState({
          emailRequired: userName === '' ? true : false,
          passwordRequired: password === '' ? true : false,
        })
      }
    }

    handleKeyPress = event => {
      if (event.key === 'Enter') {
        this.handleSubmit(event);
      }
    }

    render() {
      const { userName, password, passwordRequired, emailRequired, UserExist, UserError, validEmail } = this.state;
      return (
        <div className="" onKeyPress={e => this.handleKeyPress(e)}>
          <reactbootstrap.Container className="pt-5 px-0">
            <div style={{ color: '#EC661C', fontSize: '20px'}} >
                <span><h4>{'Login screen'}</h4></span>
            </div>
            <reactbootstrap.Form>
               <reactbootstrap.FormGroup>
                 <div style={{ marginbottom: '15px',border: '0px' }}>
                   <label style={{ color: '#EC661C', fontSize: '14px' }}>{'Username'}<span style={{ color: 'red' }}> * </span></label>
                   <input
                     name="userName"
                     value={userName}
                     type="email"
                     style={{ marginBottom: '15px', width: '250px', borderColor: "black", borderWidth: '3px'}}
                     id="exampleInputEmail1"
                     placeholder={"userName"}
                     onChange={this.handleChange}
                     autoComplete="off" />
                 </div>
                 {emailRequired === true &&
                   <div style={{ color: 'red', fontSize: '15px' }}>{"userName field is required"}</div>
                 }
                 {validEmail === false &&
                   <div style={{ color: 'red', fontSize: '15px' }}>{"Please enter a proper Email-id"}</div>
                 }
               </reactbootstrap.FormGroup>
              <reactbootstrap.FormGroup>
                <div style={{ marginbottom: '15px',border: '0px' }}>
                  <label style={{ color: '#EC661C', fontSize: '14px' }}>{'Password'}<span style={{ color: 'red' }}> * </span></label>
                  <input
                    name="password"
                    value={password}
                    type="password"
                    style={{ marginBottom: '15px', width: '250px', borderColor: "black", borderWidth: '3px' }}
                    id="exampleInputPassword1"
                    placeholder={"Password"}
                    onChange={this.handleChange}
                    autoComplete="off" />
                </div>
                {passwordRequired === true &&
                  <div style={{ color: 'red', fontSize: '15px' }}>{"Password field is required"}</div>
                }
              </reactbootstrap.FormGroup>
              <div>
                <reactbootstrap.Button style={{ float: 'right',backgroundColor: '#EC661C',borderColor: "black"}} type="button" onClick={e => this.handleSubmit(e)}>
                    {'Login'}
                </reactbootstrap.Button>
                {UserExist === false &&
                  <div style={{ color: 'red', fontSize: '15px' }}>{UserError}</div>
                }
              </div>
            </reactbootstrap.Form>
          </reactbootstrap.Container>
        </div>
      );
    }
}

export default (LoginScreen);
