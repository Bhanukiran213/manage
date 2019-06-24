import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom';
import { addPlaylist } from '../../../actions/playlistActions';
import { connect } from 'react-redux';
const styles = {
	appBar: {
		position: 'relative'
	},
	flex: {
		flex: 1
	}
};

const nav = {
	background: '#fafafa',
	borderRadius: '0px',
	textAlign: 'left',
	padding: '20px 0px',
	marginTop: '-50px',
	borderBottom: '1px solid #e6e3e3'
};

const ho = {
	width: 500,
	height: 40,
	marginLeft: 20,
	marginTop: 20
};

class FullScreenDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			errors: {},
			open: false,
			shown: true
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const newBook = {
			title: this.state.title
		};
		this.props.addPlaylist(newBook, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	toggle() {
		this.setState({
			shown: !this.state.shown
		});
	}
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		const { errors } = this.state;
		console.log(errors);

		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav}>
						<li class="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li class="breadcrumb-item">
							<Link to="/__Add__Play__List">Play List</Link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							Add Play List
						</li>
					</ol>
				</nav>
				<div className="TextField-without-border-radius fieldset">
					<form onSubmit={this.onSubmit} error>
						<TextField
							id="outlined-email-input"
							label=" Title"
							className={classes.textField}
							name="title"
							type="title"
							value={this.state.title}
							onChange={this.onChange}
							error={errors.title}
							style={ho}
							autoComplete="text"
							margin="normal"
							variant="outlined"
						/>
						<button
							type="submit"
							id="btnchip_play"
							onClick={this.toggle.bind(this)}
							className={classes.button}
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	}
}

FullScreenDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	addplaylist: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	playlist: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	playlist: state.playlist,
	errors: state.errors
});

export default connect(mapStateToProps, { addPlaylist })(withStyles(styles)(FullScreenDialog));
