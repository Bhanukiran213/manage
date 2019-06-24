import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import './App.css';
import CheckboxTree from 'react-checkbox-tree';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import { registerUser } from '../../actions/authActions';
const nodes = [
	{
		value: 'Faculty Cab',
		label: 'Faculty Cab',
		icon: <i class="fas fa-chalkboard-teacher" />,

		children: [
			{
				value: 'Add Faculty',
				label: 'Add Fcualty'
			},
			{
				value: 'Assign Course',
				label: 'Assign Course'
			},
			{
				value: 'Booking List',
				label: 'Booking List'
			}
		]
	},
	{
		value: 'Content Cab',
		label: 'Content Cab',
		icon: <i class="fas fa-video" />,
		children: [
			{
				value: 'Add Play List',
				label: 'Add Play List'
			},
			{
				value: 'Add Lecture',
				label: 'Add Lecture'
			}
		]
	},

	{
		value: 'Package Cab',
		label: 'Package Cab',
		icon: <i className="fas fa-box" />,
		children: [
			{
				value: 'Credit Value',
				label: 'Credit Value'
			},
			{
				value: 'Demo Package',
				label: 'Demo Package'
			},
			{
				value: 'Add Package',
				label: 'Add Package'
			},
			{
				value: 'Top up',
				label: 'Top Up'
			},
			{
				value: 'Refund Add',
				label: 'Refund Add'
			},
			{
				value: 'Add Promo Coupon',
				label: 'Add Promo Coupon'
			},
			{
				value: 'SalesForce Coupon',
				label: 'SalesForce Coupon'
			}
		]
	},
	{
		value: 'Student Cab',
		label: 'Student Cab',
		icon: <i class="fas fa-graduation-cap" />,
		children: [
			{
				value: 'Student List',
				label: 'Student List'
			},
			{
				value: 'Q & A',
				label: 'Q & A'
			}
		]
	},
	{
		value: 'Sub Admin Cab',
		label: 'Sub Admin Cab',
		icon: <i class="fas fa-users" />,
		children: [
			{
				value: 'Sub Admin ',
				label: 'Sub Admin'
			}
		]
	},
	{
		value: 'Setting Cab',
		label: 'Setting Cab',
		icon: <i class="fas fa-cogs" />,
		children: [
			{
				value: 'Studio List',
				label: 'Studio List'
			},
			{
				value: 'Time Slot',
				label: 'Time Slot'
			},
			{
				value: 'Project Setting',
				label: 'Project Setting'
			}
		]
	},
	{
		value: 'Newsletter Cab',
		label: 'Newsletter Cab',
		icon: <i class="fas fa-newspaper" />,
		children: [
			{
				value: 'Newsletter',
				label: 'Newsletter'
			}
		]
	},
	{
		value: 'Support Cab',
		label: 'Support Cab',
		icon: <i class="fas fa-question-circle" />,
		children: [
			{
				value: 'Faculty Feedback',
				label: 'Faculty Feedback'
			},
			{
				value: 'Student Feedback',
				label: 'Student Feedback'
			}
		]
	}
];

const styles = (theme) => ({
	container: {},
	textField: {
		float: 'left',
		width: 400
	},
	dense: {
		marginTop: 16
	},
	menu: {
		width: 500
	},
	button: {
		margin: '0 auto',
		float: 'left'
	},
	input: {
		display: 'none'
	}
});
const part = {
	width: 500,
	float: 'left',
	padding: 20,
	marginRight: 20,
	borderRadius: '0px',
	border: '1px solid #0000001f',
	boxShadow: '0px 0px 0px 0px'
};
const checkbocne = {
	color: '#222'
};

const cardpart = {
	width: 325,
	float: '',
	position: 'relative',
	padding: 40,
	borderRadius: '0px',
	border: '1px solid #0000001f',
	boxShadow: '0px 0px 0px 0px'
};

const btn = {
	float: 'left',
	marginTop: 20,
	'margin-left': '20%'
};
const nav = {
	background: '#fafafa',
	borderRadius: '0px',
	textAlign: 'left',
	padding: '20px 0px',
	marginTop: '-50px',
	borderBottom: '1px solid #e6e3e3'
};

class OutlinedTextFields extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			password: '',
			role: [],
			age: '',
			multiline: '',
			value: 'female',
			checked: [],
			expanded: [],
			showExpandAll: true,
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleChange = (event) => {
		console.log(event);
		this.setState({ role: event.target.value });
	};
	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			password: this.state.password,
			username: this.state.username,
			mobile_no: this.state.mobile_no,
			permissions: this.state.checked,
			role: this.state.role
		};

		this.props.registerUser(newUser, this.props.history);
		this.props.history.push('/__Sub__Admin__');
	}

	handleChange = (event) => {
		console.log(event);
		this.setState({ role: event.target.value });
	};

	render() {
		const { classes } = this.props;
		console.log(this.state.checked);
		const { errors } = this.state;
		console.log(this.state.role);
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav}>
						<li class="breadcrumb-item">
							<a href="#">Home</a>
						</li>
						<li class="breadcrumb-item">
							<a href="#">Sub Admin List</a>
						</li>

						<li class="breadcrumb-item active" aria-current="page">
							Create Sub Admin{' '}
						</li>
					</ol>
				</nav>
				<Card style={part}>
					<div>
						<form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit}>
							<div className="TextField-without-field-top-border-radius fieldset">
								<TextField
									label="Enter Your Full Name"
									className={classes.textField}
									type="text"
									name="name"
									value={this.state.name}
									onChange={this.onChange}
									error={errors.name}
									autoComplete="text"
									margin="normal"
									variant="outlined"
								/>

								<TextField
									id="outlined-email-input"
									label="Enter Your Email Address"
									className={classes.textField}
									type="email"
									name="username"
									value={this.state.username}
									onChange={this.onChange}
									error={errors.username}
									autoComplete="email"
									margin="normal"
									variant="outlined"
								/>
								<TextField
									id="outlined-password-input"
									label="Password"
									className={classes.textField}
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
									autoComplete="current-password"
									margin="normal"
									variant="outlined"
								/>

								<TextField
									id="outlined-dense"
									label="Enter Your Mobile Numbers"
									type="number"
									name="mobile_no"
									value={this.state.mobile_no}
									onChange={this.onChange}
									error={errors.mobile_no}
									className={classNames(classes.textField, classes.dense)}
									margin="dense"
									variant="outlined"
								/>
								<TextField
									id="outlined-select-currency"
									select
									label="Select Role"
									className={classes.textField}
									style={{ height: 40 }}
									value={this.state.role}
									onChange={this.handleChange}
									name="course_id"
									SelectProps={{
										MenuProps: {
											className: classes.menu
										}
									}}
									margin="normal"
									variant="outlined"
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
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>

									<MenuItem value="Superadmin">Superadmin</MenuItem>
									<MenuItem value="Admin">Admin</MenuItem>
									<MenuItem value="User">User</MenuItem>
								</TextField>
							</div>
							<button id="_btnchip" type="submit" style={btn}>
								Submit
							</button>
						</form>
						<div />
					</div>
				</Card>
				{this.state.role == 'Superadmin' ? null : (
					<Card style={cardpart}>
						<Typography> Permissions *</Typography>
						<FormGroup style={checkbocne} col>
							<CheckboxTree
								value={this.state.value}
								onChange={this.handleChange}
								nodes={nodes}
								checked={this.state.checked}
								expanded={this.state.expanded}
								onCheck={(checked) => this.setState({ checked })}
								onExpand={(expanded) => this.setState({ expanded })}
							/>
						</FormGroup>
					</Card>
				)}
			</div>
		);
	}
}

OutlinedTextFields.propTypes = {
	classes: PropTypes.object.isRequired,
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(withStyles(styles)(OutlinedTextFields));
