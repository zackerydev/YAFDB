import React, { Component } from 'react'
import Paper from 'material-ui/Paper';

export default class StatView extends Component {
	constructor() {
		super();
	}

	render() {
		return (<div className='statView' style={{float: 'left'}}>
			<h1> {this.props.selected.fullName} </h1>
				Stats will go here
		</div>)
	}
}