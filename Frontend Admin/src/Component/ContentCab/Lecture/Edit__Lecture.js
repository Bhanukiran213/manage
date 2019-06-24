import React from 'react';
import PropTypes from 'prop-types';
import purple from '@material-ui/core/colors/purple';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CloseIcon from '@material-ui/icons/Close';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { addLecturecourse } from '../../../actions/lecturecourseActions';
import { getAscourses } from '../../../actions/ascourseActions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPlaylists } from '../../../actions/playlistActions';
import Table_Mapping from './Table';
import { updateLecture, getLecture } from '../../../actions/lectureActions';
import Dialog from '@material-ui/core/Dialog';

const helpde = {
	width: '100%',
	borderRadius: '0px',
	border: '1px solid #0000001f',
	boxShadow: '0px 0px 0px 0px',
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
		float: 'left',

		width: '76%',
		marginLeft: 10
	},
	formControl_new: {
		float: 'left',
		marginTop: 20,
		width: '460px',
		marginLeft: 25
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
		float: 'left',
		width: 470,
		height: 40,

		marginLeft: 20
	},
	_textField: {
		width: 300,
		marginLeft: 20,
		height: 44
	},
	dense: {
		marginTop: 16
	},
	menu: {
		width: 400
	},
	button: {
		width: 50,
		height: 50,
		marginLeft: 20,
		marginTop: 20,
		border: '1px solid #0000001f',
		boxShadow: '0px 0px 0px 0px'
	},
	button_: {
		width: 50,
		height: 50,
		marginTop: 20,
		float: 'right',
		marginBottom: 20,
		marginLeft: '89%',
		border: '1px solid #0000001f',
		boxShadow: '0px 0px 0px 0px'
	},
	input: {
		display: 'none'
	},
	marho: {
		width: 400
	},
	table: {
		float: 'left',
		marginTop: 40
	},
	fmarho: {
		marginLeft: 20
	},
	DialogWidth: {
		width: 520,
		marginTop: 100,
		height: 300,
		marginLeft: '40%'
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
			title: '',
			credit: '',
			playlist: [],
			faculty: '',
			name: [],
			open: false,
			value_: 0,
			course: '',
			chapters: '',
			chapter_id: '',
			errors: {},
			checkedA: true,
			checkedB: true,

			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSubmit1 = this.onSubmit1.bind(this);
	}
	componentDidMount() {
		this.props.getLecture(this.props.match.params.id);
		//const{playlist}=this.props;
		//this.setState(this.props.playlist)
		//console.log(playlist)
		this.props.getAscourses();
		this.props.getPlaylists();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.lecture.lecture) {
			const lecture = nextProps.lecture.lecture;
			let g = lecture.playlist ? lecture.playlist : [];

			console.log(g.length);

			const title = g.map((c) => c.title);
			console.log(title);

			this.setState({
				title: lecture.title,
				credit: lecture.credit,
				faculty: lecture.faculty,
				playlist: title
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const bookData = {
			title: this.state.title,
			credit: this.state.credit,
			playlist: this.state.playlist,
			faculty: this.state.faculty
		};
		this.props.updateLecture(this.props.match.params.id, bookData, this.props.history);
		this.props.history.push('/__Add__Lecture');
	}

	onSubmit1(e) {
		e.preventDefault();
		const { lecture } = this.props.lecture;
		const newBook = {
			playlist: lecture.playlist,
			faculty: lecture.faculty,
			title: lecture.title,
			course: this.state.course,
			chapters: this.state.chapters,
			chapter_id: this.state.chapter_id
		};

		this.props.addLecturecourse(this.props.match.params.id, newBook);
		this.props.history.push('/Edit__lecture/' + this.props.match.params.id);
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleChanger = (event) => {
		this.setState({ playlist: event.target.value });
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleChange1 = (e, { value }) => this.setState({ faculty: value });
	handleChange = (e, { value }) => this.setState({ playlist: value });
	handleChange2 = (event) => {
		this.setState({ course: event.target.value });
	};
	handleChange3 = (event, x) => {
		console.log(x.key);
		this.setState({ chapter_id: event.target.value });
		this.setState({ chapters: x.key });
		console.log(this.state.chapters);
	};

	handleChange = (name_) => (event) => {
		this.setState({ [name_]: event.target.checked });
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
		const nav = {
			background: '#fafafa',
			borderRadius: '0px',
			textAlign: 'left',
			padding: '20px 0px',
			marginTop: '-50px',
			borderBottom: '1px solid #e6e3e3'
		};

		const { classes } = this.props;
		const { value_ } = this.state;
		const { lecture } = this.props.lecture;
		console.log(lecture);

		const { errors } = this.state;
		const { playlists } = this.props.playlist;
		const { ascourses1 } = this.props.ascourse;

		const removeDuplicates = (array, key) => {
			return array.reduce((arr, item) => {
				const removed = arr.filter((i) => i[key] !== item[key]);
				return [ ...removed, item ];
			}, []);
		};

		//----------eliminating the null or undefined values-------------------------------------//
		let filt = ascourses1.filter((course) => {
			return course.chapters !== undefined;
		});

		//-------------filtering the values based on the  faculty search-----------------------------//
		let filtered = filt.filter((course) => {
			const query = lecture.faculty;
			return course.faculty['first_name'].indexOf(query) >= 0;
		});
		console.log(filtered);
		const s = removeDuplicates(filtered, 'course');

		const d = s.map((playlist) => ({ key: playlist._id, text: playlist.course, value: playlist.course }));
		console.log(d);
		//----------------------filtering the values based on the course search--------------------//

		let filteredr = filtered.filter((course) => {
			const query = this.state.course.toLowerCase();
			return course.course.toLowerCase().indexOf(query) >= 0;
		});

		const f = filteredr.map((playlist) => ({
			key: playlist.chapter_id,
			text: playlist.chapters,
			value: playlist._id
		}));

		const a = playlists.map((playlist) => ({ key: playlist._id, text: playlist.title, value: playlist._id }));
		console.log(this.state.playlist);
		const g = <Table_Mapping chapters={lecture.chapters} d={this.props.match.params.id} />;
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav}>
						<li class="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li class="breadcrumb-item">
							<Link to="/__Add__Lecture">Lecture List</Link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							Edit lecture
						</li>
					</ol>
				</nav>

				<div style={helpde}>
					<div className={classes.root}>
						<form onSubmit={this.onSubmit} error>
							<TextField
								className={classes._textField}
								label="Lecture Title"
								name="title"
								type="title"
								value={this.state.title}
								onChange={this.onChange}
								error={errors.title}
								placeholder="Enter Lecture Title"
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
								id="outlined-email-input"
								label="Credit per Lecture"
								className={classes._textField}
								placeholder="Enter Your Credit Per Lecture"
								name="credit"
								type="credit"
								value={this.state.credit}
								onChange={this.onChange}
								error={errors.credit}
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
								id="outlined-email-input"
								label="Faculty"
								className={classes._textField}
								placeholder="Enter fcaulty name"
								name="faculty"
								type="credit"
								value={this.state.faculty}
								onChange={this.onChange}
								error={errors.faculty}
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

							<Button
								variant="contained"
								type="submit"
								id="btn_chip"
								style={{ height: 40 }}
								className={classes.button}
							>
								Submit
							</Button>

							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="select-multiple-chip" placeholder="Select Your Lecture PlayList">
									PlayList
								</InputLabel>
								<Select
									multiple
									value={this.state.playlist}
									onChange={this.handleChanger}
									input={<Input name="playlist" id="select-multiple" />}
									renderValue={(selected) => (
										<div className={classes.chips}>
											{selected.map((Kt) => (
												<Chip key={Kt} label={Kt} className={classes.chip} />
											))}
										</div>
									)}
									MenuProps={MenuProps}
								>
									{a.map((name) => (
										<MenuItem Key={name.value} value={name.value} style={getStyles(name, this)}>
											{name.text}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</form>
					</div>
				</div>

				<Link to={`/Only__Assign__Course/${this.props.match.params.id}`} />

				<Button
					variant="contained"
					id="btn_chip"
					style={{ height: 40, width: 70, fontFamily: 'ubuntu' }}
					onClick={this.handleClickOpen}
					className={classes.button_}
				>
					Assign
				</Button>
				<Dialog
					className={classes.DialogWidth}
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					//TransitionComponent={Transition}
				>
					<form onSubmit={this.onSubmit1}>
						<div className="dialog-header">
							<button type="button" id="btn_btn_Cancel_chip" onClick={this.handleClose}>
								<CloseIcon />
							</button>

							<button id="btn_btn_chip" type="submit" onClick={this.handleClose}>
								save
							</button>
						</div>

						<TextField
							id="outlined-email-input"
							style={{ width: 470, height: 40, marginLeft: 20 }}
							name="faculty"
							type="credit"
							value={lecture.faculty}
							disabled="true"
							onChange={this.onChange}
							error={errors.faculty}
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

						{/*       
<FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">Courses</InputLabel>
        <Select
          value={this.state.course}
          onChange={this.handleChange2}
          error={errors.course}
          inputProps={{
            name: 'course',
            id: 'age-simple',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {d.map(course=>(
          <MenuItem value={course.text}>{course.text}</MenuItem>))}
          
        </Select>
      </FormControl> */}

						<TextField
							id="outlined-select-currency"
							select
							label="Courses Name"
							className={classes.textField}
							value={this.state.course}
							onChange={this.handleChange2}
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
							{d.map((course) => <MenuItem value={course.text}>{course.text}</MenuItem>)}
						</TextField>

						{/* <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">Chapters</InputLabel>
        <Select
          value={this.state.chapters}
          onChange={this.handleChange3}
          error={errors.chapters}
          inputProps={{
            name: 'chapters',
            id: 'age-simple',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {f.map(course=>(
          <MenuItem value={course.value}>{course.text}</MenuItem>))}
          
        </Select>
      </FormControl> */}

						<TextField
							id="outlined-select-currency"
							select
							name="chapter_id"
							label="Chapters"
							className={classes.textField}
							style={{ height: 40 }}
							value={this.state.chapter_id}
							onChange={(event, Key) => this.handleChange3(event, Key)}
							error={errors.chapters}
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
							{f.map((course) => <MenuItem value={course.value}>{course.text}</MenuItem>)}
						</TextField>
					</form>
				</Dialog>
				{g}
			</div>
		);
	}
}

MultipleSelect.propTypes = {
	classes: PropTypes.object.isRequired,
	updateLecture: PropTypes.func.isRequired,
	getPlaylists: PropTypes.func.isRequired,
	playlist: PropTypes.object.isRequired,
	playlists: PropTypes.array.isRequired,
	errors: PropTypes.object.isRequired,
	addLecturecourse: PropTypes.func.isRequired,
	getAscourses: PropTypes.func.isRequired,
	ascourse: PropTypes.object.isRequired,
	ascourses: PropTypes.array.isRequired,
	lecture: PropTypes.object.isRequired,
	getLecture: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	lecture: state.lecture,
	errors: state.errors,
	playlist: state.playlist,
	playlists: state.playlists,
	lecturecourse: state.lecturecourse,
	errors: state.errors,
	ascourse: state.ascourse,
	ascourses: state.ascourses
});
export default connect(mapStateToProps, { getPlaylists, getAscourses, addLecturecourse, updateLecture, getLecture })(
	withStyles(styles, { withTheme: true })(MultipleSelect)
);
