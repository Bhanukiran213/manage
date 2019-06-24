import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Table from './Table';
import { connect } from 'react-redux';
import { getAscourse, deleteAscourse } from '../../../actions/ascourseActions';
import './App.css';
function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};

const styles = (theme) => ({
	root: {
		padding: '0px 0px'
	}
});

class SimpleTabs extends React.Component {
	state = {
		value: 0
	};

	componentDidMount() {
		this.props.getAscourse(this.props.id);
	}
	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;
		const { ascourses1 } = this.props.ascourse;
		console.log(ascourses1);
		const filt = ascourses1.filter((course) => {
			const query = 'CA FOUNDATION';
			const query1 = 'CA INTERMEDIATE';
			const query2 = 'CA FINAL';
			return (
				course.course.indexOf(query) >= 0 ||
				course.course.indexOf(query1) >= 0 ||
				course.course.indexOf(query2) >= 0
			);
		});
		console.log(filt);
		const filt1 = ascourses1.filter((course) => {
			const query = 'CS FOUNDATION';
			const query1 = 'CS EXECUTIVE';
			const query2 = 'CS PROFESSIONAL';
			return (
				course.course.indexOf(query) >= 0 ||
				course.course.indexOf(query1) >= 0 ||
				course.course.indexOf(query2) >= 0
			);
		});
		console.log(filt1);
		const filt2 = ascourses1.filter((course) => {
			const query = 'CMA FINAL';
			const query1 = 'CMA INTERMEDIATE';
			const query2 = 'CMA FOUNDATION';
			return (
				course.course.indexOf(query) >= 0 ||
				course.course.indexOf(query1) >= 0 ||
				course.course.indexOf(query2) >= 0
			);
		});
		console.log(filt2);
		const g = <Table filt={filt} />;
		const __CS__Table__ = <Table filt1={filt1} />;
		const CMA = <Table filt3={filt2} />;
		return (
			<div>
				<Typography style={{ marginTop: '-10px', fontFamily: 'ubuntu', paddingLeft: 2 }}>
					<b>Assigned Chapters</b>
				</Typography>

				<div className={classes.root}>
					<div id="appbar">
						<Tabs value={value} onChange={this.handleChange}>
							<Tab label="CA" />
							<Tab label="CS" />
							<Tab label="CMA" />
						</Tabs>
					</div>
					{value === 0 && <div id="tabcontainer">{g}</div>}
					{value === 1 && <div id="tabcontainer">{__CS__Table__}</div>}
					{value === 2 && <div id="tabcontainer">{CMA}</div>}
				</div>
			</div>
		);
	}
}

SimpleTabs.propTypes = {
	classes: PropTypes.object.isRequired,
	getAscourse: PropTypes.func.isRequired,
	ascourse: PropTypes.object.isRequired,
	ascourses1: PropTypes.array.isRequired
};
const mapStateToProps = (state) => ({
	ascourse: state.ascourse,
	ascourses1: state.ascourses1
});

export default connect(mapStateToProps, { getAscourse, deleteAscourse })(withStyles(styles)(SimpleTabs));
