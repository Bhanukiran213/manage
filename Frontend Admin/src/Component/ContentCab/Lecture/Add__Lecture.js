import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { TableRow, TablePagination, TableCell, TableBody, Table } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { Edit } from '@material-ui/icons';
import './App.css';

import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { fade } from '@material-ui/core/styles/colorManipulator';
import { getLectures, deleteLecture } from '../../../actions/lectureActions';
import { connect } from 'react-redux';

import Slide from '@material-ui/core/Slide';
import { Add } from '@material-ui/icons';
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
	pagina: {
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
	error: {
		color: theme.palette.error.dark
	}
});
function Transition(props) {
	return <Slide direction="up" {...props} />;
}
class CustomPaginationActionsTable extends React.Component {
	state = {
		open: false,
		rows: [],
		page: 0,
		rowsPerPage: 10
	};

	componentDidMount() {
		this.props.getLectures();
		this.setState({ lectures: this.props.lecture });
	}
	onDeleteClick(id) {
		this.props.deleteLecture(id);
		this.setState({ open: false });
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
		const { rowsPerPage, page } = this.state;

		const { lectures } = this.props.lecture;

		const k = 1;
		for (let i = 0; i < lectures.length; i++) {
			lectures[i].sno = k + +i;
			console.log(k);
		}
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav}>
						<li class="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							Lecture List
						</li>
					</ol>
				</nav>

				<div className={classes.cardposition}>
					<Link to="/Create__NewLecture">
						<Tooltip title="Create new Lecture" placement="right">
							<button id="btn_chip" variant="outlined" className={classes.chip}>
								<Add className={classes.addicon} />Create new Lecture
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
							<TableCell style={tablecolor}>S.No</TableCell>
							<TableCell style={tablecolor}>Lecture Name</TableCell>

							<TableCell style={tablecolor}>Edit</TableCell>
							<TableCell style={tablecolor}>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tablebody}>
						{lectures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow key={row._id}>
									<TableCell component="th" scope="row">
										{row.sno}
									</TableCell>
									<TableCell>{row.title}</TableCell>

									<TableCell id="newwidth2">
										<Tooltip title="Edit Lecture">
											<Link to={`/Edit__lecture/${row._id}`} className="decoration">
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
												onClick={this.onDeleteClick.bind(this, row._id)}
											>
												<DeleteIcon />
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
					rowsPerPageOptions={[ 10, 20, 30 ]}
					colSpan={12}
					count={lectures.length}
					className={classes.pagina}
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
	getLectures: PropTypes.func.isRequired,
	lecture: PropTypes.object.isRequired,
	lectures: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	lecture: state.lecture,
	lectures: state.lectures
});

export default connect(mapStateToProps, { getLectures, deleteLecture })(
	withStyles(styles)(CustomPaginationActionsTable)
);
