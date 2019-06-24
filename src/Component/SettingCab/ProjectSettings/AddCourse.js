import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { TableRow } from '@material-ui/core';
//import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
//import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
//import {Edit} from '@material-ui/icons';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import { Link } from 'react-router-dom';
import { addCourselevel } from '../../../actions/courselevelActions';
import { getMaincourses, getMaincourse } from '../../../actions/maincourseActions';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';

import EdiText from 'react-editext';
import { connect } from 'react-redux';
import { getCourselevel, deleteCourselevel } from '../../../actions/courselevelActions';

const actionsStyles = (theme) => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5
	},
	fab: {
		margin: theme.spacing.unit
	},
	extendedIcon: {
		marginRight: theme.spacing.unit
	}
});

class TablePaginationActions extends React.Component {
	handleFirstPageButtonClick = (event) => {
		this.props.onChangePage(event, 0);
	};

	handleBackButtonClick = (event) => {
		this.props.onChangePage(event, this.props.page - 1);
	};

	handleNextButtonClick = (event) => {
		this.props.onChangePage(event, this.props.page + 1);
	};

	handleLastPageButtonClick = (event) => {
		this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
	};

	render() {
		const { classes, count, page, rowsPerPage, theme } = this.props;

		return (
			<div className={classes.root}>
				<IconButton onClick={this.handleFirstPageButtonClick} disabled={page === 0} aria-label="First Page">
					{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
				</IconButton>
				<IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
					{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
				</IconButton>
				<IconButton
					onClick={this.handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Next Page"
				>
					{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
				</IconButton>
				<IconButton
					onClick={this.handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Last Page"
				>
					{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
				</IconButton>
			</div>
		);
	}
}

TablePaginationActions.propTypes = {
	classes: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(TablePaginationActions);

const styles = (theme) => ({
	root: {},
	table: {},
	tableWrapper: {
		overflowX: 'auto'
	},
	button: {
		margin: theme.spacing.unit
	},
	leftIcon: {
		marginRight: theme.spacing.unit
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},

	iconSmall: {
		fontSize: 10
	},
	pagiborder: {
		border: 0
	},
	cardposition: {
		marginBottom: 20
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		marginTop: -50,
		float: 'right',
		marginLeft: 420,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},

		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit,
			width: 'auto'
		}
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit',
		width: '100%'
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200
			}
		}
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 500
	}
});

class CustomPaginationActionsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: '',
			coursename: '',
			open: false,
			search: '',
			search1: [],
			message: 'Title Editing Here',
			rows: [].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
			page: 0,
			rowsPerPage: 5,
			errors: {}
		};
		this.dataChanged = this.dataChanged.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getCourselevel(this.props.match.params.id);
		//this.setState({courselevels:this.props.courselevel})
		//this.props.getMaincourse(this.state.courselevels)
		//console.log(this.state.search1)
	}
	onDeleteClick(id) {
		this.props.deleteCourselevel(id);
	}

	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}

	onSubmit(e) {
		e.preventDefault();
		const newBook = {
			series: this.state.series,
			coursename: this.state.coursename
		};
		this.props.addCourselevel(this.props.match.params.id, newBook);
		this.props.history.push('/ProjectSetting/' + this.props.match.params.id);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSave = (val) => {
		console.log('Edited Value -> ', val);
	};
	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: event.target.value });
	};
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	dataChanged(data) {
		// data = { description: "New validated text comes here" }
		// Update your model from here
		console.log(data);
		this.setState({ ...data });
	}

	customValidateText(text) {
		return text.length > 0 && text.length < 64;
	}

	render() {
		const { courselevels } = this.props.courselevel;
		const { maincourse } = this.props.maincourse;
		console.log(maincourse);
		let filt = courselevels.filter((course) => {
			return course.coursename !== undefined;
		});
		console.log(filt);

		let filtered = filt.filter((course) => {
			const query = this.state.search.toLowerCase();
			return (
				course.series.toLowerCase().indexOf(query) >= 0 || course.courselevel.toLowerCase().indexOf(query) >= 0
			);
		});
		const { errors } = this.state;
		const { classes } = this.props;
		const { rows, rowsPerPage, page } = this.state;

		const { fullScreen } = this.props;

		const nav = { background: 'white' };
		return (
			<div>
				<div>
					<div />
				</div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb" style={nav}>
						<li className="breadcrumb-item">
							<a href="#">Home</a>
						</li>
						<li className="breadcrumb-item">
							<a href="%20__Project__Setting__">Project </a>
						</li>

						<li className="breadcrumb-item active" aria-current="page">
							Add Coursename{' '}
						</li>
					</ol>
				</nav>
				<Card className={classes.cardposition}>
					<Link to="#" className="decoration">
						<Tooltip title="Add Courses" placement="right">
							<Fab
								color="primary"
								size="large"
								aria-label="Add"
								id="widthicon"
								onClick={this.handleClickOpen}
							>
								<AddIcon />
							</Fab>
						</Tooltip>
					</Link>

					<div>
						<Dialog
							fullScreen={fullScreen}
							open={this.state.open}
							onClose={this.handleClose}
							aria-labelledby="responsive-dialog-title"
						>
							<DialogTitle id="responsive-dialog-title">{'Project Title'}</DialogTitle>
							<DialogContent>
								<DialogContentText>
									<form onSubmit={this.onSubmit} error>
										<TextField
											id="outlined-email-input"
											label="Series"
											className={classes.textField}
											name="series"
											type="series"
											value={this.state.series}
											onChange={this.onChange}
											error={errors.series}
											autoComplete="text"
											margin="normal"
											variant="outlined"
										/>
										<TextField
											id="outlined-email-input"
											label="Course Name"
											className={classes.textField}
											name="coursename"
											value={this.state.coursename}
											onChange={this.onChange}
											error={errors.coursename}
											autoComplete="text"
											margin="normal"
											variant="outlined"
										/>
										<DialogActions>
											<Button onClick={this.handleClose} color="primary">
												Close
											</Button>
											<Button type="submit" onClick={this.handleClose} color="primary" autoFocus>
												Submit
											</Button>
										</DialogActions>
									</form>
								</DialogContentText>
							</DialogContent>
						</Dialog>
					</div>
					<div className={classes.grow} />
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
						/>
					</div>
				</Card>

				<Table className={classes.root}>
					<TableHead>
						<TableRow>
							<TableCell id="newwidth2"> Series</TableCell>

							<TableCell>Course Name</TableCell>
							<TableCell>Add Level </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow key={row._id}>
									<TableCell component="th" scope="row">
										{row.series}
									</TableCell>

									<TableCell>
										<div className="container">
											<EdiText type="text" value={row.coursename} onSave={this.onSave} />
										</div>
									</TableCell>

									<TableCell id="newwidth2">
										<Tooltip title="Project Setting">
											<Link
												to={`/Project/Project Setting/AddLevelOfCourse/${row._id}`}
												className="decoration"
											>
												<IconButton aria-label="Project Setting">
													<i class="fas fa-cog" />
												</IconButton>
											</Link>
										</Tooltip>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				<TableFooter id="positionRight">
					<TablePagination
						rowsPerPageOptions={[ 5, 10, 25 ]}
						colSpan={3}
						count={rows.length}
						className={classes.pagiborder}
						rowsPerPage={rowsPerPage}
						page={page}
						SelectProps={{
							native: true
						}}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActionsWrapped}
					/>
				</TableFooter>
			</div>
		);
	}
}

CustomPaginationActionsTable.propTypes = {
	classes: PropTypes.object.isRequired,
	addCourselevel: PropTypes.func.isRequired,
	getMaincourses: PropTypes.func.isRequired,
	maincourse: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	getCourselevel: PropTypes.func.isRequired,
	courselevel: PropTypes.object.isRequired,
	courselevels: PropTypes.array.isRequired,

	getMaincourse: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	courselevel: state.courselevel,

	maincourses: state.maincourses,
	courselevel: state.courselevel,
	courselevels: state.courselevels,
	maincourse: state.maincourse,
	errors: state.errors
});
export default connect(mapStateToProps, {
	getMaincourses,
	addCourselevel,
	getMaincourse,
	getCourselevel,
	deleteCourselevel
})(withStyles(styles)(CustomPaginationActionsTable));
