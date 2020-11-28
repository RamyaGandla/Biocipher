import React, { Component } from 'react';
import * as reactbootstrap from 'react-bootstrap';
import { Constants } from '../_components/Constants';
import * as emailjs from "emailjs-com";

class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            role: 0,
            roles: Constants.Roles,
            emailError: '',
            nameError: '',
            passwordError: '',
            feedback: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            emailError: '',
            nameError: '',
            passwordError: '',
         });
    }

    handleSubmit() {
      let userEmailValidation = (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email)) ? true : false;
        if (this.state.name !== '' && this.state.email !== '' && this.state.password !== '' && userEmailValidation) {
          let allEmployees = [];
          let count = 0;
          Object.values(Constants.EMPLOYEEDATA.user).map(user => {
            allEmployees.push(user);
            count++
          })
          let details = {
            "id": count,
            "name": this.state.name,
            "email" : this.state.email,
            'roleId': 0,
          }
          allEmployees.push(details);
          localStorage.setItem('allUsers', allEmployees);

          const templateId = 'template_id';
          this.sendFeedback(templateId, {message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email})
          window.location.href = '/manageEmployees';
        } else {
          this.setState({
            emailError : this.state.email !== '' ? (userEmailValidation ? '' : 'Not a valid email') : 'Email field is required',
            nameError: this.state.name !== '' ? '' : 'Email field is required',
            passwordError: this.state.password !== '' ? '' : 'Email field is required',
          })
        }

    }

    sendFeedback (templateId, variables) {
    	emailjs.send(
    	'gmail', templateId,
    	variables
    	).then(res => {
      	console.log('Email successfully sent!')
    	})
    	// Handle errors here however you like, or use a React error boundary
    	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }

    render() {
      const { name, email, password, roles, role, nameError, emailError, passwordError } = this.state;
      return (
        <div className="" >
          <reactbootstrap.Container className="pt-5 px-0">
            <div style={{ color: '#EC661C', fontSize: '20px'}} >
                <span><h4>{'Create user'}</h4></span>
            </div>
            <reactbootstrap.Form>
              <reactbootstrap.FormGroup>
                <div style={{ marginbottom: '15px',border: '0px' }}>
                  <label style={{ color: '#EC661C', fontSize: '14px' }}>{'User name'}<span style={{ color: 'red' }}> * </span></label>
                  <input
                    name="name"
                    value={name}
                    type="text"
                    style={{ marginBottom: '15px', width: '250px', borderColor: "black", borderWidth: '3px'}}
                    id="exampleInputEmail1"
                    placeholder={"User name"}
                    onChange={this.handleChange}
                    autoComplete="off" />
                </div>
              </reactbootstrap.FormGroup>
              <div style={{ color: 'red', fontSize: '15px' }}>{nameError}</div>
              <reactbootstrap.FormGroup>
                <div style={{ marginbottom: '15px',border: '0px' }}>
                  <label style={{ color: '#EC661C', fontSize: '14px' }}>{'User email'}<span style={{ color: 'red' }}> * </span></label>
                  <input
                    name="email"
                    value={email}
                    type="email"
                    style={{ marginBottom: '15px', width: '250px', borderColor: "black", borderWidth: '3px'}}
                    id="exampleInputEmail1"
                    placeholder={"Email"}
                    onChange={this.handleChange}
                    autoComplete="off" />
                </div>
              </reactbootstrap.FormGroup>
              <div style={{ color: 'red', fontSize: '15px' }}>{emailError}</div>
              <reactbootstrap.FormGroup>
                <div style={{ marginbottom: '15px',border: '0px' }}>
                    <label style={{ color: '#EC661C', fontSize: '14px' }}>{'Password'}<span style={{ color: 'red' }}> * </span></label>
                    <input
                      name="password"
                      value={password}
                      type="password"
                      style={{ marginBottom: '15px', width: '250px', borderColor: "black", borderWidth: '3px'}}
                      id="exampleInputEmail1"
                      placeholder={"Password"}
                      onChange={this.handleChange}
                      autoComplete="off" />
                </div>
              </reactbootstrap.FormGroup>
              <div style={{ color: 'red', fontSize: '15px' }}>{passwordError}</div>
              <reactbootstrap.FormGroup>
                <div style={{ marginbottom: "15px", border: "0px" }}>
                  <label style={{ color: "#EC661C", fontSize: "14px" }}>
                    {"Role"}
                    <span style={{ color: "red" }}> * </span>
                  </label>
                  <reactbootstrap.FormControl
                    as="select"
                    name="type"
                    className="input_sw"
                    value={role}
                    onChange={this.handleChange}
                  >
                    {/* <option>Select role</option> */}
                    {Object.values(roles).map((role) => (
                      <option value={role.id}>{role.name}</option>
                    ))}
                  </reactbootstrap.FormControl>
                </div>
              </reactbootstrap.FormGroup>
              <div>
                <reactbootstrap.Button style={{ float: 'right',backgroundColor: '#EC661C',borderColor: "black", marginBottom: '25px', marginTop: '25px', width: '80px' }} type="button" onClick={e => this.handleSubmit()}>
                      {'save'}
                </reactbootstrap.Button>
              </div>
              </reactbootstrap.Form>
            </reactbootstrap.Container>
          </div>
      )
    }
}

export default (CreateUser);
