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
  // Need to know that this is the correct way to bring the token into this class component
}

type RawGoodState = {
  id: number,
  rgName: string,
  rgUOM: string,
  rgQty: number,
  rgCost: number,
  rgVendor: string,
  BOMrawGood: [
  {id: number,
  rgName: string,
  rgUOM: string,
  rgQty: number,
  rgCost: number,
  rgVendor: string,}
  ]
}

const styles = {
  table: {
    minWidth: 650,
  },
};

export default class RawGoodList2 extends Component<AcceptedProps, RawGoodState>
{
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      id: 0,
      rgName: "",
      rgUOM: "",
      rgQty: 0,
      rgCost: 0,
      rgVendor: "",
      BOMrawGood: [
        {id: 0,
        rgName: "",
        rgUOM: "",
        rgQty: 0,
        rgCost: 0,
        rgVendor: ""}
        
      ],
    };
  }

  componentDidMount() {
    this.getAllRawGoods();
  }
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
          console.log(data, this.state.BOMrawGood)
        })
        .catch((err) => console.log(err));
      console.log(this.state.BOMrawGood)
    }
  };


  rawGoodListMap = () => {

    return this.state.BOMrawGood.map((BOMrg, index) => {
      return (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            {BOMrg.id}
          </TableCell>
       
          <TableCell align="left">{BOMrg.rgName}</TableCell>
          <TableCell align="left">{BOMrg.rgUOM}</TableCell>
          <TableCell align="left">{BOMrg.rgQty}</TableCell>
          <TableCell align="left">{BOMrg.rgCost}</TableCell>
          <TableCell align="left">{BOMrg.rgVendor}</TableCell>
          <TableCell align="left">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              value="BOMrg.id"
              onClick={(e) => {
                // this.props.updateBOMrgId(BOMrg.id);
              }}
            >
              {/* <Link style={{ color: "#FFFFFF" }} to="DEALERSCHOICE"> */}
                Edit

              {/* </Link> */}
            </Button>
          </TableCell>
          {/* <TableCell>
            <Button type="submit" variant="contained" color="secondary">
              Delete
            </Button>
            </TableCell> */}
        </TableRow>
      );
    });
  };

  render() {
    return (

      <div>
        {console.log("RawGood table")}
        <h3>Materials List</h3>
        <TableContainer component={Paper}>
          <Table style={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell align="right">id</TableCell> */}
                <TableCell align="left">Raw Material</TableCell>
                <TableCell align="left">Unit of Measure</TableCell>
                <TableCell align="left">Qty</TableCell>
                <TableCell align="left">Cost</TableCell>
                <TableCell align="left">Vendor</TableCell>
                <TableCell align="left"></TableCell>
              

              </TableRow>
                <TableBody>{this.rawGoodListMap()}</TableBody>
            </TableHead>


          </Table>
        </TableContainer>
      </div>

    );
  }
}