import React, { Component } from 'react';
import Chuck from './components/Chuck';
import {store} from './store'
import {setJoke} from './actions'



class App extends Component {
  render() {

    return [
      
        
        <Chuck key = {1}/>
      
    ];
  }
}


function dispatchCategory(val) {
  store.dispatch(setJoke(val));
}
export default App;
