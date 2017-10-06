import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header.jsx'

class App extends Component {
	state = {
		users: []
	}
	componentDidMount() {
		fetch('/users')
      .then(res => res.json())
      .then(users => console.log(users));
	}
	render() {
	return (
	  		<div className="App">
	    		<Header />
	    	</div>
			);
		}
	}

export default App;
