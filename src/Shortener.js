import React from 'react';
import './Shortener.css'

export default class Shortener extends React.Component {

    shortenLink() {
        // Rudimentary regex for testing if the link looks somewhat valid, this might not pass for more obscure URLs
        var pattern = /(ftp|http|https]:\/\/)*(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        var matches = pattern.test(document.getElementById('linkname').value);
        if (matches && document.getElementById('linkname') !== "") {
            var request = new XMLHttpRequest();
            request.open('POST', `${process.env.REACT_APP_API_ENDPOINT}`);
            request.setRequestHeader("Content-Type", "application/json");

            request.onload = function() {
                var data = JSON.parse(this.response);
                if (data.statusCode === 500) {
                    var status = document.getElementsByName('status')[0];
                    status.innerHTML = "Something went wrong. Please try again."
                }
                else {
                    var link = data.body.replace(/['"]+/g,'');
                    var status = document.getElementsByName('status')[0];
                    status.innerHTML = `Your shortened link is:`;
                    status.style.color = 'green';
                    var shortLink = document.getElementsByName('linkbox')[0];
                    shortLink.innerHTML =  `${window.location.hostname}/?link=${link}`;
                    shortLink.href = `${window.location.hostname}/?link=${link}`;
                }
            }

            var arg = document.getElementById('linkname').value;
            request.send(JSON.stringify({"Link": arg}));
        }
        else {
            var status = document.getElementsByName('status')[0];
            status.innerHTML = "Your link doesn't look quite right. Please try again.";
            status.style.color = 'red';
        }
    }    

    render() {
        return (
            <div className='shortener-container'>
                    <label for='linkname' className='linklabel'>Link to shorten: </label>
                    <input type='text' id='linkname' name='linkname'></input>
                    <br></br>
                    <button onClick={() => this.shortenLink()}>Shorten Link</button>
                <div name='status'></div>
                <a name='linkbox' href='#'></a>
            </div>
        )
    }
}