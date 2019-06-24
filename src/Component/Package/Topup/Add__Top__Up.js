import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import green from '@material-ui/core/colors/green';

import {Typography} from '@material-ui/core';
import { addTopup } from "../../../actions/topupActions";
import { getCourselevels1} from '../../../actions/courselevelActions';
import { getCredits,addCredit,updateCreditStatus} from '../../../actions/creditActions';
import { connect } from 'react-redux';
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
    marginLeft:120,
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
      marginTop:-5,
      'text-align':'left',
      paddingRight:10,
     
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
      no_of_credits:'',
     
      amount:'',
      tax:'',
      
      course:'',
      name: [],
      value_: 0,
      selectedValue: 'a',
     description:'',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount() {
    this.props.getCourselevels1();
    this.props.getCredits();
    
  }


  

  handleChange1 = (e, { value }) => this.setState({ credits_per_month: value })

  handleChange2 = (e, { value }) => this.setState({ promocode_status: value })


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
        no_of_credits:        this.state.no_of_credits,
      
        course:    this.state.course,
        description:  this.state.description,
         
      };
  this.props.addTopup(newBook,this.props.history);
  this.props.history.push('/__Top__Up__');
}



onChange(e) 
{
  this.setState({ [e.target.name]: e.target.value });
}








  
 
  Radiohandle = event => {
    this.setState({ selectedValue: event.target.value });
  };
  handleChange = event => {
    this.setState({ course: event.target.value });
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
    const { value_ } = this.state;
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
          { key: course._id, text:course.coursename, value: course._id}))
          const b = removeDuplicates(options, 'text'); 
    return (
        <div>
          <nav aria-label="breadcrumb">
  <ol class="breadcrumb" style={nav}>
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    
    <li class="breadcrumb-item"><a href="/__Top__Up__">TopUp Lists</a></li>
    
   <li class="breadcrumb-item active" aria-current="page">Add TopUp</li>
  </ol>
</nav>
        <Card style={helpde}>
        <div>
      <div className={classes.root}>
        <form   onSubmit={this.onSubmit} error>
        <TextField
          id="outlined-select-currency"
          select
          label="Courses Name"
          className={classes.textField}
          style={{height:40}}
          value={this.state.course}
          onChange={this.handleChange}
          error={errors.course}
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
            <MenuItem value={c.value}>{c.text}</MenuItem>)}
            
        </TextField>
     
       
        <TextField
        isRequired
          id="outlined-email-input"
          label="Title *
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
          name="title"
              
                type="title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
         
          autoComplete="text"
          margin="normal"
          variant="outlined"
        />

<TextField
isRequired
          id="outlined-email-input"
          label="No of Credits * *
          "className={classes.textField}
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
         
          name="no_of_credits"
                
                type="no_of_credits"
                value={this.state.no_of_credits}
                onChange={this.onChange}
                error={errors.no_of_credits}
          autoComplete="text"
          margin="normal"
          variant="outlined"
        />
        <TextField
        isRequired
          id="outlined-email-input"
          label="Amount*
          "className={classes.textField}
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
         
          name="amount"
                
                type="amount"
                value={this.state.amount}
                onChange={this.onChange}
                error={errors.amount}
          autoComplete="text"
          margin="normal"
          variant="outlined"
        />
        <TextField
        isRequired
          id="outlined-email-input"
          label="Tax in % *
          "className={classes.textField}
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
        />
     <TextField
     isRequired
          id="outlined-email-input"
          label=" Description
          "
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
          multiline
          rows="6"
          name="description"
   type="description"
   value={this.state.description}
   onChange={this.onChange}
   error={errors.description}
          autoComplete="text"
          margin="normal"
          variant="outlined"
          style={{width:380,marginLeft:10}}
        />
         
       
         
      
      <div> <Button variant="contained" type="submit"  id="btnchip" className={classes.button}>
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
  addTopup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  topup: PropTypes.object.isRequired,

  getCourselevels1: PropTypes.func.isRequired,
  courselevel: PropTypes.object.isRequired,
  courselevels: PropTypes.array.isRequired,

  getCredits: PropTypes.func.isRequired,
  credit: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  courselevel: state.courselevel,
  courselevels:state.courselevels,

  topup: state.topup,

  credit: state.credit,
  credits:state.credits,
  errors: state.errors
});


export default connect(mapStateToProps, { getCredits,addTopup,getCourselevels1 })(withStyles(styles, { withTheme: true })(MultipleSelect));
