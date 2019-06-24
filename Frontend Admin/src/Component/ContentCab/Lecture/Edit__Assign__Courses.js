import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';

const helpde = {
	width: 550,
	height: 450,
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

const names = [
	'Oliver Hansen',
	'Van Henry',
	'April Tucker',
	'Ralph Hubbard',
	'Omar Alexander',
	'Carlos Abbott',
	'Miriam Wagner',
	'Bradley Wilkerson',
	'Virginia Andrews',
	'Kelly Snyder'
];

function getStyles(name, that) {
	return {
		fontWeight:
			that.state.name.indexOf(name) === -1
				? that.props.theme.typography.fontWeightRegular
				: that.props.theme.typography.fontWeightMedium
	};
}

class MultipleSelect extends React.Component {
	state = {
		name: [],
		value_: 0
	};

	handleChange = (event) => {
		this.setState({ name: event.target.value });
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
		return (
			<div>
				<Card style={helpde}>
					<div className={classes.root}>
						<h4>Course assign to Introduction - Approach to costing & Basics of costing</h4>

						<TextField
							id="outlined-email-input"
							label="Faculty Name"
							className={classes.textField}
							type="text"
							name="text"
							autoComplete="text"
							margin="normal"
							variant="outlined"
						/>

						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="select-multiple-chip" placeholder="Select Your Lecture PlayList">
								Course
							</InputLabel>
							<Select
								className={classes.Wdirai}
								multiple
								value={this.state.name}
								onChange={this.handleChange}
								input={<Input id="select-multiple-chip" />}
								renderValue={(selected) => (
									<div className={classes.chips}>
										{selected.map((value) => (
											<Chip key={value} label={value} className={classes.chip} />
										))}
									</div>
								)}
								MenuProps={MenuProps}
							>
								{names.map((name) => (
									<MenuItem key={name} value={name} style={getStyles(name, this)}>
										{name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="age-simple">Chapter</InputLabel>
							<Select
								value={this.state.age}
								onChange={this.handleChange}
								inputProps={{
									name: 'age',
									id: 'age-simple'
								}}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>

						<div>
							{' '}
							<Button variant="contained" color="primary" id="btnpo" className={classes.button}>
								Submit
							</Button>
						</div>
					</div>
				</Card>
			</div>
		);
	}
}

MultipleSelect.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
