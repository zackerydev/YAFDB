import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'


class Playoffs extends Component {
	constructor() {
		super()
		this.state = {
			users: []
		}
	}
	
	render() {

		return (
			<div id="playoffs" style={{marginLeft: "80px", marginRight: "80px"}}>
				Pick teams
			</div>
		)
	}
}

export default Playoffs;