import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import Chip from '@material-ui/core/Chip';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { addLecture } from '../../../actions/lectureActions';
import { getPlaylists } from '../../../actions/playlistActions';
import { getAscourses } from '../../../actions/ascourseActions';
import { connect } from 'react-redux';
import purple from '@material-ui/core/colors/purple';

import './App.css';
const helpde = {
	padding: 20,
	float: 'left',
	borderRadius: '0px',
	border: '1px solid #0000001f',
	boxShadow: '0px 0px 0px 0px',
	width: 460
};

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
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit,
		width: 400
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: theme.spacing.unit / 4
	},
	noLabel: {
		marginTop: theme.spacing.unit * 3
	},
	Wdirai: {
		width: 400
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		width: '100%'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 400,
		height: 40,
		float: 'left',
		position: 'relative'
	},
	dense: {
		marginTop: 16
	},
	menu: {
		width: 400
	},
	button: {
		width: 200,
		height: 50,
		marginTop: 20,
		float: 'left',
		marginLeft: 120
	},
	input: {
		display: 'none'
	},
	marho: {
		width: 500
	},
	fmarho: {
		marginLeft: 20
	},

	cssLabel: {
		color: '#333',
		marginTop: -5,
		fontSize: 12,

		'&$cssFocused': {
			color: purple[500],
			fontSize: 14,
			borderRadius: '0px',
			marginTop: 2,

			padding: 10
		}
	},
	cssFocused: {
		'border-radius': '0px',
		color: '#222'
	},
	cssUnderline: {
		'&:after': {
			borderBottomColor: purple[500],
			'border-radius': '0px'
		}
	},
	cssOutlinedInput: {
		'&$cssFocused $notchedOutline': {
			borderColor: purple[500],
			'border-radius': '0px'
		}
	},
	notchedOutline: { 'border-radius': '0px' }
});

const nav = {
	background: '#fafafa',
	borderRadius: '0px',
	textAlign: 'left',
	padding: '20px 0px',
	marginTop: '-50px',
	borderBottom: '1px solid #e6e3e3'
};
class MultipleSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			credit: '',
			playlist: [],
			faculty: '',
			course: '',
			chapters: '',
			errors: {},
			chapter_id: '',
			value_: 0
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getPlaylists();
		this.setState({ playlists: this.props.playlist });
		this.props.getAscourses();
	}

	onSubmit(e) {
		e.preventDefault();

		const newBook = {
			title: this.state.title,
			credit: this.state.credit,
			playlist: this.state.playlist,
			faculty: this.state.faculty,
			course: this.state.course,
			chapters: this.state.chapters,
			chapter_id: this.state.chapter_id
		};

		this.props.addLecture(newBook);
		this.props.history.push('/__Add__Lecture');
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleChange = (e, { value }) => this.setState({ playlist: value });

	handleChange3 = (event, x) => {
		console.log(x);
		this.setState({ chapter_id: event.target.value });
		this.setState({ chapters: x.key });
		console.log(this.state.chapters);
	};
	handleChange2 = (event) => {
		this.setState({ course: event.target.value });
	};
	handleChanger = (event) => {
		this.setState({ playlist: event.target.value });
	};
	handleChange1 = (event) => {
		this.setState({ faculty: event.target.value });
	};
	handleChange_ = (event, value_) => {
		this.setState({ value_ });
	};
	handleChangeMultiple = (event) => {
		const { options } = event.target;
		const value = [];
		for (let i = 0, l = options.length; i < l; i += 1) {
			if (options[i].selected) {
				value.push(options[i].value);
			}
		}
		this.setState({
			name: value
		});
	};

	render() {
		const { classes } = this.props;

		const { ascourses1 } = this.props.ascourse;

		const { errors } = this.state;
		const { playlists } = this.props.playlist;
		//-----------------------Faculty Options --------------------------------------------//
		let filt2 = ascourses1.map((playlist) => ({
			key: playlist._id,
			text: playlist.faculty['first_name'],
			value: playlist.faculty['first_name']
		}));

		console.log(filt2);
		// eliminating the null or undefined values
		let filt = ascourses1.filter((course) => {
			return course.chapters !== undefined;
		});

		//filtering the values based on the input of faculty name
		let filtered = filt.filter((course) => {
			const query = this.state.faculty.toLowerCase();
			return course.faculty['first_name'].toLowerCase().indexOf(query) >= 0;
		});

		//filtering the values based on the input of Course
		let filteredr = filtered.filter((course) => {
			const query = this.state.course.toLowerCase();
			return course.course.toLowerCase().indexOf(query) >= 0;
		});
		console.log(filteredr);

		const removeDuplicates = (array, key) => {
			return array.reduce((arr, item) => {
				const removed = arr.filter((i) => i[key] !== item[key]);
				return [ ...removed, item ];
			}, []);
		};

		//Remove duplicates of faculty Data
		const b = removeDuplicates(ascourses1, 'faculty["first_name"]');
		console.log(b);
		//Remove duplicates of course data
		const s = removeDuplicates(filtered, 'course');
		const r = removeDuplicates(filt2, 'value');
		console.log(r);
		//Playlist Options
		const a = playlists.map((playlist) => ({ key: playlist._id, text: playlist.title, value: playlist._id }));

		//Faculty Options

		//Coursename Options
		const d = s.map((playlist) => ({ key: playlist._id, text: playlist.course, value: playlist.course }));

		//chapters Options
		const f = filteredr.map((playlist) => ({
			key: playlist.chapter_id,
			text: playlist.chapters,
			value: playlist._id
		}));

		return (
			<div>
				<div>
					<nav aria-label="breadcrumb">
						<ol class="breadcrumb" style={nav}>
							<li class="breadcrumb-item">
								<Link to="/">Home</Link>
							</li>
							<li class="breadcrumb-item">
								<Link to="/__Add__Lecture">Lecture List</Link>
							</li>
							<li class="breadcrumb-item active" aria-current="page">
								Create New lecture
							</li>
						</ol>
					</nav>
					<Card style={helpde}>
						<div className={classes.root}>
							<form onSubmit={this.onSubmit} error>
								<div className="TextField-without-new-lecture-border-radius fieldset">
									<TextField
										id="outlined-email-input"
										className={classes.textField}
										name="title"
										type="title"
										value={this.state.title}
										onChange={this.onChange}
										error={errors.title}
										label="Enter Lecture Title"
										autoComplete="text"
										margin="normal"
										variant="outlined"
										InputLabelProps={{
											classes: {
												root: classes.cssLabel,
												focused: classes.cssFocused
											}
										}}
										InputProps={{
											classes: {
												root: classes.cssOutlinedInput,
												focused: classes.cssFocused,
												notchedOutline: classes.notchedOutline
											}
										}}
									/>

									<TextField
										id="outlined-email-input"
										style={{ marginTop: 10 }}
										className={classes.textField}
										label="Enter Your Credit Per Lecture"
										name="credit"
										type="credit"
										value={this.state.credit}
										onChange={this.onChange}
										error={errors.credit}
										variant="outlined"
										InputLabelProps={{
											classes: {
												root: classes.cssLabel,
												focused: classes.cssFocused
											}
										}}
										InputProps={{
											classes: {
												root: classes.cssOutlinedInput,
												focused: classes.cssFocused,
												notchedOutline: classes.notchedOutline
											}
										}}
									/>

									<FormControl className={classes.formControl}>
										<InputLabel
											htmlFor="select-multiple-chip"
											placeholder="Select Your Lecture PlayList"
										>
											PlayList
										</InputLabel>
										<Select
											className={classes.Wdirai}
											multiple
											value={this.state.playlist}
											onChange={this.handleChanger}
											input={<Input name="playlist" id="select-multiple" />}
											SelectProps={(selected) => (
												<div className={classes.chips}>
													{selected.map((value) => (
														<Chip Key={value} label={value} className={classes.chip} />
													))}
												</div>
											)}
										>
											{a.map((name) => (
												<MenuItem Key={name.key} value={name.key}>
													{name.text}
												</MenuItem>
											))}
										</Select>
									</FormControl>

									{/* <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">Faculty</InputLabel>
        <Select
          value={this.state.faculty}
          onChange={this.handleChange1}
          error={errors.faculty}
          inputProps={{
            name: 'faculty',
            id: 'age-simple',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {r.map(faculty=>(
          <MenuItem value={faculty.value}>{faculty.text}</MenuItem>))}
          
        </Select>
      </FormControl> */}

									<TextField
										id="outlined-select-currency"
										select
										label="Faculty Name"
										className={classes.textField}
										style={{ height: 40 }}
										value={this.state.faculty}
										onChange={this.handleChange1}
										error={errors.faculty}
										SelectProps={{
											MenuProps: {
												className: classes.menu
											}
										}}
										margin="normal"
										variant="outlined"
										InputLabelProps={{
											classes: {
												root: classes.cssLabel,
												focused: classes.cssFocused
											}
										}}
										InputProps={{
											classes: {
												root: classes.cssOutlinedInput,
												focused: classes.cssFocused,
												notchedOutline: classes.notchedOutline
											}
										}}
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{r.map((faculty) => <MenuItem value={faculty.value}>{faculty.text}</MenuItem>)}
									</TextField>

									{/* <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">Courses</InputLabel>
        <Select
          value={this.state.course}
          onChange={this.handleChange2}
          error={errors.course}
          inputProps={{
            name: 'course',
            id: 'age-simple',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {d.map(course=>(
          <MenuItem value={course.text}>{course.text}</MenuItem>))}
          
        </Select>
      </FormControl> */}

									<TextField
										id="outlined-select-currency"
										select
										label="Courses Name"
										className={classes.textField}
										style={{ height: 40 }}
										value={this.state.course}
										onChange={this.handleChange2}
										error={errors.course}
										SelectProps={{
											MenuProps: {
												className: classes.menu
											}
										}}
										margin="normal"
										variant="outlined"
										InputLabelProps={{
											classes: {
												root: classes.cssLabel,
												focused: classes.cssFocused
											}
										}}
										InputProps={{
											classes: {
												root: classes.cssOutlinedInput,
												focused: classes.cssFocused,
												notchedOutline: classes.notchedOutline
											}
										}}
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{d.map((course) => <MenuItem value={course.text}>{course.text}</MenuItem>)}
									</TextField>
									{/* <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">Chapters</InputLabel>
        <Select
          value={this.state.chapters}
          onChange={this.handleChange3}
          error={errors.chapters}
          inputProps={{
            name: 'chapters',
            id: 'age-simple',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {f.map(course=>(
          <MenuItem value={course.value}>{course.text}</MenuItem>))}
          
        </Select>
      </FormControl> */}

									<TextField
										id="outlined-select-currency"
										select
										name="chapter_id"
										label="Chapters"
										className={classes.textField}
										style={{ height: 40 }}
										value={this.state.chapter_id}
										onChange={(event, Key) => this.handleChange3(event, Key)}
										error={errors.chapters}
										SelectProps={{
											MenuProps: {
												className: classes.menu
											}
										}}
										margin="normal"
										variant="outlined"
										InputLabelProps={{
											classes: {
												root: classes.cssLabel,
												focused: classes.cssFocused
											}
										}}
										InputProps={{
											classes: {
												root: classes.cssOutlinedInput,
												focused: classes.cssFocused,
												notchedOutline: classes.notchedOutline
											}
										}}
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{f.map((course) => (
											<MenuItem key={course.key} value={course.value}>
												{course.text}
											</MenuItem>
										))}
									</TextField>

									<div>
										{' '}
										<button type="submit" id="btn_chip" className={classes.button}>
											Submit
										</button>
									</div>
								</div>
							</form>
						</div>
					</Card>
				</div>
			</div>
		);
	}
}

MultipleSelect.propTypes = {
	classes: PropTypes.object.isRequired,
	addLecture: PropTypes.func.isRequired,

	getPlaylists: PropTypes.func.isRequired,
	playlist: PropTypes.object.isRequired,
	playlists: PropTypes.array.isRequired,

	errors: PropTypes.object.isRequired,
	getAscourses: PropTypes.func.isRequired,
	ascourse: PropTypes.object.isRequired,
	ascourses: PropTypes.array.isRequired
};
const mapStateToProps = (state) => ({
	lecture: state.lecture,
	errors: state.errors,
	playlist: state.playlist,
	playlists: state.playlists,

	ascourse: state.ascourse,
	ascourses: state.ascourses
});

export default connect(mapStateToProps, { getAscourses, addLecture, getPlaylists })(
	withStyles(styles, { withTheme: true })(MultipleSelect)
);

/*

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import { addFaculty,getFacultyid,clearErrors  } from "../../../actions/facultyActions";
import { connect } from 'react-redux';
import './App.css'

import {  Link } from "react-router-dom";
var addZero = require('add-zero');
var replace = require("str-replace");

const styles = theme => ({
 
  container: {
    display: 'flex',
    flexWrap: 'wrap',
   
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:390,
    float:'left'
    
  },
  resize:{
    fontSize:50
  },
  menu: {
    width: 500,
  },
  button: {
   
    textTransform: 'capitalize',
    margin: theme.spacing.unit,
    borderRadius:'0px',
    boxShadow:'0px 9px 0px 0px',
    backgroundColor: '#19212b',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#44474c'},
    
  },
  button_: {
    fontFamily:'Ubuntu',
    margin: theme.spacing.unit,
    borderRadius:'0px',
   
    textTransform: 'capitalize',
    boxShadow:'0px 9px 0px 0px',
   background:'#7cbb42',
   '&:hover': {
    backgroundColor: '#87d045'},
  },
  input: {
  

  },
  CardContainer:{
    width:450,
    padding:20,

    marginTop:50,
    float:'left',
    borderRadius:'0px',
    border:'1px solid #0000001f',
    boxShadow:'0px 0px 0px 0px',
  },
  margin:{
    margin: theme.spacing.unit,
  },
  
});



class OutlinedTextFields extends React.Component {





  constructor(props) {
    super(props);
    this.state = {
      faculty_id:'',
      first_name: '',
      last_name:'',
      username:'',
      password:'',
      profession:'',
      mobile_no:'',
      description:'',
      file:'',
      errors: {},
      showPassword: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getFacultyid();
    
   }


  
  
   componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.faculty.faculty) {
      const faculty = nextProps.faculty.faculty;
      console.log(faculty.length)
      if(faculty.length==0){
        this.setState({faculty_id :"FAC096"});
      }else{
      const b=faculty[0]
      // var c=b.Id
    // console.log(c)
     
     var fid=b.faculty_id;
     var target=fid
     var occurrences = "FAC";
    console.log(fid)
    var replacement = "";
    var result = replace.all( occurrences ).ignoringCase().from(target).with(replacement);
    console.log(result) 
   
   var r= +result + +1;

    console.log(r)
   r = addZero(r, 3);
   var t="FAC"+r
   this.setState({faculty_id:t})
    console.log(t)
    
  
    }}
  }

componentWillUnmount(){
  this.props.clearErrors();
}

  onSubmit(e) {

    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    if(this.state.file.length==1){
    axios.post(`/api/faculty/upload/o`, formData, {
      headers: {}
    }).then(response => {
        console.log(response.data.name)
     // console.log(this.state.file[0].name);
      this.setState({file:response.data.name})
     console.log(this.state.file);
    });
    const newBook = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      faculty_id:this.state.faculty_id,
      profession:this.state.profession,
      password:this.state.password,
      mobile_no:this.state.mobile_no,
      username:this.state.username,
      description:this.state.description,
      file:this.state.file[0].name
    };
console.log(this.state.file)
    this.props.addFaculty(newBook,this.props.history);
  }else {
    const newBook = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      faculty_id:this.state.faculty_id,
      profession:this.state.profession,
      password:this.state.password,
      mobile_no:this.state.mobile_no,
      username:this.state.username,
      description:this.state.description,
      file:this.state.file
    };
console.log(this.state.file)
    this.props.addFaculty(newBook,this.props.history);
  }
  





   
 
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange_password = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
 
  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
    console.log(this.state.file)
  }
  render() {
    
    const { classes } = this.props;
const nav ={background:'#fafafa',
borderRadius:'0px',
textAlign:'left',
padding:'20px 0px',
marginTop:'-50px',
borderBottom:'1px solid #e6e3e3',
};


console.log(this.state.first_name)
const { errors } = this.state;
    return (
    
    <div>
     
       <ol class="breadcrumb" style={nav}>
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
        <li class="breadcrumb-item"><Link to="/Faculty">Add Faculty</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Create Faculty</li>
       </ol>
     
     
      <Card className={classes.CardContainer}> 
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit} error>
      <input type="hidden" name="faculty_id" value={this.state.faculty_id} />
        
      <div className="TextField-without-field-top-border-radius fieldset">

        <TextField
          id="idnew"
          label="Lecture Title"
          className={classes.textField}
          name="first_name"
          type="first_name"
        
          onChange={this.onChange}
         
          radius={false}
          variant="outlined"
          margin="normal"
          
        />
        <TextField
          id="idnew"
          label="Enter Last Name"
          className={classes.textField}
          name="last_name"
    type="last_name"        
  
    onChange={this.onChange}
   
          autoComplete="text"
          margin="normal"
          
        variant="outlined"
        />
<TextField
          id="idnew"
          label="Enter Your password"
          className={classes.textField}
          name="password"
    type="text"        
   
    onChange={this.onChange}
   
          autoComplete="text"
          margin="normal"
          variant="outlined"
        />
<TextField
           id="idnew"
          label="Enter Your Email Address"
          className={classes.textField}
          name="username"
   type="email"
   
   onChange={this.onChange}
   
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />
       
       
        <TextField
           id="idnew"
          label="Enter Your Mobile Numbers"
          className={classes.textField}
          name="mobile_no"
   type="mobile_no"
  
   onChange={this.onChange}
  
   margin="normal"
          variant="outlined"
        />
       <TextField
         id="idnew"
         variant="outlined"
          label="Enter Your Profession"
          className={classes.textField}
          name="profession"
   type="profession"
   
   onChange={this.onChange}
  
   margin="normal"
        />


       
        <TextField
        id="outlined-email-input"
      
      
        className={classes.textField}
       
        type="file"
        name="file"
        autoComplete="text"
        margin="normal"
        variant="outlined"
      />
          </div>
         
      <button  type="submit" id="btnchip" className={classes.button_}>
    Submit
      </button>
     <Link to="/Faculty" style={{textDecoration: 'none'}}> <button  id="btnchip_cancel" >
        Cancel
      </button></Link>
       
      </form>
      <div>
   
     
    </div></Card>
      </div>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
  addfaculty: PropTypes.func.isRequired,
  getFacultyid: PropTypes.func.isRequired,
  faculty: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  faculty: state.faculty,
  errors: state.errors
});

export default connect(mapStateToProps, { addFaculty , getFacultyid,clearErrors}) (withStyles(styles)(OutlinedTextFields));
*/
