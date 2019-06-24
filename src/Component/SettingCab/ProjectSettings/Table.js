import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';

import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';

import { deleteLevel } from '../../../actions/courselevelActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EdiText from 'react-editext';
import { Link } from 'react-router-dom';

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

const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3
	},
	table: {
		minWidth: 500
	},
	tableWrapper: {
		overflowX: 'auto'
	}
});

class CustomPaginationActionsTable extends React.Component {
	state = {
		__Delete__Alert__: false,
		rows: [].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
		page: 0,
		rowsPerPage: 5
	};

	onDeleteClick(id) {
		this.props.deleteLevel(this.props.d, id);
		this.setState({ __Delete__Alert__: false });
	}

	Delete__Alert__Model__Open__ = () => {
		this.setState({ __Delete__Alert__: true });
	};

	Delete__Alert__Model__Close__ = () => {
		this.setState({ __Delete__Alert__: false });
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: event.target.value });
	};
	onSave = (val) => {
		console.log('Edited Value -> ', val);
	};
	render() {
		const { classes } = this.props;
		const { rowsPerPage, page } = this.state;

		console.log(this.props.levels);
		if (this.props.levels) {
			return (
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Courselevel</TableCell>
							<TableCell>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.levels.map((row, i) => (
							<TableRow key={row.id}>
								<TableCell component="th" scope="row">
									<EdiText
										type="text"
										value={
											<Link to={`/Courses__list/${this.props.d}/${row.courselevel}`}>
												{' '}
												{row.courselevel}
											</Link>
										}
										onSave={this.onSave}
									/>
								</TableCell>

								<TableCell>
									<Button onClick={this.Delete__Alert__Model__Open__}>
										<DeleteIcon onClick={this.onDeleteClick.bind(this, row._id)} />
									</Button>
									<Dialog
										open={this.state.__Delete__Alert__}
										onClose={this.Delete__Alert__Model__Close__}
										aria-labelledby="form-dialog-title"
									>
										<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
										<DialogContent>
											<DialogContentText>ss</DialogContentText>
											<TextField
												autoFocus
												margin="dense"
												id="name"
												label="Email Address"
												type="email"
												fullWidth
											/>
										</DialogContent>
										<DialogActions>
											<Button onClick={this.Delete__Alert__Model__Close__} color="primary">
												Cancel
											</Button>
											<Button onClick={this.onDeleteClick.bind(this, row._id)} color="primary">
												Delete
											</Button>
										</DialogActions>
									</Dialog>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[ 5, 10, 25 ]}
								colSpan={12}
								count={this.props.levels.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									native: true
								}}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={this.handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActionsWrapped}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			);
		}
		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper} />
			</Paper>
		);
	}
}

CustomPaginationActionsTable.propTypes = {
	classes: PropTypes.object.isRequired,
	deleteLevel: PropTypes.func.isRequired
};

export default connect(null, { deleteLevel })(withStyles(styles)(CustomPaginationActionsTable));
