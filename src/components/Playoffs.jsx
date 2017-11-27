import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import axios from 'axios'

class Playoffs extends Component {
	constructor(props) {
		super(props)
		var nfc = [] 
		var afc = []
		for(var i = 0; i < props.teams.length; i++){
			if(props.teams[i].conference === "NFC") {
				nfc.push(props.teams[i]);
			} else {
				afc.push(props.teams[i])
			}
		}
		this.state = {
			users: [],
			bracketName: "",
			teams: props.teams,
			ready: true,
			afc: afc,
			nfc: nfc,
			afcw: afc,
			nfcw: nfc,
			afc2: [{name: "Select previous seed first!"}],
			afc3: [{name: "Select previous seed first!"}],
			afc4: [{name: "Select previous seed first!"}],
			nfc2: [{name: "Select previous seed first!"}],
			nfc3: [{name: "Select previous seed first!"}],
			nfc4: [{name: "Select previous seed first!"}],
			as1: "",
			as2: "",
			as3: "",
			as4: "",
			as5: "",
			as6: "",
			ns1: "",
			ns2: "",
			ns3: "",
			ns4: "",
			ns5: "",
			ns6: "",
			awinner1: "",
			awinner2: "",
			awinner3: "",
			awinner4: "",
			awinner5: "",
			nwinner1: "",
			nwinner2: "",
			nwinner3: "",
			nwinner4: "",
			nwinner5: "",
			superbowlwinner: ""
		}
	}

	handleChange = (seed, event, team) => {
		if(seed === "as1") {
			var Div = this.state.afc[team].conference + this.state.afc[team].division;
			var teamName = this.state.afc[team].name
			var wild = this.state.afcw.slice();
			wild.splice(team, 1);
			var afc2 = []
			for(var i = 0; i < this.state.afc.length; i++) {
				var team = this.state.afc[i];
				if(Div !== team.conference + team.division) {
					afc2.push(team);
				}
			}
			this.setState({as1: teamName, afc2: afc2, afcw: wild});
		} else if(seed === "as2") {
			var teams = this.state.afc2;
			var Div = teams[team].conference + teams[team].division;
			var teamName = teams[team].name
			var wild = this.state.afcw.slice();
			wild.splice(wild.indexOf(teams[team]), 1);
			var newTeams = []
			for(var i = 0; i < teams.length; i++) {
				var team = teams[i];
				if(Div !== team.conference + team.division) {
					newTeams.push(team);
				}
			}
			this.setState({as2: teamName, afc3: newTeams, afcw: wild});
		} else if(seed === "as3") {
			var teams = this.state.afc3;
			var Div = teams[team].conference + teams[team].division;
			var teamName = teams[team].name
			var wild = this.state.afcw.slice();
			wild.splice(wild.indexOf(teams[team]), 1);
			var newTeams = []
			for(var i = 0; i < teams.length; i++) {
				var team = teams[i];
				if(Div !== team.conference + team.division) {
					newTeams.push(team);
				}
			}
			this.setState({as3: teamName, afc4: newTeams, afcw: wild});
		} else if(seed === "as4") {
			var teams = this.state.afc4;
			var teamName = teams[team].name
			var wild = this.state.afcw.slice();
			wild.splice(wild.indexOf(teams[team]), 1);
			
			this.setState({as4: teamName,  afcw: wild});
		} else if(seed === "as5") {
			var teams = this.state.afcw;
			var teamName = teams[team].name
			var wild = this.state.afcw.slice();
			wild.splice(wild.indexOf(teams[team]), 1);
			
			this.setState({as5: teamName});
		} else if(seed === "as6") {
			var teams = this.state.afcw;
			var teamName = teams[team].name

			this.setState({as6: teamName});
		} else if(seed === "ns1") {
				var Div = this.state.nfc[team].conference + this.state.nfc[team].division;
			var teamName = this.state.nfc[team].name
			var wild = this.state.nfcw.slice();
			wild.splice(team, 1);
			var nfc2 = []
			for(var i = 0; i < this.state.nfc.length; i++) {
				var team = this.state.nfc[i];
				if(Div !== team.conference + team.division) {
					nfc2.push(team);
				}
			}
			this.setState({ns1: teamName, nfc2: nfc2, nfcw: wild});
			
		} else if(seed === "ns2") {
			var teams = this.state.nfc2;
			var Div = teams[team].conference + teams[team].division;
			var teamName = teams[team].name
			var wild = this.state.nfcw.slice();
			wild.splice(wild.indexOf(teams[team]), 1);
			var newTeams = []
			for(var i = 0; i < teams.length; i++) {
				var team = teams[i];
				if(Div !== team.conference + team.division) {
					newTeams.push(team);
				}
			}
			this.setState({ns2: teamName, nfc3: newTeams, nfcw: wild});
		} else if(seed === "ns3") {
			var teams = this.state.nfc3;
			var Div = teams[team].conference + teams[team].division;
			var teamName = teams[team].name
			var wild = this.state.nfcw.slice();
			wild.splice(wild.indexOf(teams[team]), 1);
			var newTeams = []
			for(var i = 0; i < teams.length; i++) {
				var team = teams[i];
				if(Div !== team.conference + team.division) {
					newTeams.push(team);
				}
			}
			this.setState({ns3: teamName, nfc4: newTeams, nfcw: wild});
		} else if(seed === "ns4") {
			var teams = this.state.nfc4;
			var teamName = teams[team].name
			var wild = this.state.nfcw.slice();
			wild.splice(wild.indexOf(teams[team]), 1);
			
			this.setState({ns4: teamName,  nfcw: wild});
		} else if(seed === "ns5") {
			var teams = this.state.nfcw;
			var teamName = teams[team].name
			var wild = this.state.nfcw.slice();
			wild.splice(wild.indexOf(teams[team]), 1);
			
			this.setState({ns5: teamName});
		} else if(seed === "ns6") {
			var teams = this.state.nfcw;
			var teamName = teams[team].name

			this.setState({ns6: teamName});
		}
	}
	handlePick = (prop, event, team) => {
		this.setState({[prop]: event.target.textContent});
	}
	updateState = (propName) => (event) => {

		this.setState({[propName]: event.target.value})
	}
	getParticipant = (options) => {
			var index = options.data[options.info][options.placement];
			var participant = this.state.participants[index];
			return participant?<span>{participant}</span>:<span>&nbsp;</span>;
	}
	saveBracket = () => {
		console.log("save")
	}
	saveBracket = () => {
		if(this.props.user !== "") {
			axios.post('/db/user/savebracket', {
			user_id: this.props.user.id,
			name: this.state.bracketName,
			afc_seed1: this.state.as1,
			afc_seed2: this.state.as2,
			afc_seed3: this.state.as3,
			afc_seed4: this.state.as4,
			afc_seed5: this.state.as5,
			nfc_seed1: this.state.ns1,
			nfc_seed2: this.state.ns2,
			nfc_seed3: this.state.ns3,
			nfc_seed4: this.state.ns4,
			nfc_seed5: this.state.ns5,
			afc_wc_winner1: this.state.awinner1,
			afc_wc_winner2: this.state.awinner2,
			afc_div_winner1: this.state.awinner3,
			afc_div_winner2: this.state.awinner4,
			afc_champ: this.state.awinner5,
			nfc_wc_winner1: this.state.nwinner1,
			nfc_wc_winner2: this.state.nwinner2,
			nfc_div_winner1: this.state.nwinner3,
			nfc_div_winner2: this.state.nwinner4,
			nfc_champ: this.state.nwinner5,
			sb_champ: this.state.superbowlwinner
			})
		} else {
			alert("Please login or sign up if you want to save this bracket!")
		}
		
	}
	generateBracket = () => {
		if(this.state.as1 !== "" && this.state.as2 !== "" && this.state.as3 !== "" && this.state.as4 !== "" && this.state.as5 !== "" && this.state.as6 !== "" &&
		this.state.ns1 !== "" && this.state.ns2 !== "" && this.state.ns3 !== "" && this.state.ns4 !== "" && this.state.ns5 !== "" && this.state.ns6 !== "") {
				
				this.setState({ready: true})
			}
	}
	render() {		
		console.log(this.props)
		var afcseed2;
		var bracket;
		var display;
		var React = require('react'),
			Bracket = require('react-bracket');

		var layout = [
		  [
			[4, 5],
			null,
			[3, 6],
			null,
			null,
			[15, 16],
			null,
			[14, 17]

		  ],
		  
		  [
			[7, 1],
			[8, 2],
			[12, 18],
			[13, 19]

		  ],
		  
		  [
			[9, 10],
			[20, 21]

		  ],
		  [
			[11,22],	
		  ],
		  [[23]]
		  
		];

	
		var participants = [this.state.as1, this.state.as2, this.state.as3, this.state.as4, 
							this.state.as5, this.state.as6, this.state.awinner1, this.state.awinner2, 
							this.state.awinner3, this.state.awinner4, this.state.awinner5, 
							this.state.ns1, this.state.ns2, this.state.ns3, this.state.ns4, 
							this.state.ns5, this.state.ns6, this.state.nwinner1, this.state.nwinner2, 
							this.state.nwinner3, this.state.nwinner4, this.state.nwinner5, this.state.superbowlwinner];
		
		var seeds = [this.state.as1, this.state.as2, this.state.as3, this.state.as4, this.state.as5, this.state.as6,
					 this.state.ns1, this.state.ns2, this.state.ns3, this.state.ns4, this.state.ns5, this.state.ns6];

		var getParticipant = function(options){
			var team = participants[(options.info||[])[options.index] - 1];
			var idx = (options.info||[])[options.index];
			var num;
			if(team == "") {
				if(idx < 21 && idx % 11 < 7 && idx % 11 > 0) {
					num = idx % 11 + "   ";
				} else {
					num = "";
				}
			} else {
				num = seeds.indexOf(team) % 6  + 1 + "   ";
			}
			var participant = num + team;
			return participant?<span>{participant}</span>:<span>&nbsp;</span>;
		};
		
		if(false){
		// if(this.props.user === "") {
			display = <div id="playoffs" style={{ marginLeft: '40px', marginTop: '25px', width: "100%", whiteSpace: 'nowrap', marginLeft: '80px'}}>
			<h1> Please log in to generate playoff brackets </h1> </div>
		} else {
			display = <div id="playoffs" style={{ marginLeft: '40px', marginTop: '25px', width: "100%", whiteSpace: 'nowrap', marginLeft: '80px'}}>
				<h1> Playoff Generator </h1>
				<hr />
				<TextField
						hintText='Enter Bracket Name Here!'
						floatingLabelFixed={true}
						onChange={this.updateState("bracketName")}/>
				<RaisedButton
					label="Save"
					secondary={true}
					onClick={this.saveBracket}/>
				<div className="afc-seed-select">
				<SelectField
					floatingLabelText="AFC Seed 1"
					onChange={this.handleChange.bind(this, "as1")}
					value={this.state.as1}
					>
					{this.state.afc.map((val, idx) => {
						return <MenuItem key={idx} value={val.name} primaryText={val.name} />
					})}
        		</SelectField>
				<SelectField
					floatingLabelText="AFC Seed 2"
					onChange={this.handleChange.bind(this, "as2")}
					value={this.state.as2}
					> 
					{this.state.afc2.map((val, idx) => {
						return <MenuItem key={idx} value={val.name} primaryText={val.name} />
					})}
				</SelectField>
				<SelectField
					floatingLabelText="AFC Seed 3"
					onChange={this.handleChange.bind(this, "as3")}
					value={this.state.as3}
					> 
					{this.state.afc3.map((val, idx) => {
						return <MenuItem key={idx} value={val.name} primaryText={val.name} />
					})}
				</SelectField>
				<br />
				<SelectField
					floatingLabelText="AFC Seed 4"
					onChange={this.handleChange.bind(this, "as4")}
					value={this.state.as4}
					> 
					{this.state.afc4.map((val, idx) => {
						return <MenuItem key={idx} value={val.name} primaryText={val.name} />
					})}
				</SelectField>
				<SelectField
					floatingLabelText="AFC Seed 5"
					onChange={this.handleChange.bind(this, "as5")}
					value={this.state.as5}
					> 
					{this.state.afcw.map((val, idx) => {
						return <MenuItem key={idx} value={val.name} primaryText={val.name} />
					})}
				</SelectField>
				<SelectField
					floatingLabelText="AFC Seed 6"
					onChange={this.handleChange.bind(this, "as6")}
					value={this.state.as6}
					> 
					{this.state.afcw.map((val, idx) => {
						if(val.name !== this.state.as5) {
							return <MenuItem key={idx} value={val.name} primaryText={val.name} />
						}
					})}
				</SelectField>
				
				</div>
				<div className="nfc-seed-select">
				<SelectField
					floatingLabelText="NFC Seed 1"
					onChange={this.handleChange.bind(this, "ns1")}
					value={this.state.ns1}
					>
					{this.state.nfc.map((val, idx) => {
						return <MenuItem key={idx} value={val.name} primaryText={val.name} />
					})}
        		</SelectField>
				<SelectField
					floatingLabelText="NFC Seed 2"
					onChange={this.handleChange.bind(this, "ns2")}
					value={this.state.ns2}
					> 
					{this.state.nfc2.map((val, idx) => {
						return <MenuItem key={idx} value={val.name} primaryText={val.name} />
					})}
				</SelectField>
				<SelectField
					floatingLabelText="NFC Seed 3"
					onChange={this.handleChange.bind(this, "ns3")}
					value={this.state.ns3}
					> 
					{this.state.nfc3.map((val, idx) => {
						return <MenuItem key={idx} value={val.name} primaryText={val.name} />
					})}
				</SelectField>
				<br />
				<SelectField
					floatingLabelText="NFC Seed 4"
					onChange={this.handleChange.bind(this, "ns4")}
					value={this.state.ns4}
					> 
					{this.state.nfc4.map((val, idx) => {
						return <MenuItem key={idx} value={val.name} primaryText={val.name} />
					})}
				</SelectField>
				<SelectField
					floatingLabelText="NFC Seed 5"
					onChange={this.handleChange.bind(this, "ns5")}
					value={this.state.ns5}
					> 
					{this.state.nfcw.map((val, idx) => {
						return <MenuItem key={idx} value={val.name} primaryText={val.name} />
					})}
				</SelectField>
				<SelectField
					floatingLabelText="NFC Seed 6"
					onChange={this.handleChange.bind(this, "ns6")}
					value={this.state.ns6}
					> 
					{this.state.nfcw.map((val, idx) => {
						if(val.name !== this.state.ns5) {
							return <MenuItem key={idx} value={val.name} primaryText={val.name} />
						}
					})}
				</SelectField>
				</div>
				<hr />
				<div style={{paddingTop: "20px"}}>
				<SelectField
					floatingLabelText="AFC Game 1"
					onChange={this.handlePick.bind(this, "awinner1")}
					value={this.state.awinner1}
					> 
					<MenuItem value={this.state.as4} primaryText={this.state.as4} />
					<MenuItem value={this.state.as5} primaryText={this.state.as5} />
				</SelectField>
				<SelectField
					floatingLabelText="AFC Game 2"
					onChange={this.handlePick.bind(this, "awinner2")}
					value={this.state.awinner2}
					> 
					<MenuItem value={this.state.as3} primaryText={this.state.as3} />
					<MenuItem value={this.state.as6} primaryText={this.state.as6} />
				</SelectField>
				<SelectField
					floatingLabelText="AFC Game 3"
					onChange={this.handlePick.bind(this, "awinner3")}
					value={this.state.awinner3}
					> 
					<MenuItem value={this.state.as1} primaryText={this.state.as1} />
					<MenuItem value={this.state.awinner1} primaryText={this.state.awinner1} />
				</SelectField>
				<SelectField
					floatingLabelText="AFC Game 4"
					onChange={this.handlePick.bind(this, "awinner4")}
					value={this.state.awinner4}
					> 
					<MenuItem value={this.state.as2} primaryText={this.state.as2} />
					<MenuItem value={this.state.awinner2} primaryText={this.state.awinner2} />
				</SelectField>
				<SelectField
					floatingLabelText="AFC Game 5"
					onChange={this.handlePick.bind(this, "awinner5")}
					value={this.state.awinner5}
					> 
					<MenuItem value={this.state.awinner3} primaryText={this.state.awinner3} />
					<MenuItem value={this.state.awinner4} primaryText={this.state.awinner4} />
				</SelectField>
				<br />
				<SelectField
					floatingLabelText="NFC Game 1"
					onChange={this.handlePick.bind(this, "nwinner1")}
					value={this.state.nwinner1}
					> 
					<MenuItem value={this.state.ns4} primaryText={this.state.ns4} />
					<MenuItem value={this.state.ns5} primaryText={this.state.ns5} />
				</SelectField>
				<SelectField
					floatingLabelText="NFC Game 2"
					onChange={this.handlePick.bind(this, "nwinner2")}
					value={this.state.nwinner2}
					> 
					<MenuItem value={this.state.ns3} primaryText={this.state.ns3} />
					<MenuItem value={this.state.ns6} primaryText={this.state.ns6} />
				</SelectField>
				<SelectField
					floatingLabelText="NFC Game 3"
					onChange={this.handlePick.bind(this, "nwinner3")}
					value={this.state.nwinner3}
					> 
					<MenuItem value={this.state.ns1} primaryText={this.state.ns1} />
					<MenuItem value={this.state.nwinner1} primaryText={this.state.nwinner1} />
				</SelectField>
				<SelectField
					floatingLabelText="NFC Game 4"
					onChange={this.handlePick.bind(this, "nwinner4")}
					value={this.state.nwinner4}
					> 
					<MenuItem value={this.state.ns2} primaryText={this.state.ns2} />
					<MenuItem value={this.state.nwinner2} primaryText={this.state.nwinner2} />
				</SelectField>
				<SelectField
					floatingLabelText="NFC Game 5"
					onChange={this.handlePick.bind(this, "nwinner5")}
					value={this.state.nwinner5}
					> 
					<MenuItem value={this.state.nwinner3} primaryText={this.state.nwinner3} />
					<MenuItem value={this.state.nwinner4} primaryText={this.state.nwinner4} />
				</SelectField>
				<br />
				<SelectField
					floatingLabelText="Super Bowl"
					onChange={this.handlePick.bind(this, "superbowlwinner")}
					value={this.state.superbowlwinner}
					> 
					<MenuItem value={this.state.nwinner5} primaryText={this.state.nwinner5} />
					<MenuItem value={this.state.awinner5} primaryText={this.state.awinner5} />
				</SelectField>
				<hr />
				<br />
				<div>
					<Bracket layout={layout} participants={participants} getParticipant={getParticipant}/>
				</div>
				{/*
				<div className="Round1 AFC" style={{float: 'left', width: 'auto', padding: '10px'}}>
				<p style={{fontWeight: 800}}> Round 1 AFC</p>

					{this.state.as3}
					<p style={{fontWeight: 800}}> vs. </p>
					{this.state.as6}
					<br />
					<br />
					{this.state.as4}
					<p style={{fontWeight: 800}}> vs. </p>
					{this.state.as5}
				</div>
				<div className="Round2 AFC" style={{float: 'left', padding: '10px'}}>
				<p style={{fontWeight: 800}}> Round 2 AFC</p>
					{this.state.as1}
					<p style={{fontWeight: 800}}> vs. </p>
					{this.state.awinner1}
					<br />
					<br />
					{this.state.as2}
					<p style={{fontWeight: 800}}> vs. </p>
					{this.state.awinner2}
				</div>
				<div className="Round3 AFC" style={{float: 'left', padding: '10px'}}>
				<p style={{fontWeight: 800}}> Round 3 AFC</p>
					{this.state.awinner3}
					<p style={{fontWeight: 800}}> vs. </p>
					{this.state.awinner4}
				</div>
				<div className="Round3" style={{float: 'left', padding: '10px'}}>
				<p style={{fontWeight: 800}}> Super Bowl </p>
					{this.state.awinner5}
					<p style={{fontWeight: 800}}> vs. </p>
					{this.state.nwinner5}
				</div>
				<div className="Round3 NFC" style={{float: 'left', padding: '10px'}}>
				<p style={{fontWeight: 800}}> Round 3 NFC</p>
					{this.state.nwinner3}
					<p style={{fontWeight: 800}}> vs. </p>
					{this.state.nwinner4}
				</div>
				<div className="Round2 AFC" style={{float: 'left', padding: '10px'}}>
				<p style={{fontWeight: 800}}> Round 2 NFC</p>
					{this.state.ns1}
					<p style={{fontWeight: 800}}> vs. </p>
					{this.state.nwinner1}
					<br />
					<br />
					{this.state.ns2}
					<p style={{fontWeight: 800}}> vs. </p>
					{this.state.nwinner2}
				</div>
				<div className="Round1 AFC" style={{float: 'left', width: 'auto', padding: '10px'}}>
				<p style={{fontWeight: 800}}> Round 1 NFC</p>

					{this.state.ns3}
					<p style={{fontWeight: 800}}> vs. </p>
					{this.state.ns6}
					<br />
					<br />
					{this.state.ns4}
					<p style={{fontWeight: 800}}> vs. </p>
					{this.state.ns5}
				</div>
		*/}

			</div>
			</div>
		}
		// if(this.state.afc2 !== []) {
		// 	afcseed2 = <SelectField
		// 			floatingLabelText="AFC Seed 1"
		// 			onChange={this.handleChange.bind(this, "as2")}
		// 			value={this.state.as2}
		// 			> {this.state.afc2.map((val, idx) => {
		// 				return <MenuItem key={idx} value={val.name} primaryText={val.name} />
		// 			})}
		// 			</SelectField>
		// } else {
		// 	afcseed2 = <div></div>
		// }

		return (
			<div> {display} </div>
		)
	}
}

export default Playoffs;