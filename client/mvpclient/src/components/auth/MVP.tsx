import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import logo from './logo.svg'
import Auth from './Auth'
import RawGood from '../rawgood'
// import RawGoodList from './components/rawGoodList.txt'
import BOM from '../BOM'
// import FinishedGood from './components/finishedGood.txt'
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
  componentDidMount(){
    const localToken = localStorage.getItem("sessionToken")
    if (localToken){
      this.updateToken(localToken)
    }
  }


  // redirectNoToken = () => {
  //   if(!this.state.sessionToken) {
  //     return <Redirect to='/' />
  //   }
  // }

  render() {

    return (
      <div>
        <RawGood sessionToken={this.state.sessionToken}/>
        {/* <RawGoodList sessionToken={this.state.sessionToken}/> */}
        <BOM sessionToken={this.state.sessionToken}/>
        {/* <FinishedGood sessionToken={this.state.sessionToken}/> */}
      </div>
    )
  }
}

export default App
