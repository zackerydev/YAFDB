import React, { Component } from 'react'
import SearchList from './SearchList.jsx'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import LoginContent from './LoginContent.jsx'
import SignupContent from './SignupContent.jsx'

export default class Header extends Component {
	constructor() {
		super()
		this.state = {
			logged: false,
			loginFlag: false,
			signupFlag: false
		}		
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
		return(<div className='siteWrapper'>
			<AppBar
				title="Yet Another Football Database" 
				iconElementRight={BarButtons}/>

			<LoginContent dialog={this.state.loginFlag} close={this.closeLogin} />
			<SignupContent dialog={this.state.signupFlag} close={this.closeSignUp}/>	

			<SearchList />
		</div>
		)
	}
}