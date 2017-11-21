import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import FavBorder from 'material-ui/svg-icons/toggle/star-border'
import FavIcon from 'material-ui/svg-icons/toggle/star'

export default class StatView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log("STATS TO DISPLAY")
		console.log(this.props.stats)
		//console.log(this.props)
		return (<div className='statView' style={{float: 'left', paddingLeft: "80px"}}>
			<h1> {this.props.selected[0]} </h1>
			<hr style={{width: "100%"}} />
				Stats will go here
		</div>)
	}
}