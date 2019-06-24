import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import purple from '@material-ui/core/colors/purple';

import TextField from '@material-ui/core/TextField';

import green from '@material-ui/core/colors/green';

import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { addOfflineoffer,lastOfflineoffer } from "../../../actions/offlineofferActions";
import { getOfflineuser } from "../../../actions/offlineuserActions";
import { getPackage,getPackages } from "../../../actions/packageActions";
import { stringify } from 'querystring';
var addZero = require('add-zero');
var replace = require("str-replace");
const calender={
    width:30,
    marginTop:25,
    float:'left',
    marginLeft:12,
   
}


const helpde = {
    width:410,
    
    padding:20,
   
   borderRadius:'0px',
    border:'1px solid #0000001f',
    boxShadow:'0px 0px 0px 0px',
    marginRight:'10px',
    background:'#fafafa'
   
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
    width:350,
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
    width:350,
    height:40,
    float:'left',
    marginTop:'10px'
  
  },
  
  
  button: {
   width:200,
   height:50,
   marginTop:20,
    float:'left',
    marginLeft:100,
  },
  input: {
    display: 'none',
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
  container_: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textFiel_d: {
    float:'left',
    width:150,
    marginTop:0,
    marginLeft:10,
   
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


const nav={background:'#fafafa',
borderRadius:'0px',
textAlign:'left',
padding:'20px 0px',
marginTop:'-50px',
borderBottom:'1px solid #e6e3e3',};




class MultipleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user_id:'',
        package_id:'',
     start_date:'',
     end_date:'',
     amount:'',
     tax:'',
    coupon_code:'',
      discount:'',
      name: [],
      value_: 0,
      selectedValue: 'a',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


componentDidMount(){
    this.props.lastOfflineoffer(this.props.match.params.id)
    this.props.getOfflineuser(this.props.match.params.id)
    this.props.getPackages()
}

 
componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.offlineuser.offlineuser) {
      const offlineuser = nextProps.offlineuser.offlineuser;
    
      console.log(nextProps.offlineoffer)
      const offlineoffer = nextProps.offlineoffer.offlineoffer;
      console.log(offlineoffer)
      if(offlineoffer.length==0){
        
        this.setState({coupon_code :offlineuser.user_id+'0001'});
      }else{
        
     
      var fid=offlineoffer[0];
      
      var occurrences =String(offlineuser.user_id);
      
      var target = fid.coupon_code;
      console.log(occurrences )
      console.log(target )
      var replacement = "";
     var result =replace.all( occurrences ).ignoringCase().from( target ).with( replacement );
     console.log(result)
      var reew=+result + +1;
      console.log(reew)
      reew = addZero(reew, 4);
      var fcid=offlineuser.user_id+reew;
      console.log((fcid))
      this.setState({coupon_code : fcid});
  
    }
    const packages = nextProps.package.package;

console.log(packages)
    this.setState({
     
      tax:           packages.tax,
      amount:            packages.amount,
     
    });
  }
  }

onSubmit(e) 
{

  e.preventDefault();
      const newBook = 
      {
          user_id:this.props.match.params.id,
        package_id:               this.state.package_id,
       start_date:             this.state.start_date,
       end_date:             this.state.end_date,
       amount:            this.state.amount,
        coupon_code:        this.state.coupon_code,
        tax:      this.state.tax,
        discount:this.state.discount,
        
      };
  this.props.addOfflineoffer(this.props.match.params.id,newBook,this.props.history);
  this.props.history.push(`/Offlineuserlist/${this.props.match.params.id}`);
}


onChange(e) 
{
  this.setState({ [e.target.name]: e.target.value });
}





 
 
  Radiohandle = event => {
    this.setState({ selectedValue: event.target.value });
  };
  handleChange = event => {
    this.setState({ package_id: event.target.value },this.props.getPackage(event.target.value));
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
    
    
    const{packages} =this.props.package
  const { errors } = this.state;
console.log(this.state.package_id)
    const{offlineoffer}  =this.props.offlineoffer
const{offlineuser}=this.props.offlineuser
console.log(offlineuser)
const options=packages.map(course => (
  { key: course._id, text:course.title, value: course._id }))
    return (
        <div>
          <nav aria-label="breadcrumb">
  <ol class="breadcrumb" style={nav}>
    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
    
    <li class="breadcrumb-item"><Link to="/__Add__Package
">Offline Offers</Link></li>
    
   <li class="breadcrumb-item active" aria-current="page">Offline Offers</li>
  </ol>
</nav>
        <div style={helpde}>
        <div className="TextField-without-border-radius-for-react fieldset">
      <form className={classes.container}  onSubmit={this.onSubmit} error>
    
    {/* <FormControl className={classes.formControl}>
    
    <InputLabel htmlFor="age-simple">Package Name</InputLabel>
        <Select
          value={this.state.package_id}
          onChange={this.handleChange}
          error={errors.package_id} 
          variant="outlined"
          inputProps={{
            name: 'package_id',
            id: 'age-simple',
          }}

          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map(c=>
          <MenuItem value={c.value}>{c.text}</MenuItem>)}
        
        </Select>
      </FormControl> */}

<TextField
          id="outlined-select-currency"
          select
          label="Courses Name"
          className={classes.textField}
          style={{height:40}}
          value={this.state.package_id}
          onChange={this.handleChange}
          error={errors.package_id} 
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
            {options.map(c=>
          <MenuItem value={c.value}>{c.text}</MenuItem>)}
        
        </TextField>
     
       
       
        <TextField
          id="outlined-email-input"
          label="Amount  *
          "
         className={classes.textField}
          name="amount"
         
          type="amount"
          value={this.state.amount}
          onChange={this.onChange}
          error={errors.amount}
         
          
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
          label="Tax in % *
          "
          className={classes.textField}
         
          name="tax"
        
          type="tax"
          value={this.state.tax}
          onChange={this.onChange}
          error={errors.tax}
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
          label="Discount in % *
          "
          className={classes.textField}
         
          name="discount"
               
                type="discount"
                value={this.state.discount}
                onChange={this.onChange}
                error={errors.discount}
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
        id="date"
        value={this.state.start_date} onChange={this.onChange}
        type="date"
        name="start_date"
        defaultValue={Date.now}
        className={classes.textFiel_d}
        
      /> <p style={calender}>To</p>
      <TextField
        id="date"
        name="end_date"
        value={this.state.end_date} onChange={this.onChange}
        type="date"
        
        className={classes.textFiel_d}
        InputLabelProps={{
          shrink: true,
        }}
      />
       <button id="btnchip_" className={classes.button}>
        Submit
      </button>
    </form></div>
 
      </div>
      
      
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  addOfflineoffer: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  offlineoffer: PropTypes.object.isRequired,
lastOfflineoffer:PropTypes.func.isRequired,
getOfflineuser:PropTypes.func.isRequired,

getPackages: PropTypes.func.isRequired,
  package: PropTypes.object.isRequired,
  packages: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
   
  offlineuser:state.offlineuser,
      offlineoffer: state.offlineoffer,
      package: state.package,
      packages:state.packages,
      
      errors: state.errors
  });
export default connect(mapStateToProps, {getOfflineuser,getPackage,getPackages, addOfflineoffer ,lastOfflineoffer})(withStyles(styles, { withTheme: true })(MultipleSelect));
