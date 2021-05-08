import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import logo from './logo.svg'
import './App.css'
import Auth from './components/auth/Auth'
import RawGood from './components/rawgood'
import RawGoodList from './components/rawGoodList'
import BOM from './components/BOM'
import FinishedGood from './components/finishedGood'
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
  //validate session token

  updateToken = (newToken: any) => {
    localStorage.setItem('sessionToken', newToken)
    this.setState({ sessionToken: newToken })
  }


  // redirectNoToken = () => {
  //   if(!this.state.sessionToken) {
  //     return <Redirect to='/' />
  //   }
  // }

  render() {

    return (
      <div>
        
        <Auth updateToken={this.updateToken} />
        <RawGood sessionToken={this.state.sessionToken}/>
        <RawGoodList sessionToken={this.state.sessionToken}/>
        <BOM sessionToken={this.state.sessionToken}/>
        <FinishedGood sessionToken={this.state.sessionToken}/>
      </div>
    )
  }
}

export default App
