import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { Button } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import { TableRow, Switch } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import { Edit } from '@material-ui/icons';
import { connect } from 'react-redux';
import { getPackages, deletePackage, updatePackageStatus } from '../../../actions/packageActions';
import './App.css';

import { Link } from 'react-router-dom';
import { Add } from '@material-ui/icons';

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

const Page_position = {
	float: 'right',
	fontFamily: 'ubuntu'
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
	paginborder: {
		border: 0
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
	chip: {
		margin: theme.spacing.unit
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
	colorChecked: {}
});

class CustomPaginationActionsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			search1: '',
			page: 0,
			rowsPerPage: 10,
			rows: [].sort((a, b) => (a.calories < b.calories ? -1 : 1))
		};
	}

	componentDidMount() {
		this.props.getPackages();
	}

	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}

	onUpdateClick(id) {
		this.props.updatePackageStatus(id, 2, this.props.history);
		//window.location.reload();
	}

	onUpdate1Click(id) {
		this.props.updatePackageStatus(id, 1, this.props.history);
		//window.location.reload();
	}

	onDeleteClick(id) {
		this.props.deletePackage(id);
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

		const { packages } = this.props.package;

		const k = 1;

		let filt = packages.filter((course) => {
			return course !== undefined || course.title !== undefined;
		});

		let filtered = filt.filter((course) => {
			const query = this.state.search.toLowerCase();
			return course.title.toLowerCase().indexOf(query) >= 0;
		});
		for (let i = 0; i < packages.length; i++) {
			packages[i].sno = k + +i;
		}
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav}>
						<li class="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>

						<li class="breadcrumb-item active" aria-current="page">
							{' '}
							Package List
						</li>
					</ol>
				</nav>
				<div>
					<Link to="/Create__Package" className="decoration">
						<Tooltip title="Create Package">
							<button id="btnchip" variant="outlined" className={classes.chip}>
								<Add className={classes.addicon} />Create Package
							</button>
						</Tooltip>
					</Link>
				</div>

				<Table className={classes.root}>
					<TableHead className={classes.table}>
						<TableRow>
							<TableCell style={tablecolor}> S.No</TableCell>
							<TableCell style={tablecolor}>Title</TableCell>
							<TableCell style={tablecolor}>Number of Days</TableCell>
							<TableCell style={tablecolor}>Credits per Month</TableCell>
							<TableCell style={tablecolor}>Total Credits</TableCell>
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
									<TableCell> {row.no_of_days}</TableCell>
									<TableCell>{row.credits_per_month}</TableCell>
									<TableCell>{row.total_credits}</TableCell>
									<TableCell>{row.amount}</TableCell>
									<TableCell>{row.main_course_id}</TableCell>
									{row.status == 1 ? (
										<TableCell>
											{' '}
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
											{' '}
											<Switch checked={false} onClick={this.onUpdate1Click.bind(this, row._id)} />
										</TableCell>
									)}
									<TableCell id="newwidth2">
										<Tooltip title="Edit">
											<Link to={`/Edit__Package/${row._id}`} className="decoration">
												<IconButton style={{ color: '#0084c4' }}>
													<Edit />
												</IconButton>
											</Link>
										</Tooltip>
									</TableCell>

									<TableCell>
										<Button
											className={classes.error}
											onClick={this.onDeleteClick.bind(this, row._id)}
										>
											<DeleteIcon />
										</Button>
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
					className={classes.paginborder}
					count={filtered.length}
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
	getPackages: PropTypes.func.isRequired,
	package: PropTypes.object.isRequired,
	packages: PropTypes.array.isRequired,
	updatePackageStatus: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	package: state.package,
	packages: state.packages
});
export default connect(mapStateToProps, { getPackages, deletePackage, updatePackageStatus })(
	withStyles(styles)(CustomPaginationActionsTable)
);
