import React from 'react';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
//import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
//import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';
//import './App.css'
import { connect } from 'react-redux';

import { updateStudio, getStudio } from '../../../actions/studioActions';
import { getTimings } from '../../../actions/timeActions';

const helpde = {
	width: 550,
	height: 300,
	padding: 20,
	float: 'left'
};

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};
const styles = (theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit,
		width: 500
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: theme.spacing.unit / 4
	},
	noLabel: {
		marginTop: theme.spacing.unit * 3
	},
	Wdirai: {
		width: 500
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		width: '100%'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 500
	},
	dense: {
		marginTop: 16
	},
	menu: {
		width: 400
	},
	button: {
		width: 200,
		height: 50,
		marginTop: 20,
		float: 'left',
		marginLeft: 150
	},
	input: {
		display: 'none'
	},
	marho: {
		width: 500
	},
	fmarho: {
		marginLeft: 20
	}
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

function getStyles(name, that) {
	return {
		fontWeight:
			that.state.name.indexOf(name) === -1
				? that.props.theme.typography.fontWeightRegular
				: that.props.theme.typography.fontWeightMedium
	};
}

class MultipleSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studio_name: '',
			timeslots: [],
			name: [],
			value_: 0,

			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getStudio(this.props.match.params.id);

		this.props.getTimings();

		//const{playlist}=this.props;
		//this.setState(this.props.playlist)
		//console.log(playlist)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.studio.studio) {
			const studio = nextProps.studio.studio;
			this.setState({
				studio_name: studio.studio_name,
				timeslots: studio.timeslots
			});
		}
	}
	onSubmit(e) {
		e.preventDefault();

		const newBook = {
			studio_name: this.state.studio_name,
			timeslots: this.state.timeslots
		};

		this.props.updateStudio(this.props.match.params.id, newBook);
		this.props.history.push('/__Studio__list');
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleChange = (event) => {
		this.setState({ timeslots: event.target.value });
	};
	handleChange_ = (event, value_) => {
		this.setState({ value_ });
	};
	handleChangeMultiple = (event) => {
		const { options } = event.target;
		const value = [];
		for (let i = 0, l = options.length; i < l; i += 1) {
			if (options[i].selected) {
				value.push(options[i].value);
			}
		}
		this.setState({
			name: value
		});
	};

	render() {
		const { classes } = this.props;
		const { value_ } = this.state;
		const nav = { background: 'white' };
		const { errors } = this.state;
		const { times } = this.props.time;
		const option2 = times.map((course) => ({ key: course._id, text: course.timings, value: course.timings }));
		console.log(option2);
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav}>
						<li class="breadcrumb-item">
							<a href="#">Home</a>
						</li>
						<li class="breadcrumb-item">
							<a href="#">Studio List</a>
						</li>

						<li class="breadcrumb-item active" aria-current="page">
							Edit Studio{' '}
						</li>
					</ol>
				</nav>
				<Card style={helpde}>
					<div>
						<div className={classes.root}>
							<form onSubmit={this.onSubmit} error>
								<TextField
									id="outlined-email-input"
									label="Studio Name"
									className={classes.textField}
									name="studio_name"
									type="text"
									value={this.state.studio_name}
									onChange={this.onChange}
									error={errors.studio_name}
									autoComplete="text"
									margin="normal"
									variant="outlined"
								/>

								<FormControl className={classes.formControl}>
									<InputLabel
										htmlFor="select-multiple-chip"
										placeholder="Select Your Lecture PlayList"
									>
										PlayList
									</InputLabel>
									<Select
										className={classes.Wdirai}
										multiple
										value={this.state.timeslots}
										onChange={this.handleChange}
										error={errors.timeslots}
										input={<Input name="timeslots" id="select-multiple-chip" />}
										renderValue={(selected) => (
											<div className={classes.chips}>
												{selected.map((value) => (
													<Chip key={value} label={value} className={classes.chip} />
												))}
											</div>
										)}
										MenuProps={MenuProps}
									>
										{option2.map((name) => (
											<MenuItem key={name.key} value={name.value} style={getStyles(name, this)}>
												{name.text}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<Button
									variant="contained"
									type="submit"
									color="primary"
									id="btnpo"
									className={classes.button}
								>
									Submit
								</Button>
							</form>
						</div>
						<div />
					</div>
				</Card>
			</div>
		);
	}
}

MultipleSelect.propTypes = {
	classes: PropTypes.object.isRequired,
	updateStudio: PropTypes.func.isRequired,
	studio: PropTypes.object.isRequired,
	getStudio: PropTypes.func.isRequired,
	getTimings: PropTypes.func.isRequired,
	time: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	studio: state.studio,
	errors: state.errors,
	time: state.time,
	times: state.times
});

export default connect(mapStateToProps, { updateStudio, getStudio, getTimings })(
	withStyles(styles, { withTheme: true })(MultipleSelect)
);
