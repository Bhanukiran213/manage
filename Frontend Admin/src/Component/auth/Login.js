import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import purple from '@material-ui/core/colors/purple';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './App.css';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

const styles = (theme) => ({
	paper: {
		width: 400,
		marginTop: theme.spacing.unit * 8,
		marginLeft: 'auto',
		marginRight: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: '0px',
		border: '1px solid #0000001f',
		boxShadow: '0px 0px 0px 0px',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing.unit
	},
	submit: {
		border: '1px solid #0000001f',
		boxShadow: '0px 0px 0px 0px',
		marginTop: theme.spacing.unit * 5
	},
	margin: {
		margin: theme.spacing.unit,
		height: 40,
		borderRadius: '0px',
		marginTop: 10
	},
	cssLabel: {
		color: '#444',
		marginTop: -5,
		fontSize: 12,

		'&$cssFocused': {
			color: purple[500],
			fontSize: 14,
			borderRadius: '0px',
			marginTop: -2,
			padding: 10
		}
	},
	cssFocused: {
		'border-radius': '0px',
		color: '#111'
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

class InputAdornments extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			password: '',
			amount: '',
			weight: '',
			weightRange: '',
			showPassword: false,
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/');
		}
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const userData = {
			name: this.state.name,
			password: this.state.password
		};
		this.props.loginUser(userData);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleChange = (prop) => (event) => {
		this.setState({ [prop]: event.target.value });
	};

	handleClickShowPassword = () => {
		this.setState((state) => ({ showPassword: !state.showPassword }));
	};

	render() {
		const { classes } = this.props;
		const { errors } = this.state;
		return (
			<body>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} onSubmit={this.onSubmit} error>
						<TextField
							isRequired
							label="Email"
							style={{ width: 330 }}
							className={classes.margin}
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
							type="name"
							name="name"
							autoComplete="email"
							value={this.state.name}
							onChange={this.onChange}
							error={errors.name}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							isRequired
							style={{ width: 330 }}
							id="outlined-adornment-password"
							className={classes.margin}
							InputLabelProps={{
								classes: {
									root: classes.cssLabel,
									focused: classes.cssFocused
								}
							}}
							variant="outlined"
							type={this.state.showPassword ? 'text' : 'password'}
							label="Password"
							value={this.state.password}
							onChange={this.handleChange('password')}
							InputProps={{
								classes: {
									root: classes.cssOutlinedInput,
									focused: classes.cssFocused,
									notchedOutline: classes.notchedOutline
								},
								endAdornment: (
									<InputAdornment style={{ marginRight: -10 }} position="end">
										<IconButton
											aria-label="Toggle password visibility"
											onClick={this.handleClickShowPassword}
										>
											{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								)
							}}
						/>
						<FormControlLabel
							style={{ marginTop: -35, marginLeft: -5 }}
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button type="submit" variant="contained" color="primary" className={classes.submit}>
							Sign in
						</Button>
					</form>
				</Paper>
			</body>
		);
	}
}

InputAdornments.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { loginUser })(withStyles(styles)(InputAdornments));
