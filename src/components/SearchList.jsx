import React, { Component } from 'react';
import nflTeams from './nflteams.json';
import '../css/SearchList.css';
import StatView from './StatView';
export default class SearchList extends Component {
	constructor() {
		super();
		this.state = {
			contents: nflTeams.NFLTeams,
			query: "",
			selected: nflTeams.NFLTeams[0]
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

	handleClick(idx) {
		this.setState({selected: this.state.contents[idx]})
	}
	render() {
		var self = this;
		return (<div className="horzWrapper">
					<div className="searchList" style={{width: "25%", minWidth: "400px", overflow: "hidden", float: "left"}}>
						<div className="sLHeader" style={{padding: "20px", fontWeight: "700", border: "black solid 4px"}}>
							<input type="search" placeholder="Search..." style={{padding: "15px", width: "100%"}} onChange={this.filterContent.bind(this)}/>
						</div>
		
						<div className="sLContents">
							<ul style={{overflowY: "auto", height: "75vh", paddingLeft: "0", marginTop: "0"}}>
								{this.state.contents.map((val, idx) => {
									var self = this;
									return <a href="#" key={idx} onClick={this.handleClick.bind(this, idx)}> <li className="slItem" key={idx} > {val.fullName} </li> </a>
								})}
							</ul>
						</div>
					</div>
					<div className="statView" style={{display: "inline-block"}}>
						<StatView selected={this.state.selected} />
					</div>
				</div>
			)
	}
}