import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Table from './Table';
import Add__Feature from './Add__Feature';
import { updatePlaylist, getPlaylist } from '../../../actions/playlistActions';

import { Link } from 'react-router-dom';
const styles = {
	appBar: {
		position: 'relative'
	},
	flex: {
		flex: 1
	},
	textField: {
		height: 40
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

const add__feature = {
	float: 'right',
	marginTop: -83
};
const ho = {
	width: 500,
	marginLeft: 20,
	marginTop: 20
};
const btn = {
	marginLeft: 20,
	height: 33,
	marginTop: 23
};

const cardSpacer = {
	marginBottom: 10
};

class FullScreenDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',

			open: false,
			shown: true,
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
		this.props.getPlaylist(this.props.match.params.id);
		//const{playlist}=this.props;
		//this.setState(this.props.playlist)
		//console.log(playlist)
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.playlist.playlist) {
			const playlist = nextProps.playlist.playlist;
			this.setState({
				title: playlist.title
			});
			console.log(playlist.title);
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const bookData = {
			title: this.state.title
		};

		this.props.updatePlaylist(this.props.match.params.id, bookData, this.props.history);
		this.props.history.push('/__Add__Play__List');
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

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
		var shown = {
			display: this.state.shown ? 'block' : 'none'
		};

		const { playlist } = this.props.playlist;
		console.log(playlist);
		const g = playlist.Features;
		console.log(g);
		const { errors } = this.state;
		const t = <Add__Feature id={this.props.match.params.id} />;

		const f = <Table id={this.props.match.params.id} features={playlist.Features} />;
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
							Edit Play List
						</li>
					</ol>
				</nav>
				<div style={cardSpacer}>
					<form onSubmit={this.onSubmit} error>
						<div className="TextField-without-border-new-radius fieldset">
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
								id="btnchip"
								style={btn}
								onClick={this.toggle.bind(this)}
								className={classes.button}
							>
								Submit
							</button>
						</div>
					</form>
					<div style={add__feature}>{t}</div>
				</div>

				{f}
			</div>
		);
	}
}

FullScreenDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	updatePlaylist: PropTypes.func.isRequired,

	playlist: PropTypes.object.isRequired,
	getPlaylist: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	playlist: state.playlist,
	errors: state.errors
});
export default connect(mapStateToProps, { updatePlaylist, getPlaylist })(withStyles(styles)(FullScreenDialog));
