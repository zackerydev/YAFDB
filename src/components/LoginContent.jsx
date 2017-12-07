import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import axios from 'axios'
export default class LoginContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: {
				username: "",
				password: "",
			},
			dialog: this.props.dialog,
			error: ""
		}
	}

	handleSubmit = () => {
		var self = this;
		axios.get('/db/user/login', 
			{
				params: {
					username: this.state.formData.username,
					password: this.state.formData.password
				}
			}).then(function(response) {
				if(response.data.code !== 200) {
					self.setState({error: response.data.failed})
				} else {
					var user = {
						id: response.data.id,
						lname: response.data.last_name,
						fname: response.data.first_name,
						username: response.data.username
					}
					axios.get('/db/user/favorite/teams', {
						params: {
							username: user.id
						}
					}).then(function(response) {
						user.teams = response.data

						axios.get('/db/user/favorite/players', {
							params: {
								username: user.id
							}
						}).then(function(response) {
							user.players = response.data
							axios.get('/db/user/brackets', {
								params: {
									username: user.id
								}
							}).then(function(response) {
								user.brackets = response.data
								self.props.close(user);
							})
						})
					})
						
					
				}

		})
		
	}
	
	updateState = (propName) => (event) => {
		const { formData } = this.state;
		const newFormData = {
			...formData,
			[propName]: event.target.value
		};

		this.setState({formData: newFormData})
	}

	closeSignUp = () => {
		this.setState({dialog: false})
	}

	render() {
		if(this.state.error != "") {
			var err = <h3 style={{color: 'red'}}>
			{this.state.error} </h3>
		} else {
			var err = <div></div>
		}
		const signupActions = [ 
		<FlatButton
	        label="Cancel"
	        primary={true}
	        onClick={this.props.close}
	      />,
	      <FlatButton
	        label="Submit"
	        primary={true}
	        keyboardFocused={true}
	        onClick={this.handleSubmit}
	      />,
		];
		return(<div>
				<Dialog
					title="Log In"
					actions={signupActions}
					modal={true}
					open={this.props.dialog}
					onRequestClose={this.closeSignUp} >
					{err}
						<TextField
							id="username"
							hintText="Username Field"
							floatingLabelText="Username"
							onChange={this.updateState("username")}
					    />
					    <TextField
					    	id="password"
							hintText="Password Field"
							floatingLabelText="Password"
							type="password"
							onChange={this.updateState("password")}
					    />
		    </Dialog>
		</div>)
	}
}
