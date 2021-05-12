import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import RawGood from './rawgood';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

type AcceptedProps = {
    sessionToken: string,
}

interface BOMState {
    BOMname: string,
    BOMrawGood: [] | any,
    BOMtime: number | any,
    rgUnits: number | any,
    selectedId: number 

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);


export default class BOM extends Component<AcceptedProps, BOMState> {
    // const classes = useStyles();
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            BOMname: "",
            BOMrawGood: [],
            BOMtime: 0,
            rgUnits: 0.0,
            selectedId: 0, 
        }
    }

    componentDidMount() {
        this.getAllRawGoods()
    };
    componentDidUpdate(prev: AcceptedProps) {
        if (prev.sessionToken !== this.props.sessionToken) {
            this.getAllRawGoods()
        }
    }


    getAllRawGoods = () => {
        if (this.props.sessionToken) {
            fetch("http://localhost:3030/rawGood/all", {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: this.props.sessionToken,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({ BOMrawGood: data })
                    console.log(data)
                })
                .catch((err) => console.log(err));
            console.log(this.state.BOMrawGood)
        }
    };

    handleSubmit = (e: any) => {
        console.log("Handeling submit")
        e.preventDefault()
        fetch('http://localhost:3030/BOM/BOM', {
            method: 'POST',
            body: JSON.stringify({
             
                    BOMname: this.state.BOMname,
                    BOMrawGood: this.state.BOMrawGood,
                    BOMtime: this.state.BOMtime,
                    rgUnits: this.state.rgUnits

            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                "Authorization": this.props.sessionToken
            })

        }).then(
            (response) => response.json()
        ).then((data) => {
            // this.props.sessionToken(data.sessionToken);
        })
    };

    handleBOMnameChange = (event: any) => {
        const BOMname = event.target.value;
        this.setState({ BOMname: BOMname })
    };
    handleBOMrawGoodChange = (event: any) => {
        const BOMrawGood = event.target.value;
        this.setState({ selectedId: BOMrawGood })
    };
    handleBOMtimeChange = (event: any) => {
        const BOMtime = event.target.value;
        this.setState({ BOMtime: BOMtime })
    };
    handlergUnitsChange = (event: any) => {
        const rgUnits = event.target.value;
        this.setState({ rgUnits: rgUnits })
    };


    render() {
        return (
            <div>
                <h2>Bill of Materials Entry</h2>

                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField id="standard-basic" label="BOM NAME"
                        onChange={(e) => this.setState({ BOMname: e.target.value })}
                        value={this.state.BOMname}
                        name="BOMname"
                    />
                    <TextField id="standard-basic" label="TIME"
                        onChange={(e) => this.setState({ BOMtime: e.target.value })}
                        value={this.state.BOMtime}
                        name="BOMtime"
                    />
                    <TextField id="standard-basic" label="Amount to Use"
                        onChange={(e) => this.setState({ rgUnits: e.target.value })}
                        value={this.state.rgUnits}
                        name="rgUnits"
                    />

                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Raw Good</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.BOMrawGood}
                            // onChange={(e) => this.setState({ selectedId: e.target.value })}
                            // onChange={this.handleBOMrawGoodChange}
                            >
                            {this.state.BOMrawGood.map((rawg: any) => (
                                <MenuItem value={rawg.id}>
                                    {rawg.rgName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                >Submit
                </Button>
                </form>













                {/* <ValidatorForm
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
                        label='Bill of Materials Name'

                        // onChange={(e) => this.handleBOMnameChange(e)}

                        // onChange={(e) => this.setState({BOMname: e.target.value})}

                        name='Finished Product Name'
                        value={this.state.BOMname}
                        validators={['required']}
                        errorMessages={[
                            'Required, names should be unique but easily remembered',

                        ]}
                        autoComplete='off'
                    >
                    </TextValidator>

                    <TextValidator
                        label='Time to Make'
                        onChange={(e) => this.handleBOMtimeChange(e)}
                        name='Time in minutes to make'
                        value={this.state.BOMtime}
                        validators={['required']}
                        errorMessages={[
                            'Required, names should be unique but easily remembered',

                        ]}
                        autoComplete='off'
                    >
                    </TextValidator>




                    {/* <FormControl >
                        <InputLabel id="demo-simple-select-label">Raw Good</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.BOMrawGood.map((rawg) => (
                                <MenuItem value={rawg}>
                                    {rawg}
                                </MenuItem>)

                        </Select>
                    </FormControl> */}



                    {/* <TextValidator
                        label='Amount to be used'
                        onChange={this.handlergUnitsChange}
                        name='rgUnits'
                        value={this.state.rgUnits}
                        type='number'
                        validators={['isNumber', 'required']}
                        errorMessages={[
                            'username not available',
                            'this field is required'
                        ]}

                    >
                    </TextValidator>

                    <br />
                </ValidatorForm> */}
                {console.log(this.state.BOMname)}
            </div>

        );

    }
}