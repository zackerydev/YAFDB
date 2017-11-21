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

export default class PlayerList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			contents:this.props.content,
			query: '',
			selected: this.props.content[0],
			all: this.props.content,
			stats: [],
			players: []
		}
		this.getStats(0)
	}

    componentWillReceiveProps(nextProps) {
        this.setState({contents: nextProps.content, selected: nextProps.content[0], all: nextProps.content} )
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
	getStats = (idx) => {
		var self = this;
        axios.get('/db/player/stats', 
        {
            params: {
            first_name: this.state.contents[idx].first_name,
            last_name: this.state.contents[idx].last_name
            }
        }).then(function(response) {
            console.log(response.data)
            self.setState({selected: self.state.contents[idx], stats: response.data})
        })
	}

	handleClick(idx) {
		var self = this;
		this.getStats(idx, "team");
		
	}
	render() {
        var cont = this.state.contents;
		//var self = this
		return (<div className='horzWrapper'>
			<div className='searchList' style={{width: '25%', minWidth: '400px', overflow: 'hidden', float: 'left'}}>
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
									primaryText={val.first_name + " " + val.last_name}
									secondaryText={val.Team_name + " | " + val.position} 
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
			<StatView selected={this.state.selected} stats={this.state.stats} players={this.state.players}/>
		</div>
		)
	}
}