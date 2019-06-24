/*

import React from 'react';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Assign  from  './Assign';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import { updateFacultyCourse } from "../../../actions/ascourseActions";
import {getAscourse } from "../../../actions/ascourseActions";

import { getChapter} from '../../../actions/chapterActions';
import { getFaculty } from '../../../actions/facultyActions';
import { getCourselevels } from '../../../actions/courselevelActions';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// --------------------------------------WARNINGN--------------------------------
// DO NOT MODIFIES WITHOUT ANY PERMISSION ,THAT CHANGES MAY BE STOPPED YOUR PRODUCT 


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '26%',
  },
  formControl_: {
    margin: theme.spacing.unit,
    width:'81%',
    
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  newwid:{
      width:200,
      marginLeft:10,
  },
  newwid_:{
    width:400,
    height:'auto',
    wordWrap: 'break-word',
    marginLeft:10,
},
  button: {
    width:150,
    height:50,
    float:'right',
    top:0,
    marginTop:-95,
    marginLeft:'90%',
    paddingBottom:10,
    position:'relative'
     
   },
   chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },

});


function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
const newwidth={
    width:'40%',
}
const CardContainer={
  width:'100%',
  padding:20,
  marginBottom:20,

}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




class SimpleSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        options:'',
        faculty:'',
        course: '',
        papers:'',
        chapters:[],
        search:'',
        series:'',
        age: '',
        name: 'hai',
        value: 0,
        errors: {},
       
                 };
    this.onChange      = this.onChange.bind(this);
    this.onSubmit      = this.onSubmit.bind(this);
    this.updateSearch  = this.updateSearch.bind(this);
    this.updateSearchr = this.updateSearchr.bind(this);
    this.handleChange  = this.handleChange.bind(this);
    this.handleChangeMultiple=this.handleChangeMultiple.bind(this)
  }
 




  



  updateSearch(event)
  {
    this.setState({course:event.target.value.substr(0,20)});
  }



  updateSearchr(event)
  {
    this.setState({papers:event.target.value.substr(0,20)});
  }  



  onSubmit(e) 
  {
      e.preventDefault();
       
       const newBook = 
        {
        course: this.state.course,
        papers: this.state.papers,
        chapters: this.state.chapters,
        faculty: this.props.match.params.id,
        series:this.state.series
        };
    this.props.updateFacultyCourse(this.props.match.params.id,newBook,this.props.history);
    this.props.history.push('/assign/'+this.props.match.params.id);
   
    this.setState({course:''})
    this.setState({papers:''})
    this.setState({chapters:''})
    this.setState({series:''})
    


  };
   
  
  onChange(e)    {this.setState({ [e.target.name]: e.target.value });}
  handleChange2  = (e, { value }) => this.setState ({ course  : value },   this.props.getChapter(value))
  handleChange1  = (e, { value }) => this.setState ({ papers  : value })
  handleChange   = (e, { value }) => this.setState ({ chapters: value })
  handleChange3   = (e, { value }) => this.setState ({ series: value })
  handleChange8 = (event, value) => {
    console.log(value)
    this.setState({ value });
  };
  handleChange4 = name => event => {
    this.setState({ [name]: event.target.value },this.props.getChapter(event.target.value));
  };
  handleChange5 = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleChange6 = name => event => {
    this.setState({ [name]: event.target.value });
  };






  componentDidMount() {
    this.props.getFaculty(this.props.match.params.id);
    this.props.getAscourse(this.props.match.params.id);
    this.props.getCourselevels();}



  handleChangee = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeMultiple = event => {
    const { options } = event.target;
    const value=[];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
        __Chapters__Data_: value,
    });
  };





 
  render() {
    
 //------------------getting courselevel--------------------------------//
 const {courselevels}=this.props.courselevel
 var s=[]
 var count=0
 for(var i=0;i<courselevels.length;i++)
 {
  for(var j=0;j<courselevels[i].length;j++)
  {
    s[count]=courselevels[i][j]
    count++
  }
 }
  const option10 =s.map(b=>({ key:b,text:b,value:b}))
 
//---------------------------------------------------------------------------//

const {ascourses1}  = this.props.ascourse;
const { errors } = this.state;
const {chapters}  = this.props.chapter;


// eliminating the null or undefined values
let filt=chapters.filter((course)=> {
 return(course.courselevel !==undefined)});

//filtering the values based on the search    
 let filtered=filt.filter((course)=>{
   const query = this.state.course?this.state.course:null;
   return(
          course.courselevel.indexOf(query) >= 0 
        )
 });

 const removeDuplicates = (array, key) => {
   return array.reduce((arr, item) => {
   const removed = arr.filter(i => i[key] !== item[key]);
     return [...removed, item];
   }, []);
 };
 

 const b = removeDuplicates(filtered, 'series');    
 const g = removeDuplicates(option10, 'key'); 
//-----------------------------------Series options-----------------------------------------------//
 const option5=b.map(course => (
   { key: course._id, text:course.series, value: course.series })) 


  
    
    
    let filteredr=filtered.filter(
     (course)=>{
     const query = this.state.series?this.state.series:null;
     return(
            course.series.indexOf(query) >= 0 
           )
     }); 

     const option1=filteredr.map(course => (
      { key: course._id, text:course.paper, value: course.paper })) 
//------------------------------Paper Options---------------------------------------------//

    
//selecting chapters based on series and paper selected-----------------------------------//
       let filtered1=filteredr.filter(
         (course)=>{
         const query = this.state.series?this.state.series:null ;
         return(
                course.series.indexOf(query) >= 0 
               )
         }); 
console.log(filtered1)
let filtered2=filtered1.filter(
(course)=>{
const query = this.state.papers?this.state.papers:null ;
return(
      course.paper.indexOf(query) >= 0 
     )
}); 
console.log(filtered2)
   let option =filtered2.map(course=>(course.chapters))


     var t=[]
     var coun=0
   for (var i=0;i<option.length;i++){
     console.log(option[i].length)
     for (var j=0;j<option[i].length;j++){
t[coun]=option[i][j].chapter
coun++
     }
   }
      
  
     const option2=t.map(course => (
       { key: course, text:course, value: course }))
      

let filtered3=ascourses1.filter(
         (course)=>{
         const query = this.state.series ;
         return(
                course.series.indexOf(query) >= 0 
               )
         });    
      
let op=filtered3.map(course=>(course.chapters[0]))    



// ES5 syntax
const filteredArray =t.filter(function(x) 
  { 
        return op.indexOf(x) < 0});


const option3=filteredArray.map(course => ({ key: course, text:course, value: course }))

   


    const { classes } = this.props;
    const { value } = this.state;
    console.log('Value',value)




    return (
        <div>
         
          <Card style={ CardContainer}>
      <form className={classes.root} autoComplete="off"  onSubmit={this.onSubmit} error>
      

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Courses</InputLabel>
          <Select
          error={errors.course}
           
            value={this.state.course}
            onChange={this.handleChange4('course')}
           
            input={<Input name="course" id="age-native-helper" />}
           
          >
            
            {g.map(c=> (
              <MenuItem key={c.key} value={c.key}>
                {c.key}
              </MenuItem>
            ))}
            
          </Select>
        </FormControl>
      
        

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Series</InputLabel>
          <Select
           
          value={this.state.series}
          onChange={this.handleChange5('series')}
           
          input={<Input name="series" id="age-native-helper" />}
           
          >
            
            {b.map(c=> (
              <MenuItem key={c.series} value={c.series}>
                {c.series}
                </MenuItem>
            ))}
            
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">papers</InputLabel>
          <Select
           
           value={this.state.papers}
          
           onChange={this.handleChange6('papers')}
          
           input={<Input name="papers" id="age-native-helper" />}
           
          >
             {option1.map(c=> (
                  <MenuItem key={c.text} value={c.text}>
                    {c.text}
                    </MenuItem>
                ))}
           
            
          </Select>
        </FormControl>


        
     
        

        <FormControl className={classes.formControl_}>
          <InputLabel htmlFor="select-multiple-chip">Chapter</InputLabel>
          <Select
            multiple
            value={this.state.chapters}
            onChange={this.handleChange6('chapters')}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
           {option3.map(__value => (
              <MenuItem  key={__value.text} value={__value.text} label={__value.text} >
                {__value.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Button variant="contained" color="primary" type="submit" className={classes.button}>
        Submit
      </Button>
      </form>
      <div>
          </div>
         
         </Card>
  
     <Assign  id={this.props.match.params.id} />
     
          </div>
    );
  }
};

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  updateFacultyCourse: PropTypes.func.isRequired,
getAscourse:PropTypes.func.isRequired,
errors: PropTypes.object.isRequired,
getFaculty: PropTypes.func.isRequired,
 
  faculty: PropTypes.object.isRequired,
  ascourse: PropTypes.object.isRequired,
  getChapter: PropTypes.func.isRequired,
  getCourselevels: PropTypes.func.isRequired,
  courselevel: PropTypes.object.isRequired,
  courselevels: PropTypes.array.isRequired,
  chapters: PropTypes.array.isRequired,
  chapter: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
 
  ascourse:state.ascourse,
  courselevel: state.courselevel,
  courselevels:state.courselevels,
  errors: state.errors,
  faculty: state.faculty,
  chapter: state.chapter,
  chapters:state.chapters,
});

export default connect(mapStateToProps, {getCourselevels,getFaculty,getAscourse,getChapter, updateFacultyCourse }) (withStyles(styles)(SimpleSelect));
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import { Link } from 'react-router-dom';
//import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
//import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
//import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import FormGroup from '@material-ui/core/FormGroup';
import Assign from './Assign';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { updateFacultyCourse } from '../../../actions/ascourseActions';
import { getAscourse } from '../../../actions/ascourseActions';

import { getChapter } from '../../../actions/chapterActions';
import { getFaculty } from '../../../actions/facultyActions';
import { getCourselevels } from '../../../actions/courselevelActions';
import './App.css';
const nav = {
	background: '#fafafa',
	borderRadius: '0px',
	textAlign: 'left',
	padding: '20px 0px',
	marginTop: '-50px',
	borderBottom: '1px solid #e6e3e3'
};
const tableWrapper = {
	marginTop: 20
};

const style = {
	list: {
		width: 690
	},
	fullList: {
		width: 'auto'
	}
};
TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};

function LinkTab(props) {
	return <Tab component="a" onClick={(event) => event.preventDefault()} {...props} />;
}

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

class TemporaryDrawer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			course_key: false,
			options: '',
			faculty: '',
			course: '',
			papers: '',
			chapters: [],
			chapter_id: [],
			search: '',
			series: '',
			age: '',
			value_: '',
			value1_: '',
			value2_: '',
			right: false,
			gilad: true,
			jason: false,
			antoine: false,
			name: 'hai',
			value: 0,
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
		this.updateSearchr = this.updateSearchr.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
	}

	updateSearch(event) {
		this.setState({ course: event.target.value.substr(0, 20) });
	}

	updateSearchr(event) {
		this.setState({ papers: event.target.value.substr(0, 20) });
	}

	onSubmit(e) {
		console.log('this is submit');
		e.preventDefault();

		const newBook = {
			course: this.state.course,
			papers: this.state.papers,
			chapters: this.state.chapters,
			faculty: this.props.match.params.id,
			series: this.state.series,
			chapter_id: this.state.chapter_id
		};
		this.props.updateFacultyCourse(this.props.match.params.id, newBook, this.props.history);
		this.props.history.push('/assign/' + this.props.match.params.id);

		this.setState({ course: '' });
		this.setState({ papers: '' });
		this.setState({ chapters: [] });
		this.setState({ series: '' });
		this.setState({
			right: false
		});
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleChange2 = (e, { value }) => this.setState({ course: value }, this.props.getChapter(value));
	handleChange1 = (e, { value }) => this.setState({ papers: value });
	// handleChange   = (e, { value }) => this.setState ({ chapters: value })
	handleChange3 = (e, { value }) => this.setState({ series: value });
	handleChange8 = (event, value) => {
		console.log(value);
		this.setState({ value });
	};
	handleChange4 = (name) => (event) => {
		this.setState({ [name]: event.target.value }, this.props.getChapter(event.target.value));
	};
	handleChange5 = (name) => (event) => {
		this.setState({ [name]: event.target.value });
	};
	handleChange6 = (name) => (event) => {
		this.setState({ [name]: event.target.value });
	};

	componentDidMount() {
		this.props.getFaculty(this.props.match.params.id);
		this.props.getAscourse(this.props.match.params.id);
		this.props.getCourselevels();
	}

	handleChangee = (event) => {
		this.setState({ [event.target.name]: event.target.value });
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
			__Chapters__Data_: value
		});
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};
	handleChange_ = (event) => {
		console.log('event', event);
		this.setState({ course: event.target.value });
		this.props.getChapter(event.target.value);
	};
	handleChange2_ = (event) => {
		this.setState({ series: event.target.value });
	};
	handleChange3_ = (event) => {
		this.setState({ papers: event.target.value });
	};
	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open
		});
	};
	handleChange__ = (event) => {
		console.log(event.target.value);

		this.setState({ chapters: event.target.value });
	};
	handleCheck = (x, y) => {
		console.log(x);
		console.log(y);
		this.state.chapters.push(y);
		this.state.chapter_id.push(x);
		console.log(this.state.chapters);
		console.log(this.state.chapter_id);
		this.setState({ chapters: this.state.chapters });
		this.setState({ chapter_id: this.state.chapter_id });
	};
	render() {
		//------------------getting courselevel--------------------------------//
		const { courselevels } = this.props.courselevel;
		var s = [];
		var count = 0;
		for (var i = 0; i < courselevels.length; i++) {
			for (var j = 0; j < courselevels[i].length; j++) {
				s[count] = courselevels[i][j];
				count++;
			}
		}
		const option10 = s.map((b) => ({ key: b, text: b, value: b }));

		//---------------------------------------------------------------------------//
		const { ascourses1 } = this.props.ascourse;
		const { errors } = this.state;
		const { chapters } = this.props.chapter;

		// eliminating the null or undefined values
		let filt = chapters.filter((course) => {
			return course.courselevel !== undefined;
		});

		//filtering the values based on the search
		let filtered = filt.filter((course) => {
			const query = this.state.course ? this.state.course : null;
			return course.courselevel.indexOf(query) >= 0;
		});

		const removeDuplicates = (array, key) => {
			return array.reduce((arr, item) => {
				const removed = arr.filter((i) => i[key] !== item[key]);
				return [ ...removed, item ];
			}, []);
		};

		const b = removeDuplicates(filtered, 'series');
		const g = removeDuplicates(option10, 'key');
		//-----------------------------------Series options-----------------------------------------------//

		let filteredr = filtered.filter((course) => {
			const query = this.state.series ? this.state.series : null;
			return course.series.indexOf(query) >= 0;
		});

		const option1 = filteredr.map((course) => ({ key: course._id, text: course.paper, value: course.paper }));
		//------------------------------Paper Options---------------------------------------------//

		//selecting chapters based on series and paper selected-----------------------------------//
		let filtered1 = filteredr.filter((course) => {
			const query = this.state.series ? this.state.series : null;
			return course.series.indexOf(query) >= 0;
		});
		console.log(filtered1);
		let filtered2 = filtered1.filter((course) => {
			const query = this.state.papers ? this.state.papers : null;
			return course.paper.indexOf(query) >= 0;
		});
		console.log(filtered2);
		let option = filtered2.map((course) => course.chapters);
		console.log(option);
		const h = option[0];
		console.log(h);
		var t = [];
		var coun = 0;
		for (var k = 0; k < option.length; k++) {
			console.log(option[k].length);
			for (var l = 0; l < option[k].length; l++) {
				t[coun] = option[k][l].chapter;
				coun++;
			}
		}
		var f = [];
		count = 0;
		for (var i = 0; i < option.length; i++) {
			console.log(option[i].length);
			for (var j = 0; j < option[i].length; j++) {
				f[count] = option[i][j];
				count++;
			}
		}
		console.log(f);

		console.log(ascourses1);
		let filtered3 = ascourses1.filter((course) => {
			const query = this.state.series;
			return course.series.indexOf(query) >= 0;
		});

		let op = filtered3.map((course) => course.chapters[0]);

		console.log(op);

		for (let i = f.length - 1; i >= 0; i--) {
			for (var j = 0; j < op.length; j++) {
				if (f[i] && f[i].chapter === op[j]) {
					f.splice(i, 1);
				}
			}
		}

		console.log(f);
		// ES5 syntax
		const filteredArray = t.filter(function(x) {
			return op.indexOf(x) < 0;
		});

		//const option3=filteredArray.map(course => ({ key: course, text:course, value: course }))

		const option3 = f.map((course) => ({ key: course._id, text: course.chapter, value: course.chapter }));

		console.log('Value', value);

		console.log(this.props.match.params.id);
		console.log(this.state.chapters);

		console.log(this.state.value_);
		const { classes } = this.props;
		const { gilad, jason, antoine, value, value_ } = this.state;
		const error = [ gilad, jason, antoine ].filter((v) => v).length !== 2;

		console.log(this.state.chapter_id);

		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb" style={nav}>
						<li class="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							<Link to="/Ass__Courses">Faculty List</Link>{' '}
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							{' '}
							Assign course to Faculty{' '}
						</li>
					</ol>
				</nav>
				<button id="btnchip" onClick={this.toggleDrawer('right', true)}>
					{' '}
					Select Chapters &nbsp;&nbsp; <i class="fa fa-long-arrow-right" aria-hidden="true" />
				</button>

				<Drawer anchor="right" open={this.state.right}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('right', false)}
						onKeyDown={this.toggleDrawer('right', false)}
					/>

					<div className={classes.root}>
						<div className={classes.list}>
							<div style={{ marginTop: -30 }}>
								<button onClick={this.toggleDrawer('right', false)} type="button" id="cancel_btn">
									<CloseIcon />
								</button>
							</div>

							<Tabs id="tabs-react" value={value} onChange={this.handleChange}>
								<LinkTab label="Select Course" href="page1" />
								<LinkTab label="Select Series" href="page2" />
								<LinkTab label="Select Paper" href="page3" />
								<LinkTab label="Select Chapter" href="page4" />
							</Tabs>
						</div>
						<form className={classes.root} autoComplete="off" onSubmit={this.onSubmit} error>
							{value === 0 && (
								<TabContainer>
									<div className={classes.root}>
										<FormControl component="fieldset" className={classes.formControl}>
											<RadioGroup
												className={classes.group}
												onChange={this.handleChange_}
												error={errors.course}
												value={this.state.course}
											>
												{g.map((c) => (
													<FormControlLabel value={c.key} control={<Radio />} label={c.key} />
												))}
											</RadioGroup>
										</FormControl>
									</div>
								</TabContainer>
							)}
							{value === 1 && (
								<TabContainer>
									<div className={classes.root}>
										<FormControl component="fieldset" className={classes.formControl}>
											<RadioGroup
												value={this.state.series}
												className={classes.group}
												onChange={this.handleChange2_}
											>
												{b.map((c) => (
													<FormControlLabel
														value={c.series}
														control={<Radio />}
														label={c.series}
													/>
												))}
											</RadioGroup>
										</FormControl>
									</div>
								</TabContainer>
							)}
							{value === 2 && (
								<TabContainer>
									<div className={classes.root}>
										<FormControl component="fieldset" className={classes.formControl}>
											<RadioGroup
												value={this.state.papers}
												className={classes.group}
												onChange={this.handleChange3_}
											>
												{option1.map((c) => (
													<FormControlLabel
														value={c.text}
														control={<Radio />}
														label={c.text}
													/>
												))}
											</RadioGroup>
										</FormControl>
									</div>
								</TabContainer>
							)}

							{value === 3 && (
								<div>
									<div id="wrapper">
										{option3.map((x) => (
											<div>
												<FormControlLabel
													value={x.key}
													control={
														<Checkbox
															label={x.text}
															key={x.text.toString()}
															onChange={() => this.handleCheck(x.key, x.text)}
														/>
													}
													label={x.text}
												/>
											</div>
										))}
									</div>
									<button type="submit" id="btnchip_submit">
										Submit
									</button>
								</div>
							)}
						</form>
					</div>
				</Drawer>
				<div style={tableWrapper}>
					<Assign id={this.props.match.params.id} />
				</div>
			</div>
		);
	}
}

TemporaryDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	updateFacultyCourse: PropTypes.func.isRequired,
	getAscourse: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	getFaculty: PropTypes.func.isRequired,

	faculty: PropTypes.object.isRequired,
	ascourse: PropTypes.object.isRequired,
	getChapter: PropTypes.func.isRequired,
	getCourselevels: PropTypes.func.isRequired,
	courselevel: PropTypes.object.isRequired,
	courselevels: PropTypes.array.isRequired,
	chapters: PropTypes.array.isRequired,
	chapter: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	ascourse: state.ascourse,
	courselevel: state.courselevel,
	courselevels: state.courselevels,
	errors: state.errors,
	faculty: state.faculty,
	chapter: state.chapter,
	chapters: state.chapters
});
export default connect(mapStateToProps, { getCourselevels, getFaculty, getAscourse, getChapter, updateFacultyCourse })(
	withStyles(style)(TemporaryDrawer)
);
