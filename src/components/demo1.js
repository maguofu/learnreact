import React, { Component } from 'react';
import logo from '../logo.svg';
import ReactDom from 'react-dom'
var greet = <div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" onClick={handle}/>
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
  </p>
  <p className="btns"></p>
</div>
// class greeting extends React.Component{

// }
const element = <button>click</button>;
function handle() {
  console.log(11111111111, element);
}
// ReactDom.render(
//   element,
//   document.getElementsByClassName('btns')[0]
// );

// export default {
//   greet
// }
export default greet