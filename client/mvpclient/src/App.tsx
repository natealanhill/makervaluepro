import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button } from '@material-ui/core'
import logo from './logo.svg'
import './App.css'
import Auth from './components/auth/Auth'
import RawGood from './components/rawgood'
// import RawGoodList from './components/rawGoodList.txt'
import BOM from './components/BOM'
// import FinishedGood from './components/finishedGood.txt'
import MVP from './components/MVP'


interface Props {

}

interface State {
  sessionToken: string,

}

class App extends React.Component<Props, State> {
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


  redirectNoToken = () => {
    return this.state.sessionToken === localStorage.getItem("sessionToken")? (
      <Router>
      <MVP sessionToken={this.state.sessionToken}/>
      </Router>
    ):(<Auth updateToken={this.updateToken} />);
    };
  
  render() {

    return (
      <div>
      {this.redirectNoToken()}
           {/* <RawGood sessionToken={this.state.sessionToken} /> */}
      </div>
    )
  }
}

export default App
