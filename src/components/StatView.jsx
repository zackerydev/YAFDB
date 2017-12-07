import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import FavBorder from 'material-ui/svg-icons/toggle/star-border'
import FavIcon from 'material-ui/svg-icons/toggle/star'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
  } from 'material-ui/Table';
export default class StatView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedYear: 2017
		};
	}
	handleYear = (value) => {
		this.setState({selectedYear: value});
	}
	render() {
		//console.log(this.props)
		return (<div className='statView' style={{width: '100%', paddingLeft: "450px"}}>
			<h1> {this.props.stats[0].name} </h1>
			{/* <SelectField
				floatingLabelText="Season Year"
				value={this.state.selectedYear}
				onChange={this.handleYear}>
					{this.props.stats.map((val, idx) => {
						return <MenuItem key={idx} value={val.season_year} primaryText={val.season_year} />
					}) }
        	</SelectField> */}
			<hr style={{width: "100%"}} />
			<div style={{width: "1200px"}}>
			<ReactTable
				data={this.props.stats}
				defaultPageSize={20}
				pageSize={20}
				columns={[
					{
						Header: "Season Year",
						accessor: "season_year"
					}, {
						Header: "Season Type",
						accessor: "season_type"
					},{
						Header: "Record",
						accessor: "record"
						
					},{
						Header: "Passing Yards",
						accessor: "sum(passing_yards)"
					},{
						Header: "Receiving Touchdowns",
						accessor: "sum(receiving_touchdowns)"
					},{
						Header: "Receiving Yards",
						accessor: "sum(receiving_yards)"
					},{
						Header: "Rushing Touchdowns",
						accessor: "sum(rushing_touchdowns)"
					},{
						Header: "Sacks",
						accessor: "sum(defense_sacks)"
					},{
						Header: "Fumbles",
						accessor: "sum(fumbles)"
					}, {
						Header: "Fumbles Forced",
						accessor: "sum(fumbles_forced)"
					},{
						Header: "Fumbles Lost",
						accessor: "sum(fumbles_lost)"
					},{
						Header: "Fumbles Recovered",
						accessor: "sum(fumbles_recovered)"
					},{
						Header: "Interceptions Caught",
						accessor: "sum(interceptions_caught)"
					},{
						Header: "Interceptions Thrown",
						accessor: "sum(interceptions_thrown)"
					},{
						Header: "Kick Return TDs",
						accessor: "sum(kick_return_tds)"
					},{
						Header: "Kick Return Yards",
						accessor: "sum(kick_return_yds)"
					},{
						Header: "Field Goals Made",
						accessor: "sum(kicking_fg_made)"
					},{
						Header: "Field Goals Attempted",
						accessor: "sum(kicking_fg_tried)"
					},{
						Header: "Point After Attempts Made",
						accessor: "sum(kicking_pat_made)"
					},{
						Header: "Point After Attempts",
						accessor: "sum(kicking_pat_tried)"
					},{
						Header: "Passing Attempts",
						accessor: "sum(passing_attempts)"
					},{
						Header: "Passing Completions",
						accessor: "sum(passing_completions)"
					},{
						Header: "Punt Return Yards",
						accessor: "sum(punt_return_yds)"
					},{
						Header: "Punting Yards",
						accessor: "sum(punting_yds)"
					},{
						Header: "Punts",
						accessor: "sum(punts)"
					},{
						Header: "Receiving Catches",
						accessor: "sum(receiving_catches)"
					},{
						Header: "Receiving Targets",
						accessor: "sum(receiving_targets)"
					},{
						Header: "Rushing Attempts",
						accessor: "sum(rushing_attempts)"
					},{
						Header: "Rushing Yards",
						accessor: "sum(rushing_yards)"
					},{
						Header: "Tackles",
						accessor: "sum(tackles)"
					}
				]} 
				defaultPageSize={10}
				className="-striped -highlight"/>
			</div>

			
		</div>)
	}
}