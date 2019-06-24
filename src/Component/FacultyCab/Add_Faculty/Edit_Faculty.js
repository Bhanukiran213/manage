import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { TextField, Card } from '@material-ui/core';
import { updateFaculty, getFaculty } from '../../../actions/facultyActions';
import './App.css';
import { Link } from 'react-router-dom';
import purple from '@material-ui/core/colors/purple';

import axios from 'axios';
const styles = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 390,
		paddingLeft: '0px',
		fontFamily: 'ubuntu',
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
		float: 'left',
		position: 'relative',
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
		float: 'left',
		margin: theme.spacing.unit,
		borderRadius: '0px',
		color: 'white',
		textTransform: 'capitalize',
		boxShadow: '0px 9px 0px 0px',
		background: '#7cbb42',
		'&:hover': {
			backgroundColor: '#87d045'
		}
	},
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
	facultyIcon: {
		float: 'left',
		position: 'relative',
		height: 200,
		width: 200,
		marginTop: 50,
		borderRadius: '0px',
		border: '1px solid #0000001f',
		boxShadow: '0px 0px 0px 0px',
		marginRight: '10px',
		background: '#fafafa'
	},
	cssLabel: {
		color: '#333',
		marginTop: -5,
		fontSize: 12,
		'&$cssFocused': {
			color: purple[500],
			fontSize: 14,
			borderRadius: '0px',
			marginTop: 2,
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
			file: '',
			showPassword: false,
			profession: '',
			mobile_no: '',
			description: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getFaculty(this.props.match.params.id);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
		if (nextProps.faculty.faculty) {
			const faculty = nextProps.faculty.faculty;
			this.setState({
				faculty_id: faculty.faculty_id,
				first_name: faculty.first_name,
				last_name: faculty.last_name,
				username: faculty.username,
				password: faculty.password,
				profession: faculty.profession,
				mobile_no: faculty.mobile_no,
				description: faculty.description,
				file: faculty.file
			});
		}
	}

	onSubmit(e) {
		const { faculty } = this.props.faculty;
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', this.state.file[0]);
		console.log(this.state.file.length);
		if (this.state.file.length === 1) {
			axios
				.post(`/api/faculty/upload/o`, formData, {
					headers: {}
				})
				.then((response) => {
					this.setState({ file: response.data.name });
					const bookData = {
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
					this.props.updateFaculty(this.props.match.params.id, bookData, this.props.history);
					this.props.history.push('/Faculty');
				});
		} else {
			this.setState({ file: faculty.file });
		}
		const bookData = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			faculty_id: this.state.faculty_id,
			profession: this.state.profession,
			password: this.state.password,
			mobile_no: this.state.mobile_no,
			username: this.state.username,
			description: this.state.description,

			file: faculty.file
		};
		this.props.updateFaculty(this.props.match.params.id, bookData, this.props.history);
		this.props.history.push('/Faculty');
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleChange_password = (prop) => (event) => {
		this.setState({ [prop]: event.target.value });
	};

	handleClickShowPassword = () => {
		this.setState((state) => ({ showPassword: !state.showPassword }));
	};

	handleFileUpload = (event) => {
		this.setState({ file: event.target.files });
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
		const fieldtext = {
			width: 350
		};
		const { faculty } = this.props.faculty;
		const { errors } = this.state;

		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav}>
						<li class="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li class="breadcrumb-item">
							<Link to="/faculty">Add Faculty</Link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							Edit Faculty
						</li>
					</ol>
				</nav>
				<Card className={classes.facultyIcon}>
					<img src={`https://s3.ap-south-1.amazonaws.com/static-serve/${faculty.file}`} />
				</Card>
				<Card className={classes.CardContainer}>
					<form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit} error>
						<input type="hidden" name="faculty_id" value={this.state.faculty_id} />
						<TextField
							label="Edit First Name"
							className={classes.textField}
							name="first_name"
							type="first_name"
							value={this.state.first_name}
							onChange={this.onChange}
							error={errors.first_name}
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
							label="Edit Last Name"
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
							label="Edit Email Address"
							className={classes.textField}
							name="username"
							type="email"
							value={this.state.username}
							onChange={this.onChange}
							error={errors.email}
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
							label="Enter password"
							className={classes.textField}
							name="password"
							type="password"
							value={this.state.password}
							onChange={this.onChange}
							error={errors.password}
							autoComplete="password"
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
							id="outlined-dense"
							label="Enter Your Mobile Numbers"
							className={classNames(classes.textField, classes.dense)}
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
							id="outlined-dense"
							label="Enter Your Profession"
							className={classNames(classes.textField, classes.dense)}
							name="profession"
							type="profession"
							value={this.state.profession}
							onChange={this.onChange}
							error={errors.profession}
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
							id="outlined-multiline-static"
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
							Update
						</button>
						<button id="btnchip_cancel" className={classes.button_}>
							Cancel
						</button>
					</form>
					<div />
				</Card>
			</div>
		);
	}
}

OutlinedTextFields.propTypes = {
	classes: PropTypes.object.isRequired,
	updateFaculty: PropTypes.func.isRequired,
	faculty: PropTypes.object.isRequired,
	getFaculty: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	faculty: state.faculty,
	errors: state.errors
});
export default connect(mapStateToProps, { updateFaculty, getFaculty })(withStyles(styles)(OutlinedTextFields));
