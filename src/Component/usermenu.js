import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	paper: {
		marginRight: theme.spacing.unit * 2
	}
});

class MenuListComposition extends React.Component {
	state = {
		open: false
	};

	handleToggle = () => {
		this.setState((state) => ({ open: !state.open }));
	};

	handleClose = (event) => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		this.setState({ open: false });
	};
	onLogoutClick(e) {
		e.preventDefault();

		this.props.logoutUser();
		this.setState({ open: false });
	}
	render() {
		const { classes } = this.props;
		const { open } = this.state;
		const { isAuthenticated, user } = this.props.auth;
		return (
			<div className={classes.root}>
				{isAuthenticated ? (
					<div>
						<Button
							color="secondary"
							buttonRef={(node) => {
								this.anchorEl = node;
							}}
							aria-owns={open ? 'menu-list-grow' : undefined}
							aria-haspopup="true"
							onClick={this.handleToggle}
						>
							<i class="far fa-user" style={{ fontSize: 17, color: 'blue' }} />
						</Button>
						<Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									id="menu-list-grow"
									style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
								>
									<Paper>
										<ClickAwayListener onClickAway={this.handleClose}>
											<MenuList>
												<MenuItem onClick={this.handleClose}>My account</MenuItem>
												<MenuItem onClick={this.onLogoutClick.bind(this)}>Logout</MenuItem>
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</div>
				) : null}
			</div>
		);
	}
}

MenuListComposition.propTypes = {
	classes: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(MenuListComposition));
