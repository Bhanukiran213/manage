import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TablePagination,
	TableRow,
	Paper,
	IconButton,
	TableHead,
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Switch
} from '@material-ui/core';

import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage, Delete, Edit } from '@material-ui/icons';

import { connect } from 'react-redux';

import { deleteChapter, updateChapterStatus } from '../../../actions/chapterActions';

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
		console.log(id);
		this.props.deleteChapter(this.props.courselevel, this.props.id, id);
		this.setState({ __Delete__Alert__: false });
	}
	onUpdateClick(id) {
		this.props.updateChapterStatus(this.props.courselevel, this.props.id, id, 2, this.props.history);
		window.location.reload();
	}
	onUpdate1Click(id) {
		this.props.updateChapterStatus(this.props.courselevel, this.props.id, id, 1, this.props.history);
		window.location.reload();
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
		if (this.props.chapters) {
			return (
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Chapter</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Edit</TableCell>
							<TableCell>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.chapters.map((row, i) => (
							<TableRow key={row._id}>
								<TableCell component="th" scope="row">
									{row.chapter}
								</TableCell>
								{row.status == 1 ? (
									<TableCell>
										{' '}
										<Switch checked={true} onClick={this.onUpdateClick.bind(this, row._id)} />
									</TableCell>
								) : (
									<TableCell>
										{' '}
										<Switch checked={false} onClick={this.onUpdate1Click.bind(this, row._id)} />
									</TableCell>
								)}
								<TableCell>
									<Link
										to={`/Edit_Chapter/${this.props.courselevel}/${this.props
											.id}/${row._id}/p/section`}
									>
										{' '}
										<IconButton aria-label="Edit">
											<Edit />
										</IconButton>
									</Link>
								</TableCell>

								<TableCell>
									<Button onClick={this.Delete__Alert__Model__Open__}>
										<Delete />
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
								count={this.props.chapters.length}
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
	deleteChapter: PropTypes.func.isRequired,
	updateChapterStatus: PropTypes.func.isRequired
};

export default connect(null, { deleteChapter, updateChapterStatus })(withStyles(styles)(CustomPaginationActionsTable));
