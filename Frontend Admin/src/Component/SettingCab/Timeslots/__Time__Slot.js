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
import { connect } from 'react-redux';
import { Edit } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { getTimings, deleteTime } from '../../../actions/timeActions';
//import Add__faculty from './Add_Faculty';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Add } from '@material-ui/icons';
import { Chip } from '@material-ui/core';

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

let counter = 0;
function createData(name, calories, fat) {
	counter += 1;
	return { id: counter, name, calories, fat };
}

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
		borderRadius: theme.shape.borderRadius,
		marginTop: -40,
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

class CustomPaginationActionsTable extends React.Component {
	state = {
		rows: [
			createData('Cupcake', 305, 3.7),
			createData('Donut', 452, 25.0),
			createData('Eclair', 262, 16.0),
			createData('Frozen yoghurt', 159, 6.0),
			createData('Gingerbread', 356, 16.0),
			createData('Honeycomb', 408, 3.2),
			createData('Ice cream sandwich', 237, 9.0),
			createData('Jelly Bean', 375, 0.0),
			createData('KitKat', 518, 26.0),
			createData('Lollipop', 392, 0.2),
			createData('Marshmallow', 318, 0),
			createData('Nougat', 360, 19.0),
			createData('Oreo', 437, 18.0)
		].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
		page: 0,
		rowsPerPage: 5
	};

	componentDidMount() {
		this.props.getTimings();
	}

	onDeleteClick(id) {
		this.props.deleteTime(id);
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: event.target.value });
	};

	render() {
		const { classes } = this.props;
		const { rows, rowsPerPage, page } = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

		const { times } = this.props.time;
		let filt = times.filter((course) => {
			return course.timings !== undefined;
		});
		console.log(filt);
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

						<li className="breadcrumb-item active" aria-current="page">
							Time Slot List{' '}
						</li>
					</ol>
				</nav>
				<Card className={classes.cardposition}>
					<Link to="/Add__Time__Slot" className="decoration">
						<Tooltip title="Add Time Slot" placement="right">
							<Chip
								avatar={<Add className={classes.addicon} />}
								label="Add Time Slot"
								color="primary"
								className={classes.chip}
							/>
						</Tooltip>
					</Link>

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
							<TableCell>Timeslots</TableCell>
							<TableCell>Edit </TableCell>

							<TableCell>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filt.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow key={row._id}>
									<TableCell component="th" scope="row">
										{row.timings}
									</TableCell>

									<TableCell id="newwidth2">
										<Tooltip title="Edit">
											<Link to={`/Edit__Time__Slot/${row._id}`} className="decoration">
												<IconButton aria-label="Edit">
													<Edit />
												</IconButton>
											</Link>
										</Tooltip>
									</TableCell>
									<TableCell>
										<DeleteIcon onClick={this.onDeleteClick.bind(this, row._id)} />
									</TableCell>
								</TableRow>
							);
						})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 48 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
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
	getTimings: PropTypes.func.isRequired,
	time: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	time: state.time,
	times: state.times
});

export default connect(mapStateToProps, { getTimings, deleteTime })(withStyles(styles)(CustomPaginationActionsTable));
