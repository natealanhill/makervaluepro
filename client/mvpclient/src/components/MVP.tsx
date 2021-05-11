import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button } from '@material-ui/core';
import logo from './logo.svg'
import Auth from './auth/Auth'
import RawGood from './rawgood'
// import RawGoodList from './components/rawGoodList.txt'
import BOM from './BOM'
// import FinishedGood from './components/finishedGood.txt'
import LandingPage from './LandingPage' 

type AcceptedProps = {
  sessionToken: string,
}

interface State {
  sessionToken: string,

}

class App extends React.Component<AcceptedProps, State> {
  constructor(props: AcceptedProps) {
    super(props)
    this.state = { sessionToken: "" }
  }
  //validate session token

  updateToken = (newToken: any) => {
    localStorage.setItem('sessionToken', newToken)
    this.setState({ sessionToken: newToken })
  }
  componentDidMount() {
    const localToken = localStorage.getItem("sessionToken")
    if (localToken) {
      this.updateToken(localToken)
    }
  }

  render() {

    return (
      <div>
        <LandingPage />
        <img src="src\assests\vectorstock_20405450.jpg" alt="Girl in a jacket" width="100%" height="100%" />
        {/* <Switch>
          <Route exact path="/rawgood">
          <RawGood sessionToken={this.props.sessionToken} />
          </Route>
        </Switch> */}

        <RawGood sessionToken={this.state.sessionToken} />
        {/* <RawGoodList sessionToken={this.state.sessionToken}/> */}
        <BOM sessionToken={this.state.sessionToken} />
        {/* <FinishedGood sessionToken={this.state.sessionToken}/> */}
        <br></br>
        <br></br>
      </div>
    )
  }
}

export default App
