import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';

import { deleteLectureCourse, updateLectureCourse } from '../../../actions/lectureActions';

import { Switch } from '@material-ui/core';
import { connect } from 'react-redux';

const Page_position = {
	float: 'right',
	fontFamily: 'ubuntu',
	border: '0px'
};

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

	tableWrapper: {
		overflowX: 'auto'
	},
	tablebody: {
		background: 'white',
		fontSize: 12,
		fontFamily: 'ubuntu',
		padding: 0
	},
	table: {
		background: '#f1f1f1',
		marginTop: '-20px'
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
const tablecolor = {
	color: '#464646',
	fontWeight: 600,
	fontFamily: 'ubuntu',
	border: '1px solid rgb(230, 227, 227)'
};
class CustomPaginationActionsTable extends React.Component {
	state = {
		rows: [].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
		page: 0,
		open: false,
		rowsPerPage: 10
	};
	onDeleteClick(id) {
		this.props.deleteLectureCourse(this.props.d, id);
		this.setState({ open: false });
	}
	onUpdateClick(id) {
		this.props.updateLectureCourse(this.props.d, id, 0, this.props.history);
		window.location.reload();
	}
	onUpdate1Click(id) {
		this.props.updateLectureCourse(this.props.d, id, 1, this.props.history);
		window.location.reload();
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

		if (this.props.chapters) {
			return (
				<div>
					<Table className={classes.root}>
						<TableHead className={classes.table}>
							<TableRow>
								<TableCell style={tablecolor}>Courses</TableCell>

								<TableCell style={tablecolor}>Papers</TableCell>
								<TableCell style={tablecolor}>Chapters</TableCell>
								<TableCell style={tablecolor}>Status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody className={classes.tablebody}>
							{this.props.chapters
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((chart, i) => (
									<TableRow key={chart._id}>
										<TableCell component="th" scope="row">
											{chart.course}
										</TableCell>
										<TableCell>
											{chart.chapter_id.papers ? chart.chapter_id.papers : null}
										</TableCell>
										<TableCell>
											{chart.chapter_id.chapters[0] ? chart.chapter_id.chapters[0] : null}
										</TableCell>
										{chart.admin_status == 1 ? (
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
													onClick={this.onUpdateClick.bind(this, chart._id)}
												/>
											</TableCell>
										) : (
											<TableCell>
												{' '}
												<Switch
													checked={false}
													onClick={this.onUpdate1Click.bind(this, chart._id)}
												/>
											</TableCell>
										)}
										{/* <TableCell  >
                  <Button color="primary" onClick={this.handleClickOpen}>
        <DeleteIcon />
        </Button>
                  <Dialog
         
         keepMounted
         open={this.state.open}
         onClose={this.handleClose}
         aria-labelledby="responsive-dialog-title"
       >
         <DialogTitle id="responsive-dialog-title"><i class="fas fa-exclamation-triangle"></i>{" Really,Do You Want To Delete "}</DialogTitle>
         <DialogContent>
           <DialogContentText>
           Are You sure ?
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={this.handleClose} color="primary">
             Cancel
           </Button>
           <Button onClick={this.onDeleteClick.bind(this, chart._id)}  color="primary" autoFocus>
             Delete
           </Button>
         </DialogActions>
       </Dialog> </TableCell> */}
									</TableRow>
								))}
						</TableBody>
					</Table>
					<TablePagination
						style={Page_position}
						rowsPerPageOptions={[ 10, 20, 30 ]}
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
				</div>
			);
		} else {
			return null;
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
	deleteLectureCourse: PropTypes.func.isRequired,
	updateLectureCourse: PropTypes.func.isRequired
};

export default connect(null, { deleteLectureCourse, updateLectureCourse })(
	withStyles(styles)(CustomPaginationActionsTable)
);
