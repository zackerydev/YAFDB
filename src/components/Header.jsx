import React, { Component } from 'react'
import SearchList from './SearchList.jsx'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import LoginContent from './LoginContent.jsx'
import SignupContent from './SignupContent.jsx'
import {Tabs, Tab} from 'material-ui/Tabs'
import Playoffs from './Playoffs.jsx'
import axios from 'axios';
import CircularProgress  from 'material-ui/CircularProgress';
export default class Header extends Component {
	constructor() {
		super()
		this.state = {
			logged: false,
			loginFlag: false,
			signupFlag: false,
			teamContent: [],
			playerContent: [],
			loaded: false
		}		
	}

	componentWillMount() {
		var self = this;
		axios.get('/db/teams').then(function(response) {
			var teamStats = response.data;
			self.setState({teamContent: teamStats, loaded: true})
		})
	}

	loginPopUp = () => {
		this.setState({loginFlag: true})
	}
	signupPopUp = () => {
		this.setState({signupFlag: true})
	}
	closeLogin = () => {
		this.setState({loginFlag: false})
	}
	closeSignUp = () => {
		this.setState({signupFlag: false})
	}
	render() {
		var BarButtons;
		if(this.state.logged) {
			BarButtons = <div style={{display: "inline-block"}}>
			</div>
		} else {
			BarButtons = <div style={{display: "inline-block"}}>
								<FlatButton 
									label="Log In"
									style={{color:"white"}}
									onClick={this.loginPopUp}/>
								<RaisedButton 
									label="Sign Up"
									secondary={true}
									onClick={this.signupPopUp}/>
							</div>
		}
		var AppView;
		if(this.state.loaded) {
			AppView = <div className='siteWrapper'>
					<AppBar
						title="Yet Another Football Database" 
						iconElementRight={BarButtons}/>

					<LoginContent dialog={this.state.loginFlag} close={this.closeLogin} />
					<SignupContent dialog={this.state.signupFlag} close={this.closeSignUp}/>	
					<Tabs>
						<Tab label="Teams">
							<SearchList content={this.state.teamContent} type={"team"}/>
						</Tab>
						<Tab label="Players" >
							<SearchList content={this.state.teamContent} type={"player"}/>
						</Tab>
						<Tab label="Playoffs">
							<div>
								<Playoffs content={this.state.teamContent}/>
							</div>
						</Tab>
					</Tabs>
					</div>
		} else {
			AppView = <div className="siteWrapper" style={{margin: "auto", marginTop: "400px"}}> <CircularProgress size={80} thickness={5} /> </div>
		}

		return(<div> {AppView} </div>);
	}
}