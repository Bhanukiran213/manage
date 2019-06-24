import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Edit, Add, Delete, LastPage, KeyboardArrowRight, KeyboardArrowLeft, FirstPage } from '@material-ui/icons';
import {
	Table,
	TableCell,
	TableBody,
	TableFooter,
	IconButton,
	Slide,
	TablePagination,
	TableRow,
	Switch,
	Tooltip,
	TableHead,
	Button,
	InputBase
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getFacultys, deleteFaculty, updateFacultyStatus } from '../../../actions/facultyActions';
import { Link } from 'react-router-dom';
import './App.css';

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
					{theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
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
					{theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
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

const Page_position = {
	float: 'right',
	fontFamily: 'ubuntu'
};
const styles = (theme) => ({
	root: {
		width: '100%'
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
	iconsize: {
		height: '10px',
		width: '10px'
	},
	footerborder: {
		border: 0,
		fontFamily: 'ubuntu'
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

	search: {
		position: 'relative',
		marginTop: -45,
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
		background: '#f1f1f1',
		width: '74%'
	},
	error: {
		color: theme.palette.error.dark
	},
	colorSwitchBase: {
		color: '#7cbb42',
		'&$colorChecked': {
			color: '#7cbb42',
			'& + $colorBar': {
				backgroundColor: '#7cbb42'
			}
		}
	},
	colorBar: {},
	colorChecked: {}
});

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

const tablecolor = {
	color: '#464646',
	fontWeight: 600,
	fontFamily: 'ubuntu',
	border: '1px solid rgb(230, 227, 227)'
};

const nav = {
	background: '#fafafa',
	borderRadius: '0px',
	textAlign: 'left',
	padding: '20px 0px',
	marginTop: '-50px',
	borderBottom: '1px solid #e6e3e3'
};

class CustomPaginationActionsTable extends React.Component {
	state = {
		open: false,
		search: '',
		rows: [],
		page: 0,
		rowsPerPage: 10,
		checkedA: true,
		checkedB: true
	};

	componentDidMount() {
		this.props.getFacultys();
		this.setState({ facultys: this.props.faculty });
	}
	onDeleteClick(id) {
		this.props.deleteFaculty(id);
		this.setState({ open: false });
	}
	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};
	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}
	onUpdateClick(id) {
		this.props.updateFacultyStatus(id, 2, this.props.history);
	}
	onUpdate1Click(id) {
		this.props.updateFacultyStatus(id, 1, this.props.history);
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
		const { facultys } = this.props.faculty;
		const k = 1;
		let filt = facultys.filter((course) => {
			return course.first_name !== undefined || course.last_name !== undefined;
		});
		let filtered = filt.filter((course) => {
			const query = this.state.search.toLowerCase();
			return (
				course.first_name.toLowerCase().indexOf(query) >= 0 ||
				course.profession.toLowerCase().indexOf(query) >= 0
			);
		});
		for (let i = 0; i < facultys.length; i++) {
			facultys[i].sno = k + +i;
		}
		const { rowsPerPage, page } = this.state;
		return (
			<div style={{ width: '74%' }}>
				<ol class="breadcrumb" style={nav}>
					<li class="breadcrumb-item">
						<Link to="/" style={{ textDecoration: 'none' }}>
							Home
						</Link>
					</li>
					<li class="breadcrumb-item active" aria-current="page">
						{' '}
						Faculty List
					</li>
				</ol>
				<Link to="/Add_faculty" style={{ textDecoration: 'none' }}>
					<Tooltip title="Create Faculty" placement="right">
						<button id="btnchip" variant="outlined" className={classes.chip}>
							<Add className={classes.addicon} />Add Faculty
						</button>
					</Tooltip>
				</Link>
				<div className={classes.grow} style={{ width: '74%' }} />
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
						value={this.state.search}
						onChange={this.updateSearch.bind(this)}
					/>
				</div>
				<Table style={{ width: '74%' }} className={classes.root}>
					<TableHead className={classes.table}>
						<TableRow style={{ width: '74%' }}>
							<TableCell style={tablecolor}>S.No </TableCell>
							<TableCell style={tablecolor}>Fac Id</TableCell>
							<TableCell style={tablecolor}>First Name</TableCell>
							<TableCell style={tablecolor}>Last Name</TableCell>
							<TableCell style={tablecolor}>Email Address</TableCell>
							<TableCell style={tablecolor}>Mobile No</TableCell>
							<TableCell style={tablecolor}>Profession</TableCell>
							<TableCell style={tablecolor}>Status</TableCell>
							<TableCell style={tablecolor}>Edit</TableCell>
							<TableCell style={tablecolor}>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tablebody}>
						{filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((faculty) => {
							return (
								<TableRow key={faculty.id}>
									<TableCell component="th" scope="row" colSpan={1}>
										{faculty.sno}
									</TableCell>
									<TableCell>{faculty.faculty_id}</TableCell>
									<TableCell> {faculty.first_name}</TableCell>
									<TableCell>{faculty.last_name}</TableCell>
									<TableCell>{faculty.username}</TableCell>
									<TableCell>{faculty.mobile_no}</TableCell>
									<TableCell>{faculty.profession}</TableCell>
									{faculty.status == 1 ? (
										<TableCell>
											<Switch
												classes={{
													switchBase: classes.colorSwitchBase,
													checked: classes.colorChecked,
													bar: classes.colorBar
												}}
												color="default"
												style={{ color: '#7cbb42' }}
												checked={true}
												onClick={this.onUpdateClick.bind(this, faculty._id)}
											/>
										</TableCell>
									) : (
										<TableCell>
											<Switch
												checked={false}
												onClick={this.onUpdate1Click.bind(this, faculty._id)}
											/>
										</TableCell>
									)}
									<TableCell className={classes.cell}>
										<Tooltip title="Edit">
											<Link to={`/Edit__Faculty/${faculty._id}`} className="decoration">
												<IconButton style={{ color: '#0084c4' }}>
													<Edit />
												</IconButton>
											</Link>
										</Tooltip>
									</TableCell>
									<TableCell>
										<div>
											<Button
												className={classes.error}
												onClick={this.onDeleteClick.bind(this, faculty._id)}
											>
												<Delete />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>

				<TablePagination
					style={Page_position}
					id="pagination"
					className={classes.footerborder}
					rowsPerPageOptions={[ 10, 20, 30 ]}
					colSpan={12}
					count={facultys.length}
					rowsPerPage={rowsPerPage}
					page={page}
					SelectProps={{
						native: true
					}}
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
					ActionsComponent={TablePaginationActionsWrapped}
				/>
			</div>
		);
	}
}

CustomPaginationActionsTable.propTypes = {
	classes: PropTypes.object.isRequired,
	getFacultys: PropTypes.func.isRequired,
	faculty: PropTypes.object.isRequired,
	facultys: PropTypes.array.isRequired,
	updateFacultyStatus: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	faculty: state.faculty,
	facultys: state.facultys
});

export default connect(mapStateToProps, { getFacultys, deleteFaculty, updateFacultyStatus })(
	withStyles(styles)(CustomPaginationActionsTable)
);
