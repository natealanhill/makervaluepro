import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import logo from './logo.svg'
import './App.css'
import Auth from './components/auth/Auth'
import RawGood from './components/rawgood'
import RawGoodList from './components/rawGoodList'

interface Props {

}

interface State {
  sessionToken: string | null,

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
        <RawGood />
        <RawGoodList />
      </div>
    )
  }
}

export default App
