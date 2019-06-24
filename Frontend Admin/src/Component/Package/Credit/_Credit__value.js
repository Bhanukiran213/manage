import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import purple from '@material-ui/core/colors/purple';

import { Link } from 'react-router-dom';
import { getCredits, addCredit, updateCreditStatus, clearErrors } from '../../../actions/creditActions';
import { Switch } from '@material-ui/core';
import './App.css';
const tablecolor = {
	color: '#464646',
	fontWeight: 600,
	fontFamily: 'ubuntu',
	border: '1px solid rgb(230, 227, 227)'
};

const nav = {
	background: '#fafafa',
	borderRadius: '0px',
	textAlign: 'left',
	padding: '20px 0px',
	marginTop: '-50px',
	borderBottom: '1px solid #e6e3e3'
};
const styles = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing.unit,

		fontFamily: 'ubuntu',
		fontSize: 12,
		height: 35,
		backgroundColor: 'none'
	},
	dense: {
		marginTop: 16
	},
	menu: {
		width: 200
	},
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto'
	},
	tablebody: {
		background: 'white',
		fontSize: 12,
		fontFamily: 'ubuntu',
		padding: 0
	},
	table: {
		background: '#f1f1f1'
	},
	colorSwitchBase: {
		color: '#7cbb42',
		'&$colorChecked': {
			color: '#7cbb42',
			'& + $colorBar': {
				backgroundColor: '#7cbb42'
			}
		}
	},
	colorBar: {},
	colorChecked: {},

	cssLabel: {
		color: '#333',
		marginTop: -5,
		fontSize: 12,

		'&$cssFocused': {
			color: purple[500],
			fontSize: 14,
			borderRadius: '0px'
		}
	},
	cssFocused: {
		'border-radius': '0px',
		color: '#222'
	},
	cssUnderline: {
		'&:after': {
			borderBottomColor: purple[500],
			'border-radius': '0px'
		}
	},
	cssOutlinedInput: {
		'&$cssFocused $notchedOutline': {
			borderColor: purple[500],
			'border-radius': '0px'
		}
	},
	notchedOutline: { 'border-radius': '0px' }
});

const btn = {
	marginLeft: 10,
	marginTop: 3,
	height: 33
};

class FilledTextFields extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			credit_value: '',
			hours_per_credit: '',
			errors: {},
			name: 'Cat in the Hat',
			age: '',
			multiline: 'Controlled',
			currency: 'EUR'
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onUpdateClick(id) {
		this.props.updateCreditStatus(id, 2, this.props.history);
		// window.location.reload();
	}
	onUpdate1Click(id) {
		this.props.updateCreditStatus(id, 1, this.props.history);
		// window.location.reload();
	}

	onSubmit(e) {
		e.preventDefault();

		const newBook = {
			credit_value: this.state.credit_value,
			hours_per_credit: this.state.hours_per_credit
		};

		this.props.addCredit(newBook);
		this.props.history.push('/__Credit__value');
		// window.location.reload();
		this.props.clearErrors();
		this.setState({ credit_value: '' });
		this.setState({ hours_per_credit: '' });
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	componentDidMount() {
		this.props.getCredits();
		this.setState({ credits: this.props.credit });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
	};

	render() {
		const { classes } = this.props;

		const { errors } = this.state;
		const { credits } = this.props.credit;
		console.log(errors);

		const k = 1;
		for (let i = 0; i < credits.length; i++) {
			credits[i].sno = k + +i;
			console.log(credits[0].credit_value);
			console.log(k);
		}
		let filt = credits.filter((course) => {
			return course.last_updated !== undefined;
		});
		const u = filt[0];
		console.log(u);
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav}>
						<li class="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>

						<li class="breadcrumb-item active" aria-current="page">
							Credit Value
						</li>
					</ol>
				</nav>
				<div>
					<form className={classes.container} onSubmit={this.onSubmit} error autoComplete="off">
						<TextField
							InputLabelProps={{
								classes: {
									root: classes.cssLabel,
									focused: classes.cssFocused
								}
							}}
							InputProps={{
								classes: {
									root: classes.cssOutlinedInput,
									focused: classes.cssFocused,
									notchedOutline: classes.notchedOutline
								}
							}}
							style={{ marginLeft: 0, height: 35, borderRadius: 0 }}
							placeholder="Credits Per Month"
							name="credit_value"
							label="Credits Per Month"
							type="number"
							value={this.state.credit_value}
							onChange={this.onChange}
							error={errors.credit_value}
							variant="outlined"
						/>
						<TextField
							InputLabelProps={{
								classes: {
									root: classes.cssLabel,
									focused: classes.cssFocused
								}
							}}
							InputProps={{
								classes: {
									root: classes.cssOutlinedInput,
									focused: classes.cssFocused,
									notchedOutline: classes.notchedOutline
								}
							}}
							style={{ marginLeft: 10, height: 35 }}
							placeholder="Hours per Credit"
							name="hours_per_credit"
							type="number"
							label="Hours per Credit"
							value={this.state.hours_per_credit}
							onChange={this.onChange}
							error={errors.hours_per_credit}
							variant="outlined"
						/>
						<button id="btnchip" type="submit" color="primary" style={btn}>
							Submit
						</button>
					</form>
				</div>

				<Table className={classes.root}>
					<TableHead className={classes.table}>
						<TableRow>
							<TableCell style={tablecolor}>S.NO</TableCell>
							<TableCell style={tablecolor}>Credits Per Month</TableCell>
							<TableCell style={tablecolor}>Hours Per Credit</TableCell>
							<TableCell style={tablecolor}>From</TableCell>
							<TableCell style={tablecolor}>To</TableCell>
							<TableCell style={tablecolor}>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tablebody}>
						{filt.map((row) => {
							return (
								<TableRow key={row._id}>
									<TableCell component="th" scope="row">
										{row.sno}
									</TableCell>
									<TableCell>{row.credit_value}</TableCell>
									<TableCell>{row.hours_per_credit}</TableCell>
									<TableCell>{row.created}</TableCell>
									<TableCell>{row.last_updated}</TableCell>
									{row.status == 1 ? (
										<TableCell>
											{' '}
											<Switch
												classes={{
													switchBase: classes.colorSwitchBase,
													checked: classes.colorChecked,
													bar: classes.colorBar
												}}
												color="default"
												style={{ color: '#7cbb42' }}
												checked={true}
												onClick={this.onUpdateClick.bind(this, row._id)}
											/>
										</TableCell>
									) : (
										<TableCell>
											{' '}
											<Switch checked={false} onClick={this.onUpdate1Click.bind(this, row._id)} />
										</TableCell>
									)}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		);
	}
}

FilledTextFields.propTypes = {
	classes: PropTypes.object.isRequired,
	getCredits: PropTypes.func.isRequired,
	credit: PropTypes.object.isRequired,
	addCredit: PropTypes.func.isRequired,
	updateCreditStatus: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	credit: state.credit,
	credits: state.credits,
	errors: state.errors
});
export default connect(mapStateToProps, { updateCreditStatus, getCredits, addCredit, clearErrors })(
	withStyles(styles)(FilledTextFields)
);
