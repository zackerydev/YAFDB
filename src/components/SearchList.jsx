import React, { Component } from 'react';
import nflTeams from './nflteams.json';
import '../css/SearchList.css';
export default class SearchList extends Component {
	constructor() {
		super();
		this.state = {
			contents: nflTeams.NFLTeams,
			query: ""
		}
	}

	componentWillMount() {
		//This gets called any time the search bar is rendered (all the time)
		// What we do is create a list of objects of the stuff that goes in the search bar
		// Placeholder object is in the nflteams.json file, we will remove this later

	}

	filterContent(e) {
		var newQuery = e.target.value;
		var newContents = [];
		if(newQuery === "") {
			this.setState({contents: nflTeams.NFLTeams})
		} else {
			for(var i = 0; i < nflTeams.NFLTeams.length; i++) {
			for(var key in nflTeams.NFLTeams[i]) {
				if(nflTeams.NFLTeams[i][key].toLowerCase().indexOf(newQuery.toLowerCase()) !== -1){
					newContents.push(nflTeams.NFLTeams[i]);
					break;
				}
			}
		}

		this.setState({contents: newContents})
		}
		
	}
	render() {
		return (
				<div className="searchList" style={{width: "25%"}}>
					<div className="sLHeader" style={{padding: "20px", fontWeight: "700", border: "black solid 4px"}}>
						<input type="search" placeholder="Search..." style={{padding: "15px", width: "100%"}} onChange={this.filterContent.bind(this)}/>
					</div>
	
					<div className="sLContents">
						<ul style={{overflowY: "auto", maxHeight: "100vh"}}>
							{this.state.contents.map(function(val, idx) {
								return <li className="slItem" key={idx}> {val.fullName} </li>
							})}
						</ul>
					</div>
			
				</div>
			)
	}
}