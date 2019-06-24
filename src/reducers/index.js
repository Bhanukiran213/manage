import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import courseReducer from './courseReducer';
import facultyReducer from './facultyReducer';
import playlistReducer from './playlistReducer';
import studentReducer from './studentReducer';
import ascourseReducer from './ascourseReducer';
import timeReducer from './timeReducer';
import studioReducer from './studioReducer';
import featureReducer from './featureReducer';
import lectureReducer from './lectureReducer';
import maincourseReducer from './maincourseReducer';
import courselevelReducer from './courselevelReducer';
import chapterReducer from './chapterReducer';
import lecturecourseReducer from './lecturecourseReducer';
import packageReducer from './packageReducer';
import creditReducer from './creditReducer';
import demopackageReducer from './demopackageReducer';
import projectReducer from './projectReducer';
import topupReducer from './topupReducer';
import offlineuserReducer from './offlineuserReducer';
import offlineofferReducer from './offlineofferReducer';
import refundReducer from './refundReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	course: courseReducer,
	faculty: facultyReducer,
	playlist: playlistReducer,
	student: studentReducer,
	ascourse: ascourseReducer,
	time: timeReducer,
	studio: studioReducer,
	feature: featureReducer,
	lecture: lectureReducer,
	maincourse: maincourseReducer,
	courselevel: courselevelReducer,
	chapter: chapterReducer,
	lecturecourse: lecturecourseReducer,
	demopackage: demopackageReducer,
	credit: creditReducer,
	project: projectReducer,
	package: packageReducer,
	topup: topupReducer,
	offlineuser: offlineuserReducer,
	offlineoffer: offlineofferReducer,
	refund: refundReducer
});
