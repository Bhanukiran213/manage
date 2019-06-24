import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
	TableRow,
	Switch,
	TablePagination,
	TableFooter,
	TableCell,
	TableBody,
	Table,
	InputBase,
	Tooltip,
	TableHead,
	IconButton
} from '@material-ui/core';
import { Add, Edit, Delete, KeyboardArrowRight, KeyboardArrowLeft, FirstPage, LastPage } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Link } from 'react-router-dom';
import './App.css';
import { getTopups, deleteTopup, updateTopupStatus } from '../../../actions/topupActions';
import { connect } from 'react-redux';

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

const styles = (theme) => ({
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
	paginborder: {
		border: 0
	},
	cardposition: {
		marginBottom: 20
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
		background: '#f1f1f1'
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
	colorChecked: {},
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
	chip: {
		margin: theme.spacing.unit
	}
});

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
		this.props.getTopups();
	}
	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}
	onUpdateClick(id) {
		this.props.updateTopupStatus(id, 2, this.props.history);
		//window.location.reload();
	}

	onUpdate1Click(id) {
		this.props.updateTopupStatus(id, 1, this.props.history);
		// window.location.reload();
	}

	onDeleteClick(id) {
		this.props.deleteTopup(id);
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
		const { topups } = this.props.topup;
		const k = 1;
		let filt = topups.filter((course) => {
			return course !== undefined || course.title !== undefined;
		});
		let filtered = filt.filter((course) => {
			const query = this.state.search.toLowerCase();
			return course.title.toLowerCase().indexOf(query) >= 0;
		});
		for (let i = 0; i < topups.length; i++) {
			topups[i].sno = k + +i;
		}
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav}>
						<li class="breadcrumb-item">
							<a href="/">Home</a>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							TopUp Lists
						</li>
					</ol>
				</nav>
				<div className={classes.cardposition}>
					<Link to="/Add__Top__up" className="decoration">
						<Tooltip title="Add TopUp" aria-label="Add">
							<button id="btnchip" variant="outlined" className={classes.chip}>
								<Add className={classes.addicon} />Add TopUp
							</button>
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
				</div>
				<Table className={classes.root}>
					<TableHead className={classes.table}>
						<TableRow>
							<TableCell style={tablecolor}> S.No</TableCell>
							<TableCell style={tablecolor}>Title</TableCell>
							<TableCell style={tablecolor}>Number of Credit</TableCell>
							<TableCell style={tablecolor}>Amount + Tax</TableCell>
							<TableCell style={tablecolor}>Course Name</TableCell>
							<TableCell style={tablecolor}>Status</TableCell>
							<TableCell style={tablecolor}>Edit</TableCell>
							<TableCell style={tablecolor}>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tablebody}>
						{filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow key={row._id}>
									<TableCell component="th" scope="row">
										{row.sno}
									</TableCell>
									<TableCell>{row.title}</TableCell>
									<TableCell>{row.no_of_credits}</TableCell>
									<TableCell>
										{row.amount}+{row.tax}
									</TableCell>
									<TableCell>{row.course.coursename}</TableCell>
									{row.status == 1 ? (
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
												onClick={this.onUpdateClick.bind(this, row._id)}
											/>
										</TableCell>
									) : (
										<TableCell>
											<Switch checked={false} onClick={this.onUpdate1Click.bind(this, row._id)} />
										</TableCell>
									)}
									<TableCell id="newwidth2">
										<Tooltip title="Edit">
											<Link to={`/Edit__TopUp/${row._id}`} className="decoration">
												<IconButton style={{ color: '#0084c4' }}>
													<Edit />
												</IconButton>
											</Link>
										</Tooltip>
									</TableCell>
									<TableCell>
										<Delete
											className={classes.error}
											onClick={this.onDeleteClick.bind(this, row._id)}
										/>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>

				<TablePagination
					style={Page_position}
					rowsPerPageOptions={[ 10, 20, 30 ]}
					colSpan={12}
					count={rows.length}
					className={classes.paginborder}
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
	getTopups: PropTypes.func.isRequired,
	topup: PropTypes.object.isRequired,
	topups: PropTypes.array.isRequired,
	updateTopupStatus: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	topup: state.topup,
	topups: state.topups
});
const Page_position = {
	float: 'right',
	fontFamily: 'ubuntu',
	border: '0px'
};

export default connect(mapStateToProps, { getTopups, deleteTopup, updateTopupStatus })(
	withStyles(styles)(CustomPaginationActionsTable)
);
