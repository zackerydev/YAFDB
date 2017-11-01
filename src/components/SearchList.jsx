import React, { Component } from 'react'
import nflTeams from './nflteams.json'
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
	constructor() {
		super()
		this.state = {
			contents: nflTeams.NFLTeams,
			query: '',
			selected: nflTeams.NFLTeams[0]
		}
	}

	componentWillMount() {
		//This gets called any time the search bar is rendered (all the time)
		// What we do is create a list of objects of the stuff that goes in the search bar
		// Placeholder object is in the nflteams.json file, we will remove this later

	}

	filterContent(e) {
		var newQuery = e.target.value
		var newContents = []
		if(newQuery === '') {
			this.setState({contents: nflTeams.NFLTeams})
		} else {
			for(var i = 0; i < nflTeams.NFLTeams.length; i++) {
				for(var key in nflTeams.NFLTeams[i]) {
					if(nflTeams.NFLTeams[i][key].toLowerCase().indexOf(newQuery.toLowerCase()) !== -1){
						newContents.push(nflTeams.NFLTeams[i])
						break
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
		//var self = this
		return (<div className='horzWrapper'>
			<div className='searchList' style={{width: '25%', minWidth: '400px', overflow: 'hidden', float: 'left'}}>
				<div className='sLHeader' style={{borderBottom: 'black solid 4px', borderRight: 'black solid 4px'}}>
									
	
					<TextField
						style={{width: "100%", height: "100%", padding: "20px"}}
						hintText='Hint Text'
						floatingLabelText='Search...'
						onChange={this.filterContent.bind(this)}/>
				</div>

				<div className='sLContents'>
					<ul style={{overflowY: 'auto', height: '75vh', paddingLeft: '0', marginTop: '0'}}>
						<SelectableList defaultValue={1}>

						{this.state.contents.map((val, idx) => {
							//var self = this
							return <ListItem
									onClick={this.handleClick.bind(this, idx)} 
									value={idx+1}
									primaryText={val.fullName} 
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
			<div className='statView' style={{display: 'inline-block'}}>
				<StatView selected={this.state.selected} />
			</div>
		</div>
		)
	}
}