import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import { addFeature } from '../../../actions/playlistActions';
import axios from 'axios';

import { Add } from '@material-ui/icons';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import './App.css';

const theme = createMuiTheme({
	boxSha: {
		boxShadow: 'none'
	}
});

const ho = {
	width: 500,
	marginLeft: 20,
	marginTop: 20
};

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

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
		flexWrap: 'wrap',
		boxShadow: 'none'
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
		marginTop: 40
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
		width: 500,
		height: 40
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
	},
	appBar: {
		position: 'relative',
		background: '#19212b',
		color: 'white'
	},
	flex: {
		flex: 1
	},
	DialogWidth: {
		width: 550,
		marginTop: 100,
		height: 400,
		marginLeft: '30%'
	},

	addicon: {
		width: 20,
		height: 20,
		float: 'left',
		color: 'white',
		fontSize: '18px',
		marginLeft: '0px',
		marginTop: '0px',
		padding: '0px 0px'
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

class MultipleSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			type: '',
			file: '',
			content: '',
			refid: '',
			errors: {},
			name: [],
			multiline: 'Controlled',
			value_: 0,
			open: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	submitFile = (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('file', this.state.file[0]);
		axios
			.post(`/api/features/upload/o`, formData, {
				headers: {}
			})
			.then((response) => {
				alert(response);
				console.log(this.state.file[0].name);
				this.setState({ file: this.state.file[0].name });
				console.log(this.state.file);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	onSubmit(e) {
		e.preventDefault();

		const formData = new FormData();
		formData.append('file', this.state.file[0]);
		if (this.state.file.length == 1) {
			axios
				.post(`/api/features/upload/o`, formData, {
					headers: {}
				})
				.then((response) => {
					console.log(response.data.name);
					// console.log(this.state.file[0].name);
					this.setState({ file: response.data.name });
					console.log(this.state.file);
				});
			const newBook = {
				title: this.state.title,
				type: this.state.type,
				refid: this.state.refid,
				content: this.state.content,
				file: this.state.file[0].name
			};

			this.props.addFeature(this.props.id, newBook);
			//this.props.history.push('/editplaylist/'+this.props.id);
		} else {
			const newBook = {
				title: this.state.title,
				type: this.state.type,
				refid: this.state.refid,
				content: this.state.content,
				file: this.state.file
			};

			this.props.addFeature(this.props.id, newBook);
			//this.props.history.push('/editplaylist/'+this.props.id);
		}

		this.setState({ open: false });

		this.setState({ type: '' });
		this.setState({ title: '' });
		this.setState({ refid: '' });
		this.setState({ content: '' });
		this.setState({ file: '' });
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleFileUpload = (event) => {
		this.setState({ file: event.target.files });
	};

	handleChange_dropdown = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleChange = (event) => {
		this.setState({ type: event.target.value });
	};
	handleClose = () => {
		this.setState({ open: false });
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
		console.log(this.props.id);
		var v;
		if (this.state.type == 'Video') {
			v = true;
		} else if (this.state.type == 'Quiz') {
			v = true;
		} else {
			v = false;
		}
		const { errors } = this.state;
		return (
			<div>
				<button id="btnchip" onClick={this.handleClickOpen} className={classes.chip}>
					<Add className={classes.addicon} /> Add Feature
				</button>

				<Dialog
					className={classes.DialogWidth}
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}
				>
					<form onSubmit={this.onSubmit}>
						<div className="dialog-header">
							<button type="button" id="btn_btn_Cancel_chip" onClick={this.handleClose}>
								<CloseIcon />
							</button>

							<button id="btn_btn_chip" type="submit" onClick={this.handleClose}>
								save
							</button>
						</div>

						{/* <FormControl variant="outlined" className={classes.formControl}>
    Feature 
      <Select
      label="Feature"
        value={this.state.type}
        onChange={this.handleChange_dropdown}
        input={
          <OutlinedInput
            labelWidth={this.state.labelWidth}
            style={{width:450,marginLeft:15,}}
            name="type"
            id="outlined-age-simple"
          />
        }
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'Video'} >Video</MenuItem>
        <MenuItem value={'Quiz'} >Quiz</MenuItem>
        <MenuItem value={'Examples'} >Examples</MenuItem>
        <MenuItem value={'Did You Know'} >Did you know</MenuItem>
        <MenuItem value={'Downloads'} >Downloads</MenuItem>
        <MenuItem value={'Notes'} >Notes</MenuItem>
      </Select>
    </FormControl> */}

						<TextField
							id="outlined-select-currency"
							select
							label=" Feature "
							style={{ height: 40, width: 500, marginLeft: 20 }}
							value={this.state.type}
							name="type"
							onChange={this.handleChange}
							error={errors.course}
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
							<MenuItem value={'Video'}>Video</MenuItem>
							<MenuItem value={'Quiz'}>Quiz</MenuItem>
							<MenuItem value={'Examples'}>Examples</MenuItem>
							<MenuItem value={'Did You Know'}>Did you know</MenuItem>
							<MenuItem value={'Downloads'}>Downloads</MenuItem>
							<MenuItem value={'Notes'}>Notes</MenuItem>
						</TextField>

						<TextField
							id="outlined-email-input"
							label=" Title"
							className={classes.textField}
							name="title"
							type="title"
							value={this.state.title}
							onChange={this.onChange}
							error={errors.title}
							style={ho}
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
						{v ? (
							<TextField
								id="outlined-email-input"
								label=" ReferenceId"
								className={classes.textField}
								name="refid"
								type="text"
								value={this.state.refid}
								onChange={this.onChange}
								error={errors.refid}
								style={ho}
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
						) : (
							<TextField
								id="outlined-email-input"
								className={classes.textField}
								type="file"
								onChange={this.handleFileUpload}
								style={ho}
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
						)}

						<TextField
							id="outlined-email-input"
							label="Content"
							className={classes.textField}
							multiline
							rowsMax="4"
							name="content"
							type="text"
							value={this.state.content}
							onChange={this.onChange}
							error={errors.content}
							rows="5"
							style={ho}
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
					</form>
				</Dialog>
			</div>
		);
	}
}

MultipleSelect.propTypes = {
	classes: PropTypes.object.isRequired,
	addFeature: PropTypes.func.isRequired,

	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	playlist: state.playlist,
	errors: state.errors
});
export default connect(mapStateToProps, { addFeature })(withStyles(styles, { withTheme: true })(MultipleSelect));
