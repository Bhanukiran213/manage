import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { TableRow, Switch } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
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
import axios from 'axios';
import { connect } from 'react-redux';
import { addChapter1, getChapterbyid1 } from '../../../actions/chapterActions';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import { Link } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';

import EdiText from 'react-editext';
import TableChapter from './TableChapter';

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
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		marginTop: -50,
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
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 250
	},
	textField_: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 517
	}
});

class CustomPaginationActionsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chapter: '',
			image: '',
			file: '',
			section: '',
			unit: '',
			sub_unit: '',
			description: '',
			open: false,
			checkedB: false,
			__Delete__Alert__: false,
			message: 'Title Editing Here',
			rows: [].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
			page: 0,
			rowsPerPage: 5,
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.dataChanged = this.dataChanged.bind(this);
		this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
	}

	componentDidMount() {
		this.props.getChapterbyid1(this.props.match.params.courselevel, this.props.match.params.id);
	}

	onSubmit(e) {
		e.preventDefault();

		const formData = new FormData();
		formData.append('file', this.state.image[0]);
		if (this.state.image.length == 1) {
			axios
				.post(`/api/faculty/upload/o`, formData, {
					headers: {}
				})
				.then((response) => {
					console.log(response.data.name);
					// console.log(this.state.file[0].name);
					this.setState({ image: response.data.name });
					console.log(this.state.file);
				});
			const newBook = {
				chapter: this.state.chapter,
				section: this.state.section,
				unit: this.state.unit,
				sub_unit: this.state.sub_unit,
				description: this.state.description,
				image: this.state.image[0].name
			};
			this.props.addChapter1(
				this.props.match.params.courselevel,
				this.props.match.params.id,
				newBook,
				this.props.history
			);
			// this.props.history.push('/addlevel/'+this.props.match.params.id);
			window.location.reload();
		} else {
			const newBook = {
				chapter: this.state.chapter,
				section: this.state.section,
				unit: this.state.unit,
				sub_unit: this.state.sub_unit,
				description: this.state.description,
				image: this.state.image
			};
			this.props.addChapter1(
				this.props.match.params.courselevel,
				this.props.match.params.id,
				newBook,
				this.props.history
			);
			// this.props.history.push('/addlevel/'+this.props.match.params.id);
			window.location.reload();
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleFileUpload = (event) => {
		this.setState({ image: event.target.files });
		console.log(event.target.files);
		console.log(this.state.image);
	};

	onSave = (val) => {
		console.log('Edited Value -> ', val);
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
	dataChanged(data) {
		// data = { description: "New validated text comes here" }
		// Update your model from here
		console.log(data);
		this.setState({ ...data });
	}

	customValidateText(text) {
		return text.length > 0 && text.length < 64;
	}
	handleChangeSwitch = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};
	Delete__Alert__Model__Open__ = () => {
		this.setState({ __Delete__Alert__: true });
	};

	Delete__Alert__Model__Close__ = () => {
		this.setState({ __Delete__Alert__: false });
	};
	render() {
		const { classes } = this.props;
		const { rows, rowsPerPage, page } = this.state;

		const { fullScreen } = this.props;

		const alertbox = {
			background: 'red'
		};
		const danger_icon = {
			color: 'red'
		};
		const { chapter } = this.props.chapter;
		console.log(this.state.image);
		const { errors } = this.state;
		const nav = { background: 'white' };
		console.log(this.props.project);
		const g = (
			<TableChapter
				id={this.props.match.params.id}
				courselevel={this.props.match.params.courselevel}
				chapters={chapter.chapters}
			/>
		);
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
						<li className="breadcrumb-item">
							<a href="/%20__Project__Setting__">Project </a>
						</li>

						<li className="breadcrumb-item ">
							<a href={`/ProjectSetting/${this.props.project}`}>Course list</a>
						</li>
					</ol>
				</nav>
				<Card className={classes.cardposition}>
					<Link to="#" className="decoration">
						<Tooltip title="Add Chapter" placement="right">
							<Fab
								color="primary"
								size="large"
								aria-label="Add"
								id="widthicon"
								onClick={this.handleClickOpen}
							>
								<AddIcon />
							</Fab>
						</Tooltip>
					</Link>

					<div>
						<Dialog
							fullScreen={fullScreen}
							open={this.state.open}
							onClose={this.handleClose}
							aria-labelledby="responsive-dialog-title"
						>
							<DialogTitle id="responsive-dialog-title">{'Add Chapter'}</DialogTitle>
							<DialogContent>
								<DialogContentText>
									<form onSubmit={this.onSubmit} error>
										<TextField
											id="outlined-email-input"
											label="Chapter"
											className={classes.textField}
											name="chapter"
											type="chapter"
											value={this.state.chapter}
											onChange={this.onChange}
											error={errors.chapter}
											autoComplete="text"
											margin="normal"
											variant="outlined"
										/>
										<TextField
											id="outlined-email-input"
											label="Section "
											className={classes.textField}
											name="section"
											type="section"
											value={this.state.section}
											onChange={this.onChange}
											error={errors.section}
											autoComplete="text"
											margin="normal"
											variant="outlined"
										/>
										<TextField
											id="outlined-email-input"
											label="Unit "
											className={classes.textField}
											name="unit"
											type="unit"
											value={this.state.unit}
											onChange={this.onChange}
											error={errors.unit}
											autoComplete="text"
											margin="normal"
											variant="outlined"
										/>

										<TextField
											id="outlined-email-input"
											label="Sub Unit "
											className={classes.textField}
											name="sub_unit"
											type="sub_unit"
											value={this.state.sub_unit}
											onChange={this.onChange}
											error={errors.sub_unit}
											autoComplete="text"
											margin="normal"
											variant="outlined"
										/>

										<TextField
											id="outlined-email-input"
											label="Description "
											className={classes.textField_}
											name="description"
											type="description"
											value={this.state.description}
											onChange={this.onChange}
											error={errors.description}
											multiline
											rows="4"
											autoComplete="text"
											margin="normal"
											variant="outlined"
										/>
										<TextField
											id="outlined-email-input"
											type="file"
											className={classes.textField_}
											onChange={this.handleFileUpload}
											name="file"
											autoComplete="text"
											margin="normal"
											variant="outlined"
										/>
										<DialogActions>
											<Button onClick={this.handleClose} color="primary">
												Close
											</Button>
											<Button type="submit" onClick={this.handleClose} color="primary" autoFocus>
												Submit
											</Button>
										</DialogActions>
									</form>
								</DialogContentText>
							</DialogContent>
						</Dialog>
					</div>
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

				<Paper className={classes.root}>
					<div className={classes.tableWrapper}>
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell> Chapter Level</TableCell>
									<TableCell> Status</TableCell>

									<TableCell>Edit</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
									return (
										<TableRow>
											<TableCell>
												<div className="container">
													<EdiText
														type="text"
														value="What is real? How do you define real?"
														onSave={this.onSave}
													/>
												</div>
											</TableCell>
											<TableCell>
												<Switch
													checked={this.state.checkedB}
													onChange={this.handleChangeSwitch('checkedB')}
													value="checkedB"
													color="primary"
												/>
											</TableCell>

											<TableCell>
												<Link to="/Edit_Chapter">
													{' '}
													<IconButton aria-label="Edit">
														<Edit />
													</IconButton>
												</Link>
											</TableCell>
											<TableCell>
												<div>
													<div>
														<IconButton
															aria-label="Edit"
															onClick={this.Delete__Alert__Model__Open__}
														>
															<DeleteIcon />
														</IconButton>
														<Dialog
															open={this.state.__Delete__Alert__}
															onClose={this.Delete__Alert__Model__Close__}
															aria-labelledby="form-dialog-title"
															style={alertbox}
														>
															<DialogTitle id="form-dialog-title">
																<i
																	className="fas fa-skull-crossbones"
																	style={danger_icon}
																/>
																{' Really,Do You Want To Delete '}
															</DialogTitle>
															<DialogContent>
																<DialogContentText>Are You sure ?</DialogContentText>
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
																<Button
																	onClick={this.Delete__Alert__Model__Close__}
																	color="primary"
																>
																	Cancel
																</Button>
																<Button
																	onClick={this.Delete__Alert__Model__Close__}
																	color="primary"
																>
																	Delete
																</Button>
															</DialogActions>
														</Dialog>
													</div>
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
				</Paper>
				{g}
			</div>
		);
	}
}

CustomPaginationActionsTable.propTypes = {
	classes: PropTypes.object.isRequired,
	addChapter1: PropTypes.func.isRequired,
	courselevel: PropTypes.object.isRequired,
	getChapterbyid1: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	chapter: state.chapter,
	courselevel: state.courselevel,
	errors: state.errors
});

export default connect(mapStateToProps, { getChapterbyid1, addChapter1 })(
	withStyles(styles)(CustomPaginationActionsTable)
);
