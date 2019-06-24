import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import axios from 'axios';
import Card from '@material-ui/core/Card';

import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import { updateChapter, getChapterbyexpid } from '../../../actions/chapterActions';

let counter = 0;
function createData(name, calories, fat) {
	counter += 1;
	return { id: counter, name, calories, fat };
}

const styles = (theme) => ({
	root: {},
	table: {},
	tableWrapper: {
		overflowX: 'auto'
	},
	button: {
		margin: theme.spacing.unit,
		marginLeft: 250
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
		width: 540,
		height: 470
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
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap'
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

			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getChapterbyexpid(
			this.props.match.params.courselevel,
			this.props.match.params.paperid,
			this.props.match.params.chapterid
		);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.chapter.chapter) {
			const chapter = nextProps.chapter.chapter;
			this.setState({
				chapter: chapter.chapter,
				image: chapter.image,
				section: chapter.section,
				unit: chapter.unit,
				sub_unit: chapter.sub_unit,
				description: chapter.description
			});
		}
	}
	onSubmit(e) {
		e.preventDefault();
		const { chapter } = this.props.chapter;
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
			this.props.updateChapter(
				this.props.match.params.courselevel,
				this.props.match.params.paperid,
				this.props.match.params.chapterid,
				newBook,
				this.props.history
			);
			this.props.history.push(
				'/Chapter/' + this.props.match.params.courselevel + '/' + this.props.match.params.paperid
			);
		} else {
			const newBook = {
				chapter: this.state.chapter,
				section: this.state.section,
				unit: this.state.unit,
				sub_unit: this.state.sub_unit,
				description: this.state.description,
				image: chapter.image
			};
			this.props.updateChapter(
				this.props.match.params.courselevel,
				this.props.match.params.paperid,
				this.props.match.params.chapterid,
				newBook,
				this.props.history
			);
			this.props.history.push(
				'/Chapter/' + this.props.match.params.courselevel + '/' + this.props.match.params.paperid
			);
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

	render() {
		const { classes } = this.props;
		const { errors } = this.state;
		const nav = { background: 'white' };
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
							<a href="#">Project </a>
						</li>

						<li className="breadcrumb-item ">
							<a href="#">Project Setting </a>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Add Course Level{' '}
						</li>
					</ol>
				</nav>
				<Card className={classes.cardposition}>
					<form className={classes.container} onSubmit={this.onSubmit} error>
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
							name="image"
							autoComplete="text"
							margin="normal"
							variant="outlined"
						/>

						<Button type="submit" variant="outlined" color="secondary" className={classes.button}>
							Submit
						</Button>
					</form>
				</Card>
			</div>
		);
	}
}

CustomPaginationActionsTable.propTypes = {
	classes: PropTypes.object.isRequired,
	updateChapter: PropTypes.func.isRequired,
	chapter: PropTypes.object.isRequired,
	getChapterbyexpid: PropTypes.func.isRequired,

	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	chapter: state.chapter,
	errors: state.errors
});
export default connect(mapStateToProps, { updateChapter, getChapterbyexpid })(
	withStyles(styles)(CustomPaginationActionsTable)
);
