import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

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

import { getFacultys } from '../../../actions/facultyActions';

import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { fade } from '@material-ui/core/styles/colorManipulator';
import NoteAdd from '@material-ui/icons/NoteAdd';

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
		marginBottom: 20,
		height: 60,
		paddingRight: 10
	},
	search: {
		position: 'relative',

		marginTop: 5,

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
	table: {
		marginTop: '-20px'
	},

	Table_Head: {
		background: '#f1f1f1',
		color: 'red'
	},
	cellColor: {
		color: '#464646',
		fontWeight: 600,
		fontFamily: 'ubuntu',
		border: '1px solid rgb(230, 227, 227)'
	},
	tablebody: {
		background: 'white',
		fontSize: 12,
		fontFamily: 'ubuntu',
		padding: 0
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

const Page_position = {
	float: 'right',
	fontFamily: 'ubuntu'
};
class CustomPaginationActionsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			search1: '',
			rows: [],
			page: 0,
			rowsPerPage: 10
		};
	}
	componentDidMount() {
		this.props.getFacultys();
		this.setState({ facultys: this.props.faculty });
	}
	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: event.target.value });
	};

	render() {
		const { classes } = this.props;
		const { rowsPerPage, page } = this.state;

		const { facultys } = this.props.faculty;
		const { faculty } = this.props.faculty;
		const k = 1;
		for (let i = 0; i < facultys.length; i++) {
			facultys[i].sno = k + +i;
			console.log(k);
		}

		let filt = facultys.filter((course) => {
			return course.first_name !== undefined;
		});
		console.log(filt);

		let filtered = filt.filter((course) => {
			const query = this.state.search.toLowerCase();
			return (
				course.first_name.toLowerCase().indexOf(query) >= 0 ||
				course.last_name.toLowerCase().indexOf(query) >= 0
			);
		});

		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav}>
						<li class="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							Faculty List
						</li>
					</ol>
				</nav>
				<div className={classes.cardposition}>
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
							value={this.state.search}
							onChange={this.updateSearch.bind(this)}
						/>
					</div>
				</div>

				<div className={classes.root}>
					<Table className={classes.table}>
						<TableHead className={classes.Table_Head}>
							<TableRow>
								<TableCell className={classes.cellColor}>S.No </TableCell>
								<TableCell className={classes.cellColor}>Faculty Name </TableCell>
								<TableCell className={classes.cellColor}>Email Address </TableCell>
								<TableCell className={classes.cellColor}>Mobile No </TableCell>
								<TableCell className={classes.cellColor}>Assign </TableCell>
							</TableRow>
						</TableHead>
						<TableBody className={classes.tablebody}>
							{filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
								return (
									<TableRow key={row.id}>
										<TableCell>{row.sno}</TableCell>
										<TableCell> {row.first_name}</TableCell>
										<TableCell>{row.username}</TableCell>
										<TableCell>{row.mobile_no}</TableCell>
										<TableCell className={classes.tablehight}>
											<Link to={`/assign/${row._id}`}>
												<Tooltip title="Edit">
													<IconButton style={{ color: '#0084c4' }} aria-label="Edit">
														<NoteAdd />
													</IconButton>
												</Tooltip>
											</Link>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>

				<TablePagination
					style={Page_position}
					rowsPerPageOptions={[ 10, 30, 30 ]}
					colSpan={12}
					className={classes.pagiborder}
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
	facultys: PropTypes.array.isRequired
};
const mapStateToProps = (state) => ({
	faculty: state.faculty,
	facultys: state.facultys
});

export default connect(mapStateToProps, { getFacultys })(withStyles(styles)(CustomPaginationActionsTable));
