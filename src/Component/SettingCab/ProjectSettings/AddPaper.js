import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { TableRow, Switch } from '@material-ui/core';
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

import { addChapter } from '../../../actions/chapterActions';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import Icon from '@material-ui/core/Icon';

import { Link } from 'react-router-dom';

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
import { getChapter, deleteChapter, updateStatus } from '../../../actions/chapterActions';
import { getCourselevel1, addlevel } from '../../../actions/courselevelActions';

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
			paper: '',
			coursename: '',
			courselevel: '',
			open: false,
			checkedB: false,
			message: 'Title Editing Here',
			rows: [].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
			page: 0,
			rowsPerPage: 5,
			search: '',
			search1: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.dataChanged = this.dataChanged.bind(this);
		this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
	}

	componentDidMount() {
		this.props.getCourselevel1(this.props.match.params.id);
		this.props.getChapter(this.props.match.params.courselevel);
	}

	onSubmit(e) {
		const { courselevel } = this.props.courselevel;
		e.preventDefault();
		const newBook = {
			series: courselevel.series,
			coursename: courselevel.coursename,
			courselevel: this.props.match.params.courselevel,
			paper: this.state.paper
		};
		this.props.addChapter(
			this.props.match.params.id,
			this.props.match.params.courselevel,
			newBook,
			this.props.history
		);
		// this.props.history.push('/addlevel/'+this.props.match.params.id);
		window.location.reload();
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
	handleChangeSwitch = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};
	onUpdateClick(courselevel, id) {
		this.props.updateStatus(courselevel, id, 2, this.props.history);
		window.location.reload();
	}
	onUpdate1Click(courselevel, id) {
		this.props.updateStatus(courselevel, id, 1, this.props.history);
		window.location.reload();
	}

	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}
	onDeleteClick(id) {
		this.props.deleteChapter(id);
	}
	handleChange2 = (e, { value }) => this.setState({ search: value });

	render() {
		const { errors } = this.state;
		const { classes } = this.props;
		const { rowsPerPage, page } = this.state;
		// const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
		const { fullScreen } = this.props;

		const nav = { background: 'white' };
		const { courselevel } = this.props.courselevel;
		console.log(courselevel.series);
		const { chapters } = this.props.chapter;
		console.log(chapters);
		let filt = chapters.filter((course) => {
			return course.series == courselevel.series;
		});
		console.log(filt);
		let filtered = filt.filter((course) => {
			const query = this.state.search.toLowerCase();
			return course.paper.toLowerCase().indexOf(query) >= 0;
		});

		const removeDuplicates = (array, key) => {
			return array.reduce((arr, item) => {
				const removed = arr.filter((i) => i[key] !== item[key]);
				return [ ...removed, item ];
			}, []);
		};
		const b = removeDuplicates(chapters, 'paper');
		const option4 = b.map((course) => ({ key: course._id, text: course.paper, value: course.paper }));

		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb" style={nav}>
						<li className="breadcrumb-item">
							<a href="#">Home</a>
						</li>
						<li className="breadcrumb-item">
							<a href="/%20__Project__Setting__">Project </a>
						</li>
						<li className="breadcrumb-item ">
							{' '}
							<a href={`/ProjectSetting/${courselevel.project}`}>Course list</a>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							<a href={`/Project/Project%20Setting/AddLevelOfCourse/${this.props.match.params.id}`}>
								{' '}
								Course Level
							</a>{' '}
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Add Papers
						</li>
					</ol>
				</nav>
				<Card className={classes.cardposition}>
					<Link to="#" className="decoration">
						<Tooltip title="Add level" placement="right">
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
							<DialogTitle id="responsive-dialog-title">{'ADD PAPAER'}</DialogTitle>
							<DialogContent>
								<DialogContentText>
									<form onSubmit={this.onSubmit} error>
										<TextField
											id="outlined-email-input"
											label="ADD PAPAER "
											className={classes.textField}
											name="paper"
											type="paper"
											value={this.state.paper}
											onChange={this.onChange}
											error={errors.paper}
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

				<Table>
					<TableHead>
						<TableRow>
							<TableCell>PAPER NAME</TableCell>
							<TableCell> Status</TableCell>
							<TableCell>Add Chapter</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filt.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow key={row._id}>
									<TableCell>
										<EdiText type="text" value={row.paper} onSave={this.onSave} />
									</TableCell>

									{row.status == 1 ? (
										<TableCell>
											{' '}
											<Switch
												checked={true}
												onClick={this.onUpdateClick.bind(this, row.courselevel, row._id)}
											/>
										</TableCell>
									) : (
										<TableCell>
											{' '}
											<Switch
												checked={false}
												onClick={this.onUpdate1Click.bind(this, row.courselevel, row._id)}
											/>
										</TableCell>
									)}
									<TableCell>
										<Link to={`/Chapter/${row.courselevel}/${row._id}`}>
											<IconButton>
												<Icon size="small">edit_icon</Icon>
											</IconButton>
										</Link>
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
						count={filt.length}
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
	addChapter: PropTypes.func.isRequired,
	courselevel: PropTypes.object.isRequired,
	getCourselevel1: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	getChapter: PropTypes.func.isRequired,
	chapter: PropTypes.object.isRequired,
	chapters: PropTypes.array.isRequired,
	updateStatus: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.errors,
	chapter: state.chapter,
	chapters: state.chapters,
	courselevel: state.courselevel
});
export default connect(mapStateToProps, { updateStatus, getChapter, deleteChapter, getCourselevel1, addChapter })(
	withStyles(styles)(CustomPaginationActionsTable)
);
