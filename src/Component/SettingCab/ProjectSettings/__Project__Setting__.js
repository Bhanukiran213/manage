import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { TableRow } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { fade } from '@material-ui/core/styles/colorManipulator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import { addProject } from '../../../actions/projectActions';
import { connect } from 'react-redux';
import { getProjects, deleteProject } from '../../../actions/projectActions';
import { Add } from '@material-ui/icons';
import Chip from '@material-ui/core/Chip';

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

const nav = {
	background: '#fafafa',
	borderRadius: '0px',
	textAlign: 'left',
	padding: '20px 0px',
	marginTop: '-50px',
	borderBottom: '1px solid #e6e3e3'
};
const tablecolor = {
	color: '#464646',
	fontWeight: 600,
	fontFamily: 'ubuntu',
	border: '1px solid rgb(230, 227, 227)'
};

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
	addicon: {
		width: 20,
		height: 20,
		background: 'none',
		marginLeft: 10,
		color: '#bad'
	},
	chip: {
		margin: theme.spacing.unit
	},
	search: {
		position: 'relative',

		marginTop: -35,

		float: 'right',
		marginLeft: 420,
		border: '1px solid #e8e8e8',
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
		alignItems: 'left',
		justifyContent: 'left',
		color: '#d4d4d4',
		padding: '2px 4px'
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
		border: '0px'
	},
	inputInput: {
		height: 11,

		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: 45,
		fontSize: '12px',
		fontFamily: 'ubuntu',
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200
			}
		}
	},

	tablebody: {
		background: 'white',
		fontSize: 12,
		fontFamily: 'ubuntu',
		padding: 0
	},
	table: {
		background: '#f1f1f1'
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
			Projectname: '',
			open: false,
			rows: [].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
			page: 0,
			rowsPerPage: 5,
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getProjects();
	}

	onDeleteClick(id) {
		this.props.deleteProject(id);
	}

	onSubmit(e) {
		e.preventDefault();

		const newBook = {
			Projectname: this.state.Projectname
		};

		this.props.addProject(newBook);
		this.props.history.push('/%20__Project__Setting__');
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

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

	render() {
		const { classes } = this.props;
		const { errors } = this.state;
		const { rowsPerPage, page } = this.state;

		const { fullScreen } = this.props;

		const { projects } = this.props.project;
		console.log(projects);

		let filt = projects.filter((course) => {
			return course.Projectname !== undefined;
		});

		return (
			<div>
				<div>
					<div />
				</div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb" style={nav}>
						<li className="breadcrumb-item">
							<a href="/">Home</a>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Project Lists
						</li>
					</ol>
				</nav>
				<div className={classes.cardposition}>
					<Link to="#" className="decoration">
						<Tooltip title="Add Project" placement="right">
							<Chip
								onClick={this.handleClickOpen}
								avatar={<Add className={classes.addicon} />}
								label="Add Project"
								color="primary"
								className={classes.chip}
							/>
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
											label="Add Project"
											className={classes.textField}
											name="Projectname"
											type="text"
											value={this.state.Projectname}
											onChange={this.onChange}
											error={errors.Projectname}
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
				</div>

				<Table className={classes.root}>
					<TableHead className={classes.table}>
						<TableRow>
							<TableCell style={tablecolor}> S.No</TableCell>

							<TableCell style={tablecolor}>Project Name</TableCell>
							<TableCell style={tablecolor}>Setting </TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tablebody}>
						{filt.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow key={row.id}>
									<TableCell id="newwidth2">1</TableCell>

									<TableCell>{row.Projectname} </TableCell>

									<TableCell id="newwidth2">
										<Tooltip title="Project Setting">
											<Link to={`/ProjectSetting/${row._id}`} className="decoration">
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
	addProject: PropTypes.func.isRequired,
	getProjects: PropTypes.func.isRequired,
	project: PropTypes.object.isRequired,
	projects: PropTypes.array.isRequired,

	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	project: state.project,
	projects: state.projects,
	errors: state.errors
});

export default connect(mapStateToProps, { addProject, getProjects, deleteProject })(
	withStyles(styles)(CustomPaginationActionsTable)
);
