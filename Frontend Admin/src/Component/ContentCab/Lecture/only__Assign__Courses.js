import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import { addLecturecourse } from '../../../actions/lecturecourseActions';
import { getLecture } from '../../../actions/lectureActions';
import { getAscourses } from '../../../actions/ascourseActions';
import { Link } from 'react-router-dom';
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

class MultipleSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			course: '',
			chapters: '',
			errors: {},
			name: [],
			value_: 0
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getLecture(this.props.match.params.id);
		this.props.getAscourses();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.lecture.lecture) {
			const lecture = nextProps.lecture.lecture;
			this.setState({
				title: lecture.title,
				credit: lecture.credit,
				faculty: lecture.faculty,
				playlist: lecture.playlist
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const { lecture } = this.props.lecture;
		const newBook = {
			playlist: lecture.playlist,
			faculty: lecture.faculty,
			title: lecture.title,
			course: this.state.course,
			chapters: this.state.chapters
		};

		this.props.addLecturecourse(this.props.match.params.id, newBook);
		this.props.history.push('/Edit__lecture/' + this.props.match.params.id);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleChange1 = (e, { value }) => this.setState({ faculty: value });
	handleChange = (e, { value }) => this.setState({ playlist: value });
	handleChange2 = (event) => {
		this.setState({ course: event.target.value });
	};
	handleChange3 = (event) => {
		this.setState({ chapters: event.target.value });
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
		const nav_ = {
			backgroundColor: 'white'
		};
		const { ascourses1 } = this.props.ascourse;
		const { errors } = this.state;
		const { lecture } = this.props.lecture;

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

		const f = filteredr.map((playlist) => ({ key: playlist._id, text: playlist.chapters, value: playlist._id }));

		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav_}>
						<li class="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li class="breadcrumb-item">
							<Link to="/__Add__Lecture">Lecture List</Link>
						</li>
						<li class="breadcrumb-item">
							<Link to={`/Edit__lecture/${this.props.match.params.id}`}>Edit lecture</Link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							Assign Course
						</li>
					</ol>
				</nav>
				<Card style={helpde}>
					<form onSubmit={this.onSubmit} error>
						<div className={classes.root}>
							<h4>Course assign to Introduction - Approach to costing & Basics of costing</h4>

							<TextField
								id="outlined-email-input"
								className={classes.textField}
								name="faculty"
								type="credit"
								value={lecture.faculty}
								disabled="true"
								onChange={this.onChange}
								error={errors.faculty}
								autoComplete="text"
								margin="normal"
								variant="outlined"
							/>

							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="age-simple">Courses</InputLabel>
								<Select
									value={this.state.course}
									onChange={this.handleChange2}
									error={errors.course}
									inputProps={{
										name: 'course',
										id: 'age-simple'
									}}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{d.map((course) => <MenuItem value={course.text}>{course.text}</MenuItem>)}
								</Select>
							</FormControl>
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="age-simple">Courses</InputLabel>
								<Select
									value={this.state.chapters}
									onChange={this.handleChange3}
									error={errors.chapters}
									inputProps={{
										name: 'chapters',
										id: 'age-simple'
									}}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{f.map((course) => <MenuItem value={course.value}>{course.text}</MenuItem>)}
								</Select>
							</FormControl>

							<div>
								{' '}
								<Button
									variant="contained"
									type="submit"
									color="primary"
									id="btnpo"
									className={classes.button}
								>
									Submit
								</Button>
							</div>
						</div>
					</form>
				</Card>
			</div>
		);
	}
}

MultipleSelect.propTypes = {
	classes: PropTypes.object.isRequired,
	addLecturecourse: PropTypes.func.isRequired,
	lecture: PropTypes.object.isRequired,
	getLecture: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	getAscourses: PropTypes.func.isRequired,
	ascourse: PropTypes.object.isRequired,
	ascourses: PropTypes.array.isRequired
};
const mapStateToProps = (state) => ({
	lecturecourse: state.lecturecourse,
	lecture: state.lecture,
	errors: state.errors,
	ascourse: state.ascourse,
	ascourses: state.ascourses
});
export default connect(mapStateToProps, { getLecture, getAscourses, addLecturecourse })(
	withStyles(styles, { withTheme: true })(MultipleSelect)
);
