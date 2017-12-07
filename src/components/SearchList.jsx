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
			loaded: false,
			user: props.user
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
					if(NFLTeams[i][key].toString().toLowerCase().indexOf(newQuery.toLowerCase()) !== -1){
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
						var teamPlayers = response.data
						axios.get('/db/team/home', {
							params: {
								team_name: self.state.contents[idx].name
							}
						}).then(function(response) {
							var home = response.data
							axios.get('/db/team/away', {
								params: {
									team_name: self.state.contents[idx].name
								}
							}).then(function(response) {
								var away = response.data;
								for(var i = 0; i < teamStats.length; i++) {
									if(typeof home[i] === "undefined") {
										home[i] = {
											home_wins: 0,
											home_losses: 0
										}
									}
									if(typeof away[i] === "undefined") {
										away[i] = {
											away_wins: 0,
											away_losses: 0
										}
									}
									teamStats[i].record = (home[i].home_wins + away[i].away_wins) + " - " + (home[i].home_losses + away[i].away_losses)						
								}
								self.setState({loaded: true, selected: self.state.contents[idx], players: teamPlayers, stats: teamStats})
								
							})
						})
				
					})
			})
	}

	favoriteTeam = (id, team) => {
		var self = this;
		this.props.favorite(id, team)
	}

	componentWillReceiveProps(nextProps) {
		if(typeof nextProps.user !== "undefined") {
			this.getStats(0)
			this.setState({user: nextProps.user})
		}
		
	}
	pfav = (id, player) => {
		var self = this;
		axios.get('/db/user/favorite/player', 
		{
			params: {
				user_id: self.state.user.id,
				player_id: id
			}
		}).then(function(response) {
			var user = self.state.user;
			var pname = player.first_name + " " + player.last_name
			user.players.push({Favorite_Player: player.first_name + " " + player.last_name});
			self.setState({user: user})
			alert("Player Favorited!")
		});
}
	handleClick(idx) {
		var self = this;
		this.getStats(idx);
		
	}
	render() {
		var pcont = this.state.players;
		if(typeof this.state.user.players !== "undefined") {
			for(var i = 0; i < this.state.user.players.length; i++) {
				for(var j = 0; j < pcont.length; j++) {
					if(this.state.user.players[i].Favorite_Player === pcont[j].first_name + " " + pcont[j].last_name) {
						var removed = pcont.splice(j, 1);
						removed[0].fav = true;
						pcont.unshift(removed[0]);
					} else {
						pcont[j].fav = false;
					}
				}
			}
		}
		if(this.props.type === "player" && this.state.players !== []) {
			var display =	<PlayerList selected={this.state.selected} content={pcont} favorite={this.pfav}/>				
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

						{this.state.contents.map((val, idx) => {
							//var self = this
							return <ListItem
									key={idx}
									onClick={this.handleClick.bind(this, idx)} 
									value={idx+1}
									primaryText={val.name}
									secondaryText={val.code} 
									rightIcon={<Checkbox onCheck={this.favoriteTeam.bind(this, val.id, val)} checked={val.fav}
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