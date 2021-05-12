import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button } from '@material-ui/core';
import logo from './logo.svg'
import Auth from './auth/Auth'
import RawGood from './rawgood'
// import RawGoodList from './components/rawGoodList.txt'
import BOM from './BOM'
// import FinishedGood from './components/finishedGood.txt'
import RawGoodList from './rawGoodList'

interface Props {

}

interface State {
  sessionToken: string,

}

class LandingPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { sessionToken: "" }
  }


  updateToken = (newToken: any) => {
    localStorage.setItem('sessionToken', newToken)
    this.setState({ sessionToken: newToken })
  }
  componentDidMount(){
    const localToken = localStorage.getItem("sessionToken")
    if (localToken){
      this.updateToken(localToken)
    }
  }

  handleClickrg(e){
    <RawGood sessionToken={this.state.sessionToken} />
  };
  handleClickBOM(e){
    <BOM sessionToken={this.state.sessionToken} />
    console.log('BOM called')
  };
  handleClickfg(e){
    <RawGood sessionToken={this.state.sessionToken} />
  };

  // redirectNoToken = () => {
  //   return this.state.sessionToken === localStorage.getItem("sessionToken")? (
  //     <Router>
  //     <MVP sessionToken={this.state.sessionToken}/>
  //     </Router>
  //   ):(<Auth updateToken={this.updateToken} />);
  //   };
  
  render() {

    return (
      <div>
  <button onClick={this.handleClickrg}>Materials List</button>
  <button onClick={this.handleClickBOM}>Bill of Materials</button>
  <button onClick={this.handleClickfg}>Finished Goods</button>
  <RawGoodList  />
      </div>
    )
  }
}

export default LandingPage