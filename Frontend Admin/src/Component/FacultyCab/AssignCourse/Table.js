import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import { getAscourse, deleteAscourse } from '../../../actions/ascourseActions';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const actionsStyles = (theme) => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5
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

const tablecolor = {
	color: '#464646',
	fontWeight: 600,
	fontFamily: 'ubuntu',
	border: '1px solid rgb(230, 227, 227)'
};

const styles = (theme) => ({
	root: {
		width: '100%',

		float: 'left'
	},

	tableWrapper: {
		overflowX: 'auto'
	},
	pagina: {
		float: 'right',
		border: 'none'
	},

	tablebody: {
		background: 'white',
		fontSize: 12,
		fontFamily: 'ubuntu',
		padding: 0
	},
	error: {
		color: theme.palette.error.dark
	}
});
const Page_position = {
	float: 'right',
	fontFamily: 'ubuntu',
	border: '0px'
};
class CustomPaginationActionsTable extends React.Component {
	state = {
		open: false,
		rows: [],
		page: 0,
		rowsPerPage: 10
	};
	onDeleteClick = (id) => {
		console.log(id);

		this.props.deleteAscourse(id);
		this.setState({ open: false });
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
		const { rowsPerPage, page } = this.state;

		console.log(this.props.filt);
		console.log(this.props.filt1);
		console.log(this.props.filt2);
		const g = this.props.filt || this.props.filt1 || this.props.filt3;
		return (
			<div>
				<Table className={classes.root}>
					<TableHead className={classes.table}>
						<TableRow>
							<TableCell style={tablecolor}>Courses</TableCell>
							<TableCell style={tablecolor}>Series</TableCell>
							<TableCell style={tablecolor}>Papers</TableCell>
							<TableCell style={tablecolor}>Chapters</TableCell>
							<TableCell style={tablecolor}>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tablebody}>
						{g.map((row_) => (
							<TableRow key={row_._id}>
								<TableCell component="th" scope="row">
									{row_.course}
								</TableCell>
								<TableCell>{row_.series}</TableCell>
								<TableCell>{row_.papers}</TableCell>
								<TableCell>{row_.chapters}</TableCell>
								<TableCell>
									<Button className={classes.error} onClick={this.onDeleteClick.bind(this, row_._id)}>
										<DeleteIcon />
									</Button>
									<Dialog
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
											<Button
												onClick={this.onDeleteClick.bind(this, row_._id)}
												color="primary"
												autoFocus
											>
												Delete
											</Button>
										</DialogActions>
									</Dialog>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<TablePagination
					style={Page_position}
					rowsPerPageOptions={[ 10, 20, 30 ]}
					colSpan={12}
					count={g.length}
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
	deleteAscourse: PropTypes.func.isRequired
};

export default connect(null, { deleteAscourse })(withStyles(styles)(CustomPaginationActionsTable));
