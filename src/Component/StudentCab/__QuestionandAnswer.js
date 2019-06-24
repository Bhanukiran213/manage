import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { TableRow, FormControlLabel, Switch } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';

import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { fade } from '@material-ui/core/styles/colorManipulator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import { Edit } from '@material-ui/icons';

import { Tooltip } from '@material-ui/core';

import Slide from '@material-ui/core/Slide';
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
		marginBottom: 20,
		height: 60,
		paddingRight: 10
	},
	search: {
		position: 'relative',

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
	colorChecked: {}
});

function Transition(props) {
	return <Slide direction="up" {...props} />;
}
class CustomPaginationActionsTable extends React.Component {
	state = {
		open: false,
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
		const { rows, rowsPerPage, page } = this.state;

		return (
			<div>
				<div>
					<div />
				</div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav}>
						<li class="breadcrumb-item">
							<a href="#">Home</a>
						</li>

						<li class="breadcrumb-item active" aria-current="page">
							Q and A{' '}
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
						/>
					</div>
				</div>

				<Table className={classes.root}>
					<TableHead className={classes.table}>
						<TableRow>
							<TableCell style={tablecolor}> S.No</TableCell>
							<TableCell style={tablecolor}>Student Name</TableCell>
							<TableCell style={tablecolor}> Questions</TableCell>
							<TableCell style={tablecolor}>Course </TableCell>
							<TableCell style={tablecolor}>Chapter </TableCell>

							<TableCell style={tablecolor}>Status </TableCell>
							<TableCell style={tablecolor}>Answer </TableCell>
							<TableCell style={tablecolor}>Delete </TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tablebody}>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow key={row.id}>
									<TableCell component="th" scope="row">
										1
									</TableCell>
									<TableCell>fac35312</TableCell>
									<TableCell> Hariparshad</TableCell>
									<TableCell>Omksrisha</TableCell>
									<TableCell>Hari.om@learncab.com</TableCell>

									<TableCell>
										<FormControlLabel color="primary" control={<Switch value="checkedC" />} />
									</TableCell>

									<TableCell>
										<Tooltip title="Edit">
											<Link to="/TinyCME">
												<IconButton style={{ color: '#0084c4' }}>
													<Edit />
												</IconButton>
											</Link>
										</Tooltip>
									</TableCell>
									<TableCell>
										<div>
											<Button color="primary" onClick={this.handleClickOpen}>
												<DeleteIcon />
											</Button>
											<Dialog
												TransitionComponent={Transition}
												keepMounted
												open={this.state.open}
												onClose={this.handleClose}
												aria-labelledby="responsive-dialog-title"
											>
												<DialogTitle id="responsive-dialog-title">
													<i class="fas fa-exclamation-triangle" />
													{' Really,Do You Want To Delete '}
												</DialogTitle>
												<DialogContent>
													<DialogContentText>Are You sure ?</DialogContentText>
												</DialogContent>
												<DialogActions>
													<Button onClick={this.handleClose} color="primary">
														Cancel
													</Button>
													<Button onClick={this.handleClose} color="primary" autoFocus>
														Delete
													</Button>
												</DialogActions>
											</Dialog>
										</div>
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
						rowsPerPage={rowsPerPage}
						className={classes.paginborder}
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
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomPaginationActionsTable);
