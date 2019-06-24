import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';
//import './App.css'
const helpde = {
	width: 550,
	height: 230,
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
		//const { value_ } = this.state;
		const nav = { background: 'white' };
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb" style={nav}>
						<li className="breadcrumb-item">
							<a href="#">Home</a>
						</li>

						<li className="breadcrumb-item">
							<a href="#">All Courses List</a>
						</li>

						<li className="breadcrumb-item active" aria-current="page">
							Add Course{' '}
						</li>
					</ol>
				</nav>
				<Card style={helpde}>
					<div>
						<div className={classes.root}>
							<TextField
								id="outlined-email-input"
								label="Add Courses"
								className={classes.textField}
								type="text"
								name="text"
								autoComplete="text"
								margin="normal"
								variant="outlined"
							/>
						</div>
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
