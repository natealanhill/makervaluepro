import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';

type AcceptedProps = {
    updateToken: (newToken: string) => void;
}

interface RegisterState {
    fname: string,
    lname: string,
    username: string,
    password: string,

}

export default class Register extends Component<AcceptedProps, RegisterState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            username: "",
            password: "",
        }
    }

    handleSubmit = (e: any) => {
        if (this.state.username !== "" && this.state.password !== "") {
        e.preventDefault()
        fetch(`http://localhost:3030/register`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    fname: this.state.fname,
                    lname: this.state.lname,
                    username: this.state.username,
                    password: this.state.password
                },

            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken);

        })
    }

    };
    handlefnameChange = (event: any) => {
        const fname = event.target.value;
        this.setState({ fname: fname })
    };
    handlelnameChange = (event: any) => {
        const lname = event.target.value;
        this.setState({ lname: lname })
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
                <h1>Hello new user!</h1>
                <h3>Let's get started</h3>


                <ValidatorForm
                    style={{
                        marginLeft: '100px',
                        marginRight: 'auto',
                        width: '30%',
                        display: 'block',
                        backgroundColor: '#FFFFFF',
                    }}
                    ref='form'
                    onSubmit={this.handleSubmit}
                    onError={(errors) => console.log(errors)}
                >
                    <TextValidator
                        label='First Name'
                        onChange={(e) => this.handlefnameChange(e)}
                        name='fname'
                        value={this.state.fname}
                        validators={['required']}
                        errorMessages={[
                            'If you do not want to share your first name share your MAKER NAME',
                            'You know you have one!'
                        ]}
                        autoComplete='off'
                    >
                    </TextValidator>
                    <TextValidator
                        label='Last Name'
                        onChange={this.handlelnameChange}
                        name='Last name'
                        value={this.state.lname}
                        type='string'
                        validators={[]}
                        errorMessages={[]}>
                    </TextValidator>
                    <TextValidator
                        label='Username'
                        onChange={this.handleUserChange}
                        name='username'
                        value={this.state.username}
                        type='string'
                        validators={['required']}
                        errorMessages={[
                            'username not available',
                            'this field is required'
                        ]}
     
                    >
                    </TextValidator>
                    <TextValidator
                        label='Password'
                        onChange={this.handlePasswordChange}
                        name='password'
                        value={this.state.password}
                        type='string'
                        validators={['minStringLength:6', 'required']}
                        errorMessages={[
                            // 'password should be more than 5 letters',
                            'this field is required',
                        ]}>
                    </TextValidator>
                    <br />
                    <Button
                    style={{
                        color: 'white',
                        marginLeft: '20px',
                        marginRight: 'auto',
                        width: '40%',
                        display: 'block',
                        backgroundColor: 'gray',
                      }}>
                        {/* color="primary"
                        variant="contained"
                        type="submit" */}
                    Submit
                    </Button>
                </ValidatorForm>
                {console.log(this.state.fname)}
            </div>

        )

    }
}

