import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { TextField, Card } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import { addFaculty, getFacultyid, clearErrors } from '../../../actions/facultyActions';
import { connect } from 'react-redux';
import './App.css';
import { Link } from 'react-router-dom';
var addZero = require('add-zero');
var replace = require('str-replace');

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 390,
		float: 'left',
		height: 40
	},
	resize: {
		fontSize: 50
	},
	menu: {
		width: 500
	},
	button: {
		textTransform: 'capitalize',
		margin: theme.spacing.unit,
		borderRadius: '0px',
		boxShadow: '0px 9px 0px 0px',
		backgroundColor: '#19212b',
		'&:hover': {
			textDecoration: 'none',
			backgroundColor: '#44474c'
		}
	},
	button_: {
		fontFamily: 'Ubuntu',
		margin: theme.spacing.unit,
		borderRadius: '0px',
		textTransform: 'capitalize',
		boxShadow: '0px 9px 0px 0px',
		background: '#7cbb42',
		'&:hover': {
			backgroundColor: '#87d045'
		}
	},
	input: {},
	CardContainer: {
		width: 450,
		padding: 20,
		marginTop: 50,
		float: 'left',
		borderRadius: '0px',
		border: '1px solid #0000001f',
		boxShadow: '0px 0px 0px 0px'
	},
	margin: {
		margin: theme.spacing.unit
	},
	cssLabel: {
		color: '#333',
		marginTop: -5,
		fontSize: 12,
		'&$cssFocused': {
			color: purple[500],
			fontSize: 14,
			borderRadius: '0px',
			marginTop: -5,
			padding: 10
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

class OutlinedTextFields extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			faculty_id: '',
			first_name: '',
			last_name: '',
			username: '',
			password: '',
			profession: '',
			mobile_no: '',
			description: '',
			file: '',
			errors: {},
			showPassword: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getFacultyid();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.faculty.faculty) {
			const faculty = nextProps.faculty.faculty;
			console.log(faculty.length);
			if (faculty.length == 0) {
				this.setState({ faculty_id: 'FAC096' });
			} else {
				const b = faculty[0];
				var fid = b.faculty_id;
				var target = fid;
				var occurrences = 'FAC';
				var replacement = '';
				var result = replace.all(occurrences).ignoringCase().from(target).with(replacement);
				var r = +result + +1;
				r = addZero(r, 3);
				var t = 'FAC' + r;
				this.setState({ faculty_id: t });
			}
		}
	}

	componentWillUnmount() {
		this.props.clearErrors();
	}

	onSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', this.state.file[0]);
		if (this.state.file.length == 1) {
			axios
				.post(`/api/faculty/upload/o`, formData, {
					headers: {}
				})
				.then((response) => {
					console.log(response.data.name);
					// console.log(this.state.file[0].name);
					this.setState({ file: response.data.name });
					console.log(this.state.file);
				});
			const newBook = {
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				faculty_id: this.state.faculty_id,
				profession: this.state.profession,
				password: this.state.password,
				mobile_no: this.state.mobile_no,
				username: this.state.username,
				description: this.state.description,
				file: this.state.file[0].name
			};

			this.props.addFaculty(newBook, this.props.history);
		} else {
			const newBook = {
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				faculty_id: this.state.faculty_id,
				profession: this.state.profession,
				password: this.state.password,
				mobile_no: this.state.mobile_no,
				username: this.state.username,
				description: this.state.description,
				file: this.state.file
			};
			console.log(this.state.file);
			this.props.addFaculty(newBook, this.props.history);
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleChange_password = (prop) => (event) => {
		this.setState({ [prop]: event.target.value });
	};
	handleClickShowPassword = () => {
		this.setState((state) => ({ showPassword: !state.showPassword }));
	};

	handleFileUpload = (event) => {
		this.setState({ file: event.target.files });
		console.log(this.state.file);
	};
	render() {
		const { classes } = this.props;
		const nav = {
			background: '#fafafa',
			borderRadius: '0px',
			textAlign: 'left',
			padding: '20px 0px',
			marginTop: '-50px',
			borderBottom: '1px solid #e6e3e3'
		};
		const { errors } = this.state;

		return (
			<div>
				<ol class="breadcrumb" style={nav}>
					<li class="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li class="breadcrumb-item">
						<Link to="/Faculty">Add Faculty</Link>
					</li>
					<li class="breadcrumb-item active" aria-current="page">
						Create Faculty
					</li>
				</ol>

				<Card className={classes.CardContainer}>
					<form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit} error>
						<input type="hidden" name="faculty_id" value={this.state.faculty_id} />

						<TextField
							id="idnew"
							label="Enter First Name"
							className={classes.textField}
							name="first_name"
							type="first_name"
							value={this.state.first_name}
							onChange={this.onChange}
							error={errors.first_name}
							radius={false}
							variant="outlined"
							margin="normal"
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
						/>
						<TextField
							id="idnew"
							label="Enter Last Name"
							className={classes.textField}
							name="last_name"
							type="last_name"
							value={this.state.last_name}
							onChange={this.onChange}
							error={errors.last_name}
							autoComplete="text"
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
						/>
						<TextField
							id="idnew"
							label="Enter Your password"
							className={classes.textField}
							name="password"
							type="text"
							value={this.state.password}
							onChange={this.onChange}
							error={errors.last_name}
							autoComplete="text"
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
						/>
						<TextField
							id="idnew"
							label="Enter Your Email Address"
							className={classes.textField}
							name="username"
							type="email"
							value={this.state.username}
							onChange={this.onChange}
							error={errors.username}
							autoComplete="email"
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
						/>
						<TextField
							id="idnew"
							label="Enter Your Mobile Numbers"
							className={classes.textField}
							name="mobile_no"
							type="mobile_no"
							value={this.state.mobile_no}
							onChange={this.onChange}
							error={errors.mobile_no}
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
						/>
						<TextField
							id="idnew"
							variant="outlined"
							label="Enter Your Profession"
							className={classes.textField}
							name="profession"
							type="profession"
							value={this.state.profession}
							onChange={this.onChange}
							error={errors.profession}
							margin="normal"
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
						/>
						<TextField
							id="idnew"
							label="Short Description"
							multiline
							rows="4"
							name="description"
							type="description"
							value={this.state.description}
							onChange={this.onChange}
							error={errors.description}
							className={classes.textField}
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
						/>
						<TextField
							id="outlined-email-input"
							className={classes.textField}
							onChange={this.handleFileUpload}
							type="file"
							name="file"
							autoComplete="text"
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
						/>
						<button type="submit" id="btnchip" className={classes.button_}>
							Submit
						</button>
						<Link to="/Faculty" style={{ textDecoration: 'none' }}>
							{' '}
							<button id="btnchip_cancel">Cancel</button>
						</Link>
					</form>
					<div />
				</Card>
			</div>
		);
	}
}

OutlinedTextFields.propTypes = {
	classes: PropTypes.object.isRequired,
	addfaculty: PropTypes.func.isRequired,
	getFacultyid: PropTypes.func.isRequired,
	faculty: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	faculty: state.faculty,
	errors: state.errors
});

export default connect(mapStateToProps, { addFaculty, getFacultyid, clearErrors })(
	withStyles(styles)(OutlinedTextFields)
);
