import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
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
			dialog: this.props.dialog
		}
	}

	handleSubmit = () => {
		console.log(this.state.formData)
		this.props.close();
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
