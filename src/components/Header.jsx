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
import BracketList from './BracketList'
export default class Header extends Component {
	constructor() {
		super()
		this.state = {
			logged: false,
			loginFlag: false,
			signupFlag: false,
			teamContent: [],
			playerContent: [],
			loaded: false,
			user: ""
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
	favorite = (id, team) => {
		var self = this;
		axios.get('/db/user/favorite/team', 
		{
			params: {
			user_id: this.state.user.id,
			team_id: id
			}
		}).then(function(response) {
			var user = self.state.user;
			user.teams.push({Favorite_Team: team.name});
			self.setState({user: user})
			alert("Team Favorited!")
		});
	}
	closeLogin = (user) => {
		if(typeof user !== "undefined") {
			this.setState({user: user, loginFlag: false, logged: true});
		} else {
			this.setState({loginFlag: false})
		}
	}

	
	closeSignUp = (user) => {
		if(typeof user !== "undefined") {
			this.setState({user: user, signupFlag: false})
		} else {
			this.setState({signupFlag: false})
		}
	}
	render() {
		if(typeof this.state.user !== "undefined") {
			
			var cont = this.state.teamContent;
			var pcont = this.state.playerContent;
			if(typeof this.state.user.teams !== "undefined") {
				for(var i = 0; i < this.state.user.teams.length; i++) {
					for(var j = 0; j < cont.length; j++) {
						if(this.state.user.teams[i].Favorite_Team === cont[j].name) {
							var removed = cont.splice(j, 1);
							removed[0].fav = true;
							cont.unshift(removed[0]);
						} else {
							cont[j].fav = false;
						}
					}
				}
			} 
		}
		if(typeof this.state.user.brackets !== "undefined") {
			var brackets = this.state.user.brackets;
			brackets.push({name: "New"})
		} else {
			var brackets = [{name: "New"}]
		} 
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
							<SearchList content={cont} type={"team"} favorite={this.favorite} user={this.state.user}/>
						</Tab>
						<Tab label="Players" >
							<SearchList content={cont} type={"player"} favorite={this.favorite} user={this.state.user}/>
						</Tab>
						<Tab label="Playoffs">
								<BracketList teams={this.state.teamContent} user={this.state.user} favorite={this.favorite} content={brackets}/>
						</Tab>
					</Tabs>
					</div>
		} else {
			AppView = <div className="siteWrapper" style={{margin: "auto", marginTop: "400px", marginLeft: "400px"}}> <CircularProgress size={80} thickness={5} /> </div>
		}

		return(<div> {AppView} </div>);
	}
}