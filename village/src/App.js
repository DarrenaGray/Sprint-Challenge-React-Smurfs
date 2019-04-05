import React, { Component } from 'react';
import axios from 'axios';
import {  NavLink, Route } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    console.log('Mounting...')
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        console.log(res)
        this.setState({
          smurfs: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  addNewSmurf = smurf => {
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        console.log(res)
        this.setState({
          smurfs: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  


  render() {
    console.log('Rendering...')
    return (
      <div className="App">
        <ul>
          <li>
            <NavLink exact to="/">Smurfs</NavLink>
          </li>
          <li>
            <NavLink to="/smurf-form">Add Smurf</NavLink>
          </li>
        </ul>
        <Route path='/smurf-form' render={props => <SmurfForm {...props} addSmurf={this.addNewSmurf}/>}/>
        <Route exact path='/' render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}/>
      </div>
    );
  }
}

export default App;
