import './App.css';
import Shortener from './Shortener';
import React from 'react'

/*
GET endpoint takes query string as ?link=
POST endpoint takes JSON body
*/

export default class App extends React.Component {
  
  componentDidMount() {
    var arg;
    console.log(process.env.REACT_APP_API_ENDPOINT);
    if (window.location.href.split('=').length > 1) {
      arg = window.location.href.split('=')[1];
      if (!arg.startsWith("?linkname=") && arg !== "") {
        var request = new XMLHttpRequest();
        request.open('GET', `${process.env.REACT_APP_API_ENDPOINT}?link=${arg}`, true)

        // handle the response when the request retrieves data
        request.onload = function() {
          var data = JSON.parse(this.response);
          //if not found, throw to error page
          if (data.statusCode === 404) {
            window.location.href = './404.html'
          }
          else {
            var link = data.body.replace(/['"]+/g, '');
            console.log(link);
            window.location.href = link;
          }
        }
        request.setRequestHeader("Content-Type", "application/json")
        request.send()
      }
  }
}
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Shortener/>
        </header>
      </div>
    );
  }
}
