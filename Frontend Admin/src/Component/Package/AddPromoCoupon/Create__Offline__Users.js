import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import purple from '@material-ui/core/colors/purple';


import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { addOfflineuser,lastOfflineuser } from "../../../actions/offlineuserActions";
var addZero = require('add-zero');
var replace = require("str-replace");
//import './App.css'
const helpde = {
    width:450,
    height:450,
    padding:20,
   float:'left',
   borderRadius:'0px',
   border:'1px solid #0000001f',
   boxShadow:'0px 0px 0px 0px',
   
  };
 
  
const nav={background:'#fafafa',
borderRadius:'0px',
textAlign:'left',
padding:'20px 0px',
marginTop:'-50px',
borderBottom:'1px solid #e6e3e3',};
  
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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width:500,
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
    width:390,
    height:40,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 400,
  },
  button: {
   width:200,
   height:50,
   marginTop:20,
    float:'left',
    marginLeft:100,
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
        user_id:'',
     first_name:'',
     last_name:'',
     email:'',
    mobile_no:'',
      company:'',
      name: [],
    value_: 0,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


componentDidMount(){
    this.props.lastOfflineuser()
}

 
componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.offlineuser.offlineuser) {
      const offlineuser = nextProps.offlineuser.offlineuser;
      console.log(offlineuser.length)
      if(offlineuser.length==0){
        this.setState({user_id :"LC001"});
      }else{
      const b=offlineuser[0]
      // var c=b.Id
    // console.log(c)
     
     var fid=b.user_id;
     var target=fid
     var occurrences = "LC";
    console.log(fid)
    var replacement = "";
    var result = replace.all( occurrences ).ignoringCase().from(target).with(replacement);
    console.log(result) 
   
   var r= +result + +1;

    console.log(r)
   r = addZero(r, 3);
   var t="LC"+r
   this.setState({user_id:t})
    console.log(t)
    
  
    }}
  }

onSubmit(e) 
{

  e.preventDefault();
      const newBook = 
      {
          user_id:this.state.user_id,
        first_name:               this.state.first_name,
       last_name:             this.state.last_name,
       email:            this.state.email,
        mobile_no:        this.state.mobile_no,
        company:      this.state.company,
        
      };
  this.props.addOfflineuser(newBook,this.props.history);
  this.props.history.push('/__Add__Promo__coupon__');
}



onChange(e) 
{
  this.setState({ [e.target.name]: e.target.value });
}






  handleChange = event => {
    this.setState({ name: event.target.value });
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
   
    const { errors } = this.state;

    const{offlineuser}  =this.props.offlineuser

console.log(offlineuser)
  

    return (
        <div>
          <nav aria-label="breadcrumb">
  <ol class="breadcrumb" style={nav}>
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    
    <li class="breadcrumb-item"><a href="#">Promo Code Table</a></li>
    
   <li class="breadcrumb-item active" aria-current="page">Salesforce Offer list</li>
  </ol>
</nav>
        <Card style={helpde}>
        <div>
      <div className={classes.root}>
        
        <form  onSubmit={this.onSubmit} error>
        <TextField
          id="outlined-email-input"
          label="First Name *"
          className={classes.textField}
          name="first_name"
         
          type="first_name"
          value={this.state.first_name}
          onChange={this.onChange}
          error={errors.first_name}
          placeholder="First Name *"
          autoComplete="text"
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
        />

<TextField
          id="outlined-email-input"
          label="Last Name *"
          className={classes.textField}
          placeholder="Last Name *"
          name="last_name"
      
          type="last_name"
          value={this.state.last_name}
          onChange={this.onChange}
          error={errors.last_name}
          autoComplete="text"
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
        />
        <TextField
          id="outlined-email-input"
          label="Email Address *"
          className={classes.textField}
          placeholder="Last Name *"
          name="email"
                
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
          autoComplete="text"
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
        />
        <TextField
          id="outlined-email-input"
          label="Mobile number *"
          className={classes.textField}
          placeholder="Last Name *"
          name="mobile_no"
               
                type="mobile_no"
                value={this.state.mobile_no}
                onChange={this.onChange}
                error={errors.mobile_no}
          autoComplete="text"
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
        />
        

<TextField
          id="outlined-email-input"
          label="Company Name *"
          className={classes.textField}
          placeholder="Last Name *"
          name="company"
               
                type="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
          autoComplete="text"
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
        />
        
      
     <Button variant="contained" type="submit"color="primary" id="btnchip" className={classes.button}>
        Submit
      </Button>
      </form>
      </div>
      </div></Card>
      
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  addOfflineuser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  offlineuser: PropTypes.object.isRequired,
lastOfflineuser:PropTypes.func.isRequired
};
const mapStateToProps = state => ({
   

  offlineuser: state.offlineuser,

  
  errors: state.errors
});

export default  connect(mapStateToProps, { addOfflineuser ,lastOfflineuser})(withStyles(styles, { withTheme: true })(MultipleSelect));
