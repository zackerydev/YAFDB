import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import axios from 'axios'
export default class SignupContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: {
				username: "",
				password: "",
				passwordConfirm: "",
				fName: "",
				lName: ""
			},
			dialog: this.props.dialog,
			error: ""
		}
	}

	handleSubmit = () => {
		var self = this;
		if(self.state.formData.password !== self.state.formData.passwordConfirm) {
			self.setState({error: "Passwords do not match!"});
		} else {
			axios.get('/db/user/signup', 
			{
				params: {
					username: this.state.formData.username,
					password: this.state.formData.password,
					fname: this.state.formData.fName,
					lname: this.state.formData.lName
				}
			}).then(function(response) {
				if(response.data.code !== 200) {
					self.setState({error: response.data.failed})
				} else {
					axios.get('/db/user/login', 
					{
						params: {
							username: self.state.formData.username,
							password: self.state.formData.password
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
							self.props.close(user)
						}
					});
				}

			})
		}		
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
					title="Sign Up"
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
					    /><br />
					    <TextField
					    	id="password"
							hintText="Password Field"
							floatingLabelText="Password"
							type="password"
							onChange={this.updateState("password")}
					    />
					    <TextField
					    	id="passwordconfirm"
							hintText="Confirm Password Field"
							floatingLabelText="Comfirm Password"
							type="password"
							onChange={this.updateState("passwordConfirm")}
						/><br />
					    <TextField
					    	id="fname"
							hintText="First Name Field"
							floatingLabelText="First Name"
							onChange={this.updateState("fName")}
						/>
					    <TextField
					    	id="lname"
							hintText="Last Name Field"
							floatingLabelText="Last Name"
							onChange={this.updateState("lName")}
					    />
		    </Dialog>
		</div>)
	}
}
