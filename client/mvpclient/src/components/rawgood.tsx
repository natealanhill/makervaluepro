import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';

type AcceptedProps = {
    sessionToken: string,
    // Need to know that this is the correct way to bring the token into this class component
}

interface RawGoodState {
    rgName: string,
    rgUOM: string,
    rgQty: number,
    rgCost: number,
    rgVendor: string,

}

export default class RawGood extends Component<AcceptedProps, RawGoodState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            rgName: "",
            rgUOM: "",
            rgQty: 0,
            rgCost: 0,
            rgVendor: "",
        }
    }
    handleSubmit = (e: any) => {
        e.preventDefault()
        fetch('http://localhost:3000/rawGood/rawGood', {
            method: 'POST',
            body: JSON.stringify({
                rawGood: {
                    rgName: this.state.rgName,
                    rgUOM: this.state.rgUOM,
                    rgQty: this.state.rgQty,
                    rgCost: this.state.rgCost,
                    rgVendor: this.state.rgVendor
                },
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })

        }).then(
            (response) => response.json()
        ).then((data) => {
            // this.props.sessionToken(data.sessionToken);
        })
    };

    handlergNameChange = (event: any) => {
        const rgName = event.target.value;
        this.setState({ rgName: rgName })
    };
    handlergUOMChange = (event: any) => {
        const rgUOM = event.target.value;
        this.setState({ rgUOM: rgUOM })
    };
    handlergQtyChange = (event: any) => {
        const rgQty = event.target.value;
        this.setState({ rgQty: rgQty })
    };
    handlergCostChange = (event: any) => {
        const rgCost = event.target.value;
        this.setState({ rgCost: rgCost })
    };
    handlergVendorChange = (event: any) => {
        const rgVendor = event.target.value;
        this.setState({ rgVendor: rgVendor })
    };


    //Render from Register.tsx needs to be updated for raw goods
    render() {
        return (
            <div>
                <h2>Raw Material Tracking</h2>

                <ValidatorForm
                    style={{
                        marginLeft: 'auto',
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
                        label='Raw Material Name'
                        
                        onChange={(e) => this.handlergNameChange(e)}
                        name='rgName'
                        value={this.state.rgName}
                        validators={['required']}
                        errorMessages={[
                            'Required, names should be unique but easily remembered',

                        ]}
                        autoComplete='off'
                    >
                    </TextValidator>
                    <TextValidator
                        label='Unit of Measure'
                        onChange={this.handlergUOMChange}
                        name='Unit of Measure'
                        value={this.state.rgUOM}
                        type='string'
                        validators={[]}
                        errorMessages={[]}>
                    </TextValidator>
                    <TextValidator
                        label='Quantity'
                        onChange={this.handlergQtyChange}
                        name='Quantity'
                        value={this.state.rgQty}
                        type='number'
                        validators={['required']}
                        errorMessages={[
                            'username not available',
                            'this field is required'
                        ]}
                    // autoComplete='off'
                    >
                    </TextValidator>
                    <TextValidator
                        label='Cost per Unit'
                        onChange={this.handlergCostChange}
                        name='Cost'
                        value={this.state.rgCost}
                        type='number'
                        validators={['required']}
                        errorMessages={[
                            // 'password should be more than 5 letters',
                            'this field is required',
                        ]}>
                    </TextValidator>
                    <TextValidator
                        label='Vendor'
                        onChange={this.handlergVendorChange}
                        name='Cost'
                        value={this.state.rgVendor}
                        type='string'
                        validators={['required']}
                        errorMessages={[
                            // 'password should be more than 5 letters',
                            'this field is required',
                        ]}>
                    </TextValidator>
                    <br />
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                    >Submit
                </Button>
                </ValidatorForm>
                {console.log(this.state.rgName)}
            </div>

        );

    }
}