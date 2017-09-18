import React, { Component } from 'react';
import SearchList from './SearchList.jsx';

export default class Header extends Component {
	constructor() {
		super();
	}

	render() {
		return(<div className="siteWrapper">
				<div className="header" style={{
					height: "80px",
					paddingTop: "30px",
					borderBottom: "black solid 8px"}}>
						<h2 style={{textAlign: "left", fontSize: "30px", fontWeight: "700", paddingLeft: "80px"}}> Yet Another Football Database </h2>
				</div>
	
				<SearchList />
		</div>
		)
	}
}