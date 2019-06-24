import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
	createMuiTheme,
	Collapse,
	Tooltip,
	ListItemText,
	ListItemIcon,
	ListItem,
	List,
	IconButton,
	Divider,
	Typography,
	Toolbar,
	AppBar,
	Drawer,
	CssBaseline,
	withStyles,
	Paper
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';

import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import './App.css';
import Admin from './amin';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { Provider } from 'react-redux';
//Faculty Imports
import store from '../store';
import Add__faculty from './FacultyCab/Add_Faculty/Add_Faculty';
import Edit__Faculty from './FacultyCab/Add_Faculty/Edit_Faculty';
import Faculty from './FacultyCab/Add_Faculty/Faculty';

import Ass__Courses from './FacultyCab/AssignCourse/AssignCourses';
import __Edit__Courses from './FacultyCab/AssignCourse/__Editcourses';

import Booking__list from './FacultyCab/BookingList';

//Playlist
import Create__PlayList from './ContentCab/Playlist/Create__PlaYList';
import Edit__Play__List from './ContentCab/Playlist/Edit__Play__List';
import __Add__Play__List from './ContentCab/Playlist/AddPlayList';

import __Add__Lecture from './ContentCab/Lecture/Add__Lecture';
import Edit__lecture from './ContentCab/Lecture/Edit__Lecture';
import Edit__Assing__Courses from './ContentCab/Lecture/Edit__Assign__Courses';
import Only__Assign__Course from './ContentCab/Lecture/only__Assign__Courses';
import Create__NewLecture from './ContentCab/Lecture/Create__NewLecture';

import __Credit__value from './Package/Credit/_Credit__value';

import __Demo__package from './Package/DemoPackage/Demo__Package';

import __Add__Package from './Package/AddPackage/__ADD__Package__';
import Edit__Package from './Package/AddPackage/__Edit__Old__Package';
import Create__Package from './Package/AddPackage/Create__Package';

import __Top__Up__ from './Package/Topup/__Top__Up';
import Add__Top__up from './Package/Topup/Add__Top__Up';
import Edit__TopUp from './Package/Topup/Edit__TopUp';

import Offlineuserlist from './Package/AddPromoCoupon/OfflineUserList';
import __Add__Promo__coupon__ from './Package/AddPromoCoupon/Add__promo__Coupon';
import Create__Offline__offers from './Package/AddPromoCoupon/Create__Offfline__offers';
import Create__Offline__Users from './Package/AddPromoCoupon/Create__Offline__Users';
import __Sale__Force__Coupon__ from './Package/SalesForce__coupon';
import Sales__Force__Offer__list from './Package/SalesforceOffer__List';
import Add__Refund from './Package/Add__Refund';

import __Refund__Credit__ from './Package/__Refund__Credit';

import __Student__list__ from './StudentCab/StudentList';
import __Question__Answer from './StudentCab/__QuestionandAnswer';

import PrivateRoute from '../PrivateRoute';

import __Studio__list from './SettingCab/Studio/Studio__List';
import Add_Studio from './SettingCab/Studio/Add__Studio';
import Edit__Studio from './SettingCab/Studio/Edit__Studio';

import Edit__Time__Slot from './SettingCab/Timeslots/Edit__Time__Slot';
import Add__Time__Slot from './SettingCab/Timeslots/Add__Time__Slot';
import Add__Courses from './SettingCab/Add__Courses';
import __Time_Slot from './SettingCab/Timeslots/__Time__Slot';

import ProjectSetting from './SettingCab/ProjectSettings/AddCourse';
import __Project__Setting__ from './SettingCab/ProjectSettings/__Project__Setting__';
import AddLevelOfCourse from './SettingCab/ProjectSettings/AddLevelofCourses';
import Courses__list from './SettingCab/ProjectSettings/AddPaper';
import Chapter from './SettingCab/ProjectSettings/Chapters';
import Edit_Chapter from './SettingCab/ProjectSettings/Chapter_Edit';

import __NewsLetter__ from './Newsletter/__newsLetter';
import __Faculty__Feedback from './SupportCab/Faculty__Feedback';
import __Student__Feedback__ from './SupportCab/Student__Feedback';

import __Sub__Admin__ from './SubAdmin/__Sub__Admin';
import Edit__Admin from './SubAdmin/Edit__Admin';
import Create_New__Sub__Admin from './SubAdmin/Create__Subadmin';
import CopyRight from './Copy__Right';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from './icons/logo.png';
import AdminSettingMenu from './usermenu';
import TinyCME from './StudentCab/TinyMCE';
//import { Scrollbars } from 'react-custom-scrollbars';
import './scrollbar.css';

const drawerWidth = 220;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	toolbar: {
		// paddingRight: 24,
		// color: 'white'
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'left',
		justifyContent: 'flex-end',
		marginTop: '-10px',
		padding: '0 1px',

		...theme.mixins.toolbar
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: '#fff',
		height: 40,
		borderBottom: '1px solid #dadadaad',
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},

	menuButtonHidden: {
		display: 'none'
	},
	title: {
		flexGrow: 1,
		color: '#444',
		marginTop: '-1.5rem',
		fontWeight: 400,
		fontFamily: 'Ubuntu',
		fontSize: '18px'
	},
	Sublist: {
		background: '#19212b',
		color: '#262f3d'
	},
	childlistitemtext: {
		color: '#c3c3c3',
		fontFamily: 'Ubuntu',
		textDecoration: 'none'
	},
	drawerPaper: {
		width: 250,
		overflow: 'auto',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			overflow: 'auto',
			width: drawerWidth,
			position: 'relative',
			height: '100%',
			color: '#c3c3c3'
		},
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		//height: '100vh',
		overflow: 'hidden', // Main Menu or Drawer scrollbar
		position: 'absolute',
		whiteSpace: 'nowrap',
		//width: drawerWidth,
		background: '#262f3d',
		color: '#c3c3c3',
		fontFamily: 'Ubuntu'
		// transition: theme.transitions.create('width', {
		// 	easing: theme.transitions.easing.sharp,
		// 	duration: theme.transitions.duration.enteringScreen
		// })
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		'text-indent': '100%',
		'&:@media screen and (max-width: 48px)': {
			drawerPaperClose: {
				background: 'red'
			}
		},
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),

		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 5
		}
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,

		background: '#fafafa'
	},
	chartContainer: {
		marginLeft: -22
	},
	tableContainer: {
		height: 320
	},
	h5: {
		marginBottom: theme.spacing.unit * 2
	},
	divider: {
		marginTop: '-9px'
	},

	decoration: {
		TextDecoration: 'none'
	},

	closebtn: {
		width: 20,
		height: 20,
		marginTop: '14px',
		position: 'absolute'
	},

	menuItem: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			marginTop: '-150px',
			'& $primary, & $icon': {
				color: theme.palette.common.white
			}
		}
	},

	logo: {
		height: 37,
		marginLeft: 10,
		width: 143,
		marginTop: 3,
		float: 'left'
	},
	menuicon: {
		marginTop: -18
	},
	closebn: {
		float: 'right',
		position: 'relative',
		height: 30,
		width: 30,
		marginTop: 10
	},
	arrowcolor: {
		color: '#c3c3c3'
	},

	newicons: {
		marginLeft: 8,
		color: '#c3c3c3',

		fontSize: '0.7rem',
		TextDecoration: 'none'
	},
	adminAvatar: {
		marginTop: '-30px',
		color: 'red',

		'font-weight': 'bolder'
	}
});

const theme = createMuiTheme({
	overrides: {},
	typography: { useNextVariants: true },
	chevronLeftIco: {
		marginTop: -30
	},
	nested: {
		color: 'red'
	}
});

class Dashboard extends React.Component {
	state = {
		open: true,
		Addfaculty: false,
		ContentCab: false,
		PACKAGECab: false,
		StudentCab: false,
		SettingCab: false,
		NewsletterCab: false,
		SupportCab: false
	};

	__FacultyCab__ = () => {
		this.setState((state) => ({ Addfaculty: !state.Addfaculty }));
	};

	__Content__Cab__ = () => {
		this.setState((state) => ({ ContentCab: !state.ContentCab }));
	};

	__PackageCab = () => {
		this.setState((state) => ({ PACKAGECab: !state.PACKAGECab }));
	};

	__Student__Cab = () => {
		this.setState((state) => ({ StudentCab: !state.StudentCab }));
	};

	__Setting__Cab = () => {
		this.setState((state) => ({ SettingCab: !state.SettingCab }));
	};

	__NewsLetter__Cab = () => {
		this.setState((state) => ({ NewsletterCab: !state.NewsletterCab }));
	};

	__Support__Cab = () => {
		this.setState((state) => ({ SupportCab: !state.SupportCab }));
	};
	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		const { isAuthenticated, user } = this.props.auth;
		let a = 0;
		let c = 0;
		let d = 0;
		let e = 0;
		let f = 0;
		let g = 0;
		let s = 0;
		let b = 0;
		let h = 0;
		let k = 0;
		let l = 0;
		let m = 0;
		let n = 0;
		let o = 0;
		let p = 0;
		let q = 0;
		let r = 0;
		if (user.permissions) {
			for (let i = 0; i <= user.permissions.length; i++) {
				if (user.permissions[i] == 'Add Faculty') {
					a = 1;
				}
				if (user.permissions[i] == 'Assign Course') {
					b = 1;
				}
				if (user.permissions[i] == 'Booking List') {
					c = 1;
				}
				if (user.permissions[i] == 'Add Play List') {
					d = 1;
				}
				if (user.permissions[i] == 'Add Lecture') {
					e = 1;
				}
				if (user.permissions[i] == 'Credit Value') {
					f = 1;
				}
				if (user.permissions[i] == 'Demo Package') {
					g = 1;
				}
				if (user.permissions[i] == 'Add Package') {
					h = 1;
				}
				if (user.permissions[i] == 'Top up') {
					k = 1;
				}
				if (user.permissions[i] == 'Refund Add') {
					l = 1;
				}
				if (user.permissions[i] == 'Add Promo Coupon') {
					m = 1;
				}
				if (user.permissions[i] == 'SalesForce Coupon') {
					n = 1;
				}
				if (user.permissions[i] == 'Student List') {
					o = 1;
				}
				if (user.permissions[i] == 'Q & A') {
					p = 1;
				}
				if (user.permissions[i] == 'Studio List') {
					q = 1;
				}
				if (user.permissions[i] == 'Time Slot') {
					r = 1;
				}
				if (user.permissions[i] == 'Project Setting') {
					s = 1;
				}
			}
		}
		console.log(a);
		return (
			<Router>
				<div>
					<div className={classes.root}>
						<CssBaseline />
						{isAuthenticated ? (
							<div>
								<AppBar
									id="header"
									position="absolute"
									className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
								>
									<Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
										<IconButton
											color="inherit"
											aria-label="Open drawer"
											onClick={this.handleDrawerOpen}
											className={classNames(
												classes.menuicon,
												this.state.open && classes.menuButtonHidden
											)}
										>
											<MenuIcon style={{ color: '#111' }} />
										</IconButton>
										<Typography
											component="h2"
											variant="h6"
											color="blue"
											noWrap
											className={classes.title}
										>
											Dashboard
										</Typography>

										<div style={{ marginTop: -25, marginRight: 3 }}>
											{' '}
											<AdminSettingMenu />
										</div>

										<Typography style={{ marginTop: -25 }}> v1.0.2</Typography>
									</Toolbar>
								</AppBar>

								<Drawer
									class="scrollbar force-overflow"
									id="style-default"
									variant="permanent"
									classes={{
										paper: classNames(
											classes.drawerPaper,
											!this.state.open && classes.drawerPaperClose
										)
									}}
									open={this.state.open}
								>
									<div className={classes.toolbar} id="logo-background">
										<img src={Logo} className={classes.logo} />
										<IconButton onClick={this.handleDrawerClose}>
											{theme.direction === 'rtl' ? (
												<ChevronRightIcon />
											) : (
												<ChevronLeftIcon className={classes.arrowcolor} />
											)}
										</IconButton>
									</div>

									<Divider className={classes.divider} />
									<div class="scrollbar" id="style-1">
										<List>
											{' '}
											<Tooltip title="Dashboard" id="tooltip" placement="right">
												<Link to="/" id="link" style={{ textDecoration: 'none' }}>
													<ListItem button className={classes.childlistitemtext}>
														Dashboard
														<ListItemText />
													</ListItem>
												</Link>
											</Tooltip>
											<Divider />
											{/** 
          ****************************************************************************************** 
                             HERE STARTING  FACULTY CAB JSX CODE 
          ******************************************************************************************
          */}
											<Tooltip title="Faculty" id="tooltip" placement="right">
												<ListItem button onClick={this.__FacultyCab__} className="decoration">
													Faculty
													<ListItemText />
													{this.state.Addfaculty ? <ExpandLess /> : <ExpandMore />}
												</ListItem>
											</Tooltip>
											<Divider />
											<Collapse in={this.state.Addfaculty} timeout="auto" unmountOnExit>
												<List disablePadding className={classes.Sublist}>
													{user.role == 'Superadmin' || a == 1 ? (
														<Tooltip title="Add Faculty " placement="right">
															<Link
																to="/Faculty"
																className="decoration"
																style={{ textDecoration: 'none' }}
															>
																<ListItem button className={classes.childlistitemtext}>
																	<ListItemIcon className={classes.newicons}>
																		<i class="fas fa-address-card" />{' '}
																		<li className="mew">Add Faculty</li>
																	</ListItemIcon>
																	<ListItemText />
																</ListItem>
															</Link>
														</Tooltip>
													) : null}
													{user.role == 'Superadmin' || b == 1 ? (
														<Tooltip title="Assign Course " placement="right">
															<Link
																to="/Ass__Courses"
																className="decoration"
																style={{ textDecoration: 'none' }}
															>
																<ListItem button className={classes.nested}>
																	<ListItemIcon className={classes.newicons}>
																		<i class="fas fa-hands-helping" />{' '}
																		<li className="mew">Assign Courses</li>
																	</ListItemIcon>
																	<ListItemText />
																</ListItem>
															</Link>
														</Tooltip>
													) : null}
													{user.role == 'Superadmin' || c == 1 ? (
														<Tooltip title="Booking List" placement="right">
															<Link
																to="/Booking__list"
																className="decoration"
																style={{ textDecoration: 'none' }}
															>
																<ListItem button className={classes.nested}>
																	<ListItemIcon className={classes.newicons}>
																		<i class="fas fa-clipboard-list" />
																		<li className="mew">Booking List</li>
																	</ListItemIcon>
																	<ListItemText />
																</ListItem>
															</Link>
														</Tooltip>
													) : null}
												</List>
											</Collapse>
											<ListItem button onClick={this.__Content__Cab__}>
												Content
												<Tooltip title="Content" placement="right">
													<ListItemText />
												</Tooltip>
												{this.state.ContentCab ? <ExpandLess /> : <ExpandMore />}
											</ListItem>
											<Divider />
											<Collapse in={this.state.ContentCab} timeout="auto" unmountOnExit>
												<List className={classes.Sublist}>
													{user.role == 'Superadmin' || d == 1 ? (
														<Link
															to="/__Add__Play__List"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Add PlayList</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
													{user.role == 'Superadmin' || e == 1 ? (
														<Link
															to="/__Add__Lecture"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Add Lectures</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
												</List>
											</Collapse>
											{/** 
          ****************************************************************************************** 
                             HERE IS STARTING PACKAGE CAB JSX CODE
          ******************************************************************************************
          */}
											<ListItem button onClick={this.__PackageCab}>
												Sales and Promos
												<Tooltip title="Package" placement="right">
													<ListItemText />
												</Tooltip>
												{this.state.PACKAGECab ? <ExpandLess /> : <ExpandMore />}
											</ListItem>
											<Divider />
											<Collapse in={this.state.PACKAGECab} timeout="auto" unmountOnExit>
												<List className={classes.Sublist} disablePadding>
													{user.role == 'Superadmin' || f == 1 ? (
														<Link
															to="/__Credit__value"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															{' '}
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Credit Value</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
													{user.role == 'Superadmin' || g == 1 ? (
														<Link
															to="/__Demo__package"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Demo Package</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
													{user.role == 'Superadmin' || h == 1 ? (
														<Link
															to="/__Add__Package"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															{' '}
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Add Package</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
													{user.role == 'Superadmin' || k == 1 ? (
														<Link
															to="/__Top__Up__"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															{' '}
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Top Up</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
													{user.role == 'Superadmin' || l == 1 ? (
														<Link
															to="/__Refund__Credit__"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Refund Credit</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
													{user.role == 'Superadmin' || m == 1 ? (
														<Link
															to="/__Add__Promo__coupon__"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															{' '}
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Add Promo Coupon</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
													{user.role == 'Superadmin' || n == 1 ? (
														<Link
															to="/__Sale__Force__Coupon__"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Salesforce Coupon</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
												</List>
											</Collapse>
											{/** 
          ****************************************************************************************** 
                             HERE IS STARING STUDENT CAB JSX CODE 
          ******************************************************************************************
          */}
											<ListItem button onClick={this.__Student__Cab}>
												Student
												<Tooltip title="Student Cab" placement="right">
													<ListItemText />
												</Tooltip>
												{this.state.StudentCab ? <ExpandLess /> : <ExpandMore />}
											</ListItem>
											<Divider />
											<Collapse in={this.state.StudentCab} timeout="auto" unmountOnExit>
												<List className={classes.Sublist} disablePadding>
													{user.role == 'Superadmin' || o == 1 ? (
														<Link
															to="/__Student__list__"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															{' '}
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Student List</li>
																</ListItemIcon>
																<Tooltip title="Student List" placement="right">
																	<ListItemText />
																</Tooltip>
															</ListItem>
														</Link>
													) : null}
													{user.role == 'Superadmin' || p == 1 ? (
														<Link
															to="__Question__Answer"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															{' '}
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Q and A</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
												</List>
											</Collapse>
											{user.role == 'Superadmin' ? (
												<Link
													to="/__Sub__Admin__"
													className="decoration"
													style={{ textDecoration: 'none' }}
												>
													{' '}
													<ListItem button>
														Sub Admin
														<Tooltip title="Sub Admin Cab" placement="right">
															<ListItemText titile="CONTROL CAB" />
														</Tooltip>
													</ListItem>
													<Divider />
												</Link>
											) : null}
											{/** 
          ****************************************************************************************** 
                             JSX CODE OF SETTING CAB, CODE ARE STARTING HERE
          ******************************************************************************************
          */}
											<ListItem button onClick={this.__Setting__Cab}>
												Settings
												<Tooltip title="Setting Cab" placement="right">
													<ListItemText />
												</Tooltip>
												{this.state.SettingCab ? <ExpandLess /> : <ExpandMore />}
											</ListItem>
											<Divider />
											<Collapse in={this.state.SettingCab} timeout="auto" unmountOnExit>
												<List className={classes.Sublist} disablePadding>
													{user.role == 'Superadmin' || q == 1 ? (
														<Link
															to="/__Studio__list"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Studio List</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
													{user.role == 'Superadmin' || r == 1 ? (
														<Link
															to="/__Time_Slot"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															{' '}
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Time Slot</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
													{user.role == 'Superadmin' || s == 1 ? (
														<Link
															to="/ __Project__Setting__"
															className="decoration"
															style={{ textDecoration: 'none' }}
														>
															{' '}
															<ListItem button className={classes.nested}>
																<ListItemIcon>
																	<li className="mew">Project Setting</li>
																</ListItemIcon>
																<ListItemText />
															</ListItem>
														</Link>
													) : null}
												</List>
											</Collapse>
											{/** 
          ****************************************************************************************** 
                             JSX CODE OF NEWSLETTER CAB STARING FROM HERE
          ******************************************************************************************
          */}
										</List>
									</div>
								</Drawer>
							</div>
						) : null}
						{/** 
          ****************************************************************************************** 
                             PRODUCT FEATURE AND SUB FEATURE ROUTE STARTING FROM HERE 
          ******************************************************************************************
          */}
						{isAuthenticated ? (
							<main className={classes.content}>
								<div className={classes.appBarSpacer} />

								{/** 
            ******************************************************************************************
                                                FACULTY CAB ROUTE 
            ******************************************************************************************
			*/}

								<Provider store={store}>
									<Switch>
										<PrivateRoute exact path="/" component={Admin} />{' '}
									</Switch>
									<Switch>
										<PrivateRoute exact path="/Faculty" component={Faculty} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/Ass__Courses" component={Ass__Courses} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/Booking__list" component={Booking__list} />
									</Switch>

									{/** ----------------------------------------------------------------------------------------- */}

									{/** 
          ******************************************************************************************
                                            CONTENT CAB ROUTE 
          ******************************************************************************************
          */}
									<Switch>
										{' '}
										<PrivateRoute exact path="/__Add__Play__List" component={__Add__Play__List} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/__Add__Lecture" component={__Add__Lecture} />
									</Switch>

									{/**   
          ******************************************************************************************
                                        PACKAGE CAB ROUTE ARE STARTING  HERE
          ******************************************************************************************
          */}
									<Switch>
										<PrivateRoute exact path="/__Credit__value" component={__Credit__value} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/__Demo__package" component={__Demo__package} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/__Add__Package" component={__Add__Package} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/__Top__Up__" component={__Top__Up__} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/__Refund__Credit__" component={__Refund__Credit__} />
									</Switch>
									<Switch>
										<PrivateRoute
											exact
											path="/__Add__Promo__coupon__"
											component={__Add__Promo__coupon__}
										/>
									</Switch>
									<Switch>
										<PrivateRoute
											exact
											path="/__Sale__Force__Coupon__"
											component={__Sale__Force__Coupon__}
										/>
									</Switch>

									{/**   
          ******************************************************************************************
                                        STUDENT CAB ROUTE ARE STARTING  HERE
          ******************************************************************************************
          */}

									<Switch>
										<PrivateRoute exact path="/__Student__list__" component={__Student__list__} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/__Question__Answer" component={__Question__Answer} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/TinyCME" component={TinyCME} />
									</Switch>
									{/**   
          ******************************************************************************************
                                        SUB ADMIN  CAB ROUTE ARE STARTING  HERE TinyCME
          ******************************************************************************************
          */}

									<Switch>
										<PrivateRoute exact path="/__Sub__Admin__" component={__Sub__Admin__} />
									</Switch>

									{/**   
          ******************************************************************************************
                                        SETTING  CAB ROUTE ARE STARTING  HERE
          ******************************************************************************************
          */}
									<Switch>
										<PrivateRoute exact path="/__Studio__list" component={__Studio__list} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/__Time_Slot" component={__Time_Slot} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute
											exact
											path="/ __Project__Setting__"
											component={__Project__Setting__}
										/>
									</Switch>

									{/**   
          ******************************************************************************************
                                        NEWSLETTER  CAB ROUTE ARE STARTING  HERE
          ******************************************************************************************
          */}

									<Switch>
										<PrivateRoute exact path="/__NewsLetter__" component={__NewsLetter__} />
									</Switch>

									{/**   
          ******************************************************************************************
                                        SUPPORT  CAB ROUTE ARE STARTING  HERE
          ******************************************************************************************
          */}

									<Switch>
										{' '}
										<PrivateRoute
											exact
											path="/__Faculty__Feedback"
											component={__Faculty__Feedback}
										/>
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute
											exact
											path="/__Student__Feedback__"
											component={__Student__Feedback__}
										/>
									</Switch>

									<Switch>
										<PrivateRoute exact path="/assign/:id" component={__Edit__Courses} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/Add_faculty" component={Add__faculty} />
									</Switch>

									<Switch>
										<PrivateRoute exact path="/Edit__lecture/:id" component={Edit__lecture} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute
											exact
											path="/Edit__Assing__Courses"
											component={Edit__Assing__Courses}
										/>
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute
											exact
											path="/Only__Assign__Course/:id"
											component={Only__Assign__Course}
										/>
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/Create__NewLecture" component={Create__NewLecture} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/Create__PlayList" component={Create__PlayList} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/Edit__Package/:id" component={Edit__Package} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/Create__Package" component={Create__Package} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/Add__Top__up" component={Add__Top__up} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/Add__Refund" component={Add__Refund} />
									</Switch>
									<Switch>
										<PrivateRoute
											exact
											path="/Create__Offline__Users"
											component={Create__Offline__Users}
										/>
									</Switch>
									<Switch>
										<PrivateRoute
											exact
											path="/Create_New__Sub__Admin"
											component={Create_New__Sub__Admin}
										/>
									</Switch>

									<Switch>
										{' '}
										<PrivateRoute exact path="/Add_Studio" component={Add_Studio} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/Edit__Studio/:id" component={Edit__Studio} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/Edit__Time__Slot/:id" component={Edit__Time__Slot} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/Add__Time__Slot" component={Add__Time__Slot} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/Add__Courses" component={Add__Courses} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/ProjectSetting/:id" component={ProjectSetting} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/editplaylist/:id" component={Edit__Play__List} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/Edit__Faculty/:id" component={Edit__Faculty} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/Offlineuserlist/:id" component={Offlineuserlist} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute
											exact
											path="/Sales__Force__Offer__list"
											component={Sales__Force__Offer__list}
										/>
									</Switch>
									<Switch>
										<PrivateRoute exact path="/Edit__Admin/:id" component={Edit__Admin} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute exact path="/Edit__TopUp/:id" component={Edit__TopUp} />
									</Switch>
									<Switch>
										{' '}
										<PrivateRoute
											exact
											path="/Project/Project Setting/AddLevelOfCourse/:id"
											component={AddLevelOfCourse}
										/>
									</Switch>
									<Switch>
										<PrivateRoute
											exact
											path="/Create__Offline__offers/:id"
											component={Create__Offline__offers}
										/>
									</Switch>
									<Switch>
										<PrivateRoute
											exact
											path="/Courses__list/:id/:courselevel"
											component={Courses__list}
										/>
									</Switch>
									<Switch>
										<PrivateRoute exact path="/Chapter/:courselevel/:id" component={Chapter} />
									</Switch>
									<Switch>
										<PrivateRoute
											exact
											path="/Edit_Chapter/:courselevel/:paperid/:chapterid/p/section"
											component={Edit_Chapter}
										/>
									</Switch>
								</Provider>

								<footer>
									<CopyRight />
								</footer>
							</main>
						) : null}
					</div>
				</div>
			</Router>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(Dashboard));
