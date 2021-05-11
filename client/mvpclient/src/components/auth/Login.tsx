import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';

type AcceptedProps = {
  updateToken: (newToken: string) => void;
}

interface LoginState {
  username: string,
  password: string,

}

export default class Login extends Component<AcceptedProps, LoginState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
  }

  handleSubmit = (e: any) => {
    if (this.state.username !== "" && this.state.password !== "") {
      // e.preventDefault()
      fetch(`http://localhost:3030/user/login`, {
        method: 'POST',
        body: JSON.stringify({
          user: {
            username: this.state.username,
            password: this.state.password
          }
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(
        (response) => {
          if (response.status !== 200) {
            throw new Error('Unable to login');
          } else return response.json();
        }).then((data) => {
          this.props.updateToken(data.sessionToken);

        })
        .catch((err) => alert(err));

    }
  };

  handleUserChange = (event: any) => {
    const username = event.target.value;
    this.setState({ username: username })
  };
  handlePasswordChange = (event: any) => {
    const password = event.target.value;
    this.setState({ password: password })
  };



  render() {
    return (
      <div>
    

        <ValidatorForm
          style={{
            color: "white",
            marginLeft: '100px',
            marginRight: 'auto',
            width: '60%',
            display: 'block',
            backgroundColor: '#FFFFFF',
          }}
          ref='form'
          onSubmit={this.handleSubmit}
          onError={(errors) => console.log(errors)}
        >
          <TextValidator
                    // style={{
                    //   marginLeft: '100px',
                    //   marginRight: 'auto',
                    //   width: '60%',
                    //   display: 'block',
                    //   backgroundColor: '#FFFFFF',
                    // }}
            label='Username'
            onChange={(e) => this.handleUserChange(e)}
            name='username'
            value={this.state.username}
            validators={['required']}
            errorMessages={[
              'this field is required'
            ]}
            autoComplete='off'
          >
          </TextValidator>
          <TextValidator
            label='Password'
            onChange={this.handlePasswordChange}
            name='password'
            value={this.state.password}
            type='string'
            validators={['required']}
            errorMessages={[
              // 'password should be more than 5 letters',
              'this field is required',
            ]}>
          </TextValidator>
          <br />
          <Button variant='contained' onClick={this.handleSubmit}
          style={{
            color: 'white',
            marginLeft: '20px',
            marginRight: 'auto',
            width: '20%',
            display: 'block',
            backgroundColor: 'gray',
          }}>
            Login
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}
