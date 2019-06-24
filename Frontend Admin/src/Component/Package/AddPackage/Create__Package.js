import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';


import MenuItem from '@material-ui/core/MenuItem';




import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import green from '@material-ui/core/colors/green';

import Typography from '@material-ui/core/Typography';
import {  Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getCredits} from '../../../actions/creditActions';
import { addPackage } from "../../../actions/packageActions";
import { getCourselevels1} from '../../../actions/courselevelActions';
import './App.css'
import purple from '@material-ui/core/colors/purple';

const helpde = {
    width:440,
    
    padding:20,
   float:'left',
   borderRadius:'0px',
    border:'1px solid #0000001f',
    boxShadow:'0px 0px 0px 0px',
   
  };
 

 

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
const styles = theme => ({
 
  formControl: {
    margin: theme.spacing.unit,
    width:380,
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
  Wdirai:{
      width:500,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width:'100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:380,
    height:40,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 400,
  },
  button: {
   width:80,
   height:40,
   marginTop:20,
    float:'left',
    marginLeft:130,
    borderRadius:'0px',
    border:'1px solid #0000001f',
    boxShadow:'0px 0px 0px 0px',
  },
  input: {
    display: 'none',
  },
  marho:{
      
      width:500,
  },
  
  fmarho:{
    marginLeft:20,
},
root: {
  display: 'flex',
    flexWrap: 'wrap',
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  cssLabel: {
    color:'#333',
    marginTop:-5,
    fontSize:12,

    '&$cssFocused': {
      color: purple[500],
      fontSize:14,
      borderRadius:'0px',
      marginTop:2,
     
      padding:10,
     
      
    },
  },
  cssFocused: {'border-radius':'0px',
color:'#222'
},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
      'border-radius':'0px'
      
    },
  },
  cssOutlinedInput: {
    
    '&$cssFocused $notchedOutline': {
      borderColor: purple[500],
      'border-radius':'0px'
    },
  },
  notchedOutline: {'border-radius':'0px',},
});






class MultipleSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title:'',
      no_of_days:'',
      credits_per_month:'',
      total_credits:'',
      amount:'',
      tax:'',
      discount:'',
      main_course_id:'',
      package_code:'',
      promocode_status:'',
      errors: {},
      name: [],
      value_: 0,
      selectedValue: 'a',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount() {
    this.props.getCourselevels1();
    this.props.getCredits();
    
  }


  

onSubmit(e) 
{
 const c=this.state.no_of_days/30
 const k =c*this.state.credits_per_month
 console.log(k)
 this.setState({total_credits:k})
  e.preventDefault();
      const newBook = 
      {
        tax:               this.state.tax,
        title:             this.state.title,
        amount:            this.state.amount,
        no_of_days:        this.state.no_of_days,
        package_code:      this.state.package_code,
        total_credits:     k,
        main_course_id:    this.state.main_course_id,
        promocode_status:  this.state.promocode_status,
        credits_per_month: this.state.credits_per_month, 
      };
  this.props.addPackage(newBook,this.props.history);
  this.props.history.push('/__Add__Package');
}



onChange(e) 
{
  this.setState({ [e.target.name]: e.target.value });
}





handleChange2= event => {
    this.setState({  promocode_status: event.target.value });
  };
 
  handleChange = event => {
    this.setState({ main_course_id: event.target.value });
  };
  handleChange1 = event => {
    this.setState({ credits_per_month: event.target.value });
  };
 
  handleChange_ = (event, value_) => {
    this.setState({ value_ });
  };
  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      name: value,
    });
  };

  render() {
    const { classes } = this.props;
   
    const nav={background:'#fafafa',
    borderRadius:'0px',
    textAlign:'left',
    padding:'20px 0px',
    marginTop:'-50px',
    borderBottom:'1px solid #e6e3e3',};
    const{courselevels}=this.props.courselevel
    const { errors } = this.state;
    const removeDuplicates = (array, key) => {
      return array.reduce((arr, item) => {
         const removed = arr.filter(i => i[key] !== item[key]);
        return [...removed, item];
      }, []);
    };
    const options=courselevels.map(course => (
          { key: course._id, text:course.coursename, value: course.coursename }))
          const b = removeDuplicates(options, 'text');  
          console.log(b)
    const {credits}  = this.props.credit;  
  
    let filt=credits.filter((course)=> {
              return(course.status !==null)});
  
    const options1=filt.map(course => (
                  { key: course._id, text:course.credit_value, value: course.credit_value }))
  
    const options2=[{ key: 'Yes', text: 'Yes', value: 'Yes' },
                  { key: 'No', text: 'No', value: 'No' },  ] 
                    
    return (
        <div>
          <nav aria-label="breadcrumb">
  <ol class="breadcrumb" style={nav}>
    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
    
    <li class="breadcrumb-item"><Link to="/__Add__Package"> Package List</Link></li>
    
   <li class="breadcrumb-item active" aria-current="page">Create Package</li>
  </ol>
</nav>
        <Card style={helpde}>
        <div>
      <div className={classes.root}>
        
           <form onSubmit={this.onSubmit} error>
         
  
          <TextField
          id="outlined-select-currency"
          select
          label="Courses Name"
          className={classes.textField}
          style={{height:40}}
          value={this.state.main_course_id}
          onChange={this.handleChange}
          error={errors.main_course_id} 
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
         
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        >
         <MenuItem value="">
              <em>None</em>
            </MenuItem>
           {b.map(c=>
            <MenuItem value={c.value}>{c.value}</MenuItem>)}
            
        </TextField>
        <TextField
          id="outlined-email-input"
          label="Package Code *
          "
          className={classes.textfield}
          name="package_code"
              
                type="package_code"
                value={this.state.package_code}
                onChange={this.onChange}
                error={errors.package_code}
         
                variant="outlined"
         
         
          variant="outlined"
          className={classes.textField}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />

<TextField
          id="outlined-email-input"
          label="Title *
          "
         
         
          name="title"
               
                type="title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
          autoComplete="text"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
     <TextField
          id="outlined-email-input"
          label="Number of Days *
          "
         
         
          name="no_of_days"
     
          type="no_of_days"
          value={this.state.no_of_days}
          onChange={this.onChange}
          error={errors.no_of_days}
          autoComplete="text"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
        {/* <FormControl className={classes.formControl}>
    <InputLabel htmlFor="age-simple">Credit Pre Month</InputLabel>
        <Select
          value={this.state.credits_per_month}
          onChange={this.handleChange1}
          error={errors.credits_per_month}
          inputProps={{
            name: 'credits_per_month',
            id: 'age-simple',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options1.map(c=>
          <MenuItem value={c.value}>{c.value}</MenuItem>)}
          
        </Select>
      </FormControl>
       */}

<TextField
          id="outlined-select-currency"
          select
          label="Credit Pre Month"
          className={classes.textField}
          style={{height:40}}
          value={this.state.credits_per_month}
          onChange={this.handleChange1}
          error={errors.credits_per_month}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
         
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        >
         <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options1.map(c=>
          <MenuItem value={c.value}>{c.value}</MenuItem>)}
          
          
            
        </TextField>
        <TextField
          id="outlined-email-input"
          label="Amount*"
         
         
          name="amount"
               
                type="amount"
                value={this.state.amount}
                onChange={this.onChange}
                error={errors.amount}
          autoComplete="text"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
        <TextField
          id="outlined-email-input"
          label="Tax in % *
          "
          className={classes.textField}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
         
          name="tax"
               
                type="tax"
                value={this.state.tax}
                onChange={this.onChange}
                error={errors.tax}
          autoComplete="text"
          margin="normal"
          variant="outlined"
        /><TextField

        id="outlined-email-input"
      
      
        className={classes.textField}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
        }}
       
        type="file"
        name="text"
        autoComplete="text"
        margin="normal"
        variant="outlined"
      />

{/* <FormControl className={classes.formControl}>
    <InputLabel htmlFor="age-simple"
    
    
    
    >PromoCode Status</InputLabel>
        <Select
          value={this.state.promocode_status}
          onChange={this.handleChange2}
          error={errors.promocode_status}
          inputProps={{
            name: 'promocode_status',
            id: 'age-simple',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options2.map(c=>
          <MenuItem value={c.value}>{c.value}</MenuItem>)}
          
        </Select>
      </FormControl> */}
      
      <TextField
          id="outlined-select-currency"
          select
          label="Credit Pre Month"
          className={classes.textField}
          style={{height:40}}
          value={this.state.promocode_status}
          onChange={this.handleChange2}
          error={errors.promocode_status}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
         
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        >
         <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options2.map(c=>
          <MenuItem value={c.value}>{c.value}</MenuItem>)}
          
            
        </TextField>
     
      
      <div> <Button variant="contained" type="submit" color="primary" id="btnchip" className={classes.button}>
        Submit
      </Button>
      </div>
      </form> </div>
      </div></Card>
    
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  addPackage: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  package: PropTypes.object.isRequired,

  getCourselevels1: PropTypes.func.isRequired,
  courselevel: PropTypes.object.isRequired,
  courselevels: PropTypes.array.isRequired,

  getCredits: PropTypes.func.isRequired,
  credit: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  courselevel: state.courselevel,
  courselevels:state.courselevels,

  package: state.package,

  credit: state.credit,
  credits:state.credits,
  errors: state.errors
});
export default connect(mapStateToProps, { getCredits,addPackage,getCourselevels1 })(withStyles(styles, { withTheme: true })(MultipleSelect));
