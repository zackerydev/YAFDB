import React, { Component } from 'react'
import '../css/SearchList.css'
import StatView from './StatView'
import TextField from 'material-ui/TextField'
import {List, ListItem, makeSelectable} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import FavBorder from 'material-ui/svg-icons/toggle/star-border'
import FavIcon from 'material-ui/svg-icons/toggle/star'
import Checkbox from 'material-ui/Checkbox'
import {yellow500} from 'material-ui/styles/colors'
import PropTypes from 'prop-types'
import Subheader from 'material-ui/Subheader'
import axios from 'axios';
import PlayerList from './PlayerList'
import CircularProgress from 'material-ui/CircularProgress'
let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
			});
			
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList)

export default class SearchList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			contents:this.props.content,
			query: '',
			selected: this.props.content[0],
			all: this.props.content,
			stats: [],
			players: [],
			loaded: false
		}
		this.getStats(0)
	}

	filterContent(e) {
		var newQuery = e.target.value
		var newContents = []
		if(newQuery === '') {
			this.setState({contents: this.state.all})
		} else {
			var NFLTeams = this.state.contents;
			for(var i = 0; i < NFLTeams.length; i++) {
				for(var key in NFLTeams[i]) {
					if(NFLTeams[i][key].toLowerCase().indexOf(newQuery.toLowerCase()) !== -1){
						newContents.push(NFLTeams[i])
						break
					}
				}
			}
			this.setState({contents: newContents})
		}
		
	}
	getStats = (idx, name) => {
		var self = this;
		axios.get('/db/team/stats', 
			{
				params: {
				team_name: self.state.contents[idx].name
				}
			}).then(function(response) {
				var teamStats = response.data;
				axios.get('/db/team/players', 
					{
						params: {
						team_name: self.state.contents[idx].name
						}
					}).then(function(response) {
						self.setState({loaded: true, selected: self.state.contents[idx], players: response.data, stats: teamStats})
					})
			})
	}

	handleClick(idx) {
		var self = this;
		this.getStats(idx);
		
	}
	render() {
		var cont = this.state.contents;
		if(this.props.type === "player" && this.state.players !== []) {
			var display =	<PlayerList selected={this.state.selected} content={this.state.players}/>				
		} else {
			var display = <StatView selected={this.state.selected} stats={this.state.stats} players={this.state.players}/>

		}
		//var self = this
		var body;
		if(this.state.loaded) {
			body = <div className='horzWrapper'>
			<div className='searchList' style={{width: '350px', overflow: 'hidden', float: 'left'}}>
				<div className='sLHeader'>
							
	
					<TextField
						style={{width: "80%", height: "100%", padding: "20px"}}
						hintText='Type here to search!'
						floatingLabelText='Search...'
						floatingLabelFixed={true}
						onChange={this.filterContent.bind(this)}/>
				</div>

				<div className='sLContents'>
					<ul style={{overflowY: 'auto', height: '75vh', paddingLeft: '0', marginTop: '0'}}>
						<SelectableList defaultValue={1}>

						{cont.map((val, idx) => {
							//var self = this
							return <ListItem
									key={idx}
									onClick={this.handleClick.bind(this, idx)} 
									value={idx+1}
									primaryText={val.name}
									secondaryText={val.code} 
									rightIcon={<Checkbox 
										checkedIcon={<FavIcon color={yellow500}/>}
										uncheckedIcon={<FavBorder color={yellow500}/>}
									/>}
								/>	
									
						})}
						</SelectableList>
					</ul>
				</div>
			</div>
			{display}
		</div>
		} else {
			body = <div style={{margin: "auto", marginTop: "400px"}}> <CircularProgress size={80} thickness={5} /> </div>
		}
		return ( 
			<div> {body} </div>
		)
	}
}