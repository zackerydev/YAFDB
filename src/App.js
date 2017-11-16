import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red500, red700, grey900, darkBlack, grey400} from 'material-ui/styles/colors';

class App extends Component {
	constructor() {
		super()
		this.state = {
			users: []
		}
	}
	
	componentDidMount() {
		fetch('/db/teams')
			.then(res => res.json())
			.then(users => console.log(users))
	}
	render() {
		const muiTheme = getMuiTheme({
			palette: {
				primary1Color: darkBlack,
				primary2Color: grey900,
				accent1Color: red500,
				accent2Colro: red700

			}
		})
		return (
			<div className="App">
				<MuiThemeProvider muiTheme={muiTheme}>
					<Header />
				</MuiThemeProvider>
			</div>
		)
	}
}

export default App;
