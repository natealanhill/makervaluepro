import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(rgName: string, rgUOM: string, rgQty: number, rgCost: number, rgVendor: string) {
  return { rgName, rgUOM, rgQty, rgCost, rgVendor };
}

const rows = [
  // createData('Plywood', "Sq. Feet", 32, 24.00, "Home Depot"),
  createData(getAllRawGoods())

];



export default function BasicTable() {
  const classes = useStyles();

  getAllRawGoods = () => {
    if (this.props.sessionToken) {
        fetch("http://localhost:3030/rawGood/mine", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                // Authorization: this.props.sessionToken,
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




  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Raw Material</TableCell>
            <TableCell align="right">Unit of Measure</TableCell>
            <TableCell align="right">Quantity on Hand</TableCell>
            <TableCell align="right">Cost Per Unit</TableCell>
            <TableCell align="right">Vendor</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rgName}>
              <TableCell component="th" scope="row">
                {row.rgName}
              </TableCell>
              <TableCell align="right">{row.rgUOM}</TableCell>
              <TableCell align="right">{row.rgQty}</TableCell>
              <TableCell align="right">{row.rgCost}</TableCell>
              <TableCell align="right">{row.rgVendor}</TableCell>
              <TableCell align="right">{"EDIT"}</TableCell>
              <TableCell align="right">{"DELETE"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




// import React, { Component } from 'react';
// import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import { Button } from '@material-ui/core';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';



// const StyledTableCell = withStyles((theme: Theme) =>
//   createStyles({
//     head: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   }),
// )(TableCell);

// const StyledTableRow = withStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//       },
//     },
//   }),
// )(TableRow);

// function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = 
// fetch(`http://localhost:3030/user/register`, {
//     method: 'POST',
//     body: JSON.stringify({
//         rawGood: {
//             rgName: this.state.rgName,
//             rgUOM: this.state.rgUOM,
//             rgQty: this.state.rgQty,
//             rgCost: this.state.rgCost,
//             rgVendor: this.state.rgVendor
//         },

//     }),


// [


// //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// //   createData('Eclair', 262, 16.0, 24, 6.0),
// //   createData('Cupcake', 305, 3.7, 67, 4.3),
// //   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// const useStyles = makeStyles({
//   table: {
//     minWidth: 700,
//   },
// });


// export default class CustomizedTables() extends Component< {
//     const classes = useStyles();
  
//     return (
//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Raw Material</StyledTableCell>
//               <StyledTableCell align="right">Unit of Measure</StyledTableCell>
//               <StyledTableCell align="right">Quantity</StyledTableCell>
//               <StyledTableCell align="right">Cost per Unit</StyledTableCell>
//               <StyledTableCell align="right">Vendor</StyledTableCell>
              
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <StyledTableRow key={row.name}>
//                 <StyledTableCell component="th" scope="row">
//                   {row.name}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{row.calories}</StyledTableCell>
//                 <StyledTableCell align="right">{row.fat}</StyledTableCell>
//                 <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//                 <StyledTableCell align="right">{row.protein}</StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
// )}