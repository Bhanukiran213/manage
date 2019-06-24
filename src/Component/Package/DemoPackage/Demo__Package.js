import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import purple from '@material-ui/core/colors/purple';

import {  Link } from "react-router-dom";
import { getDemopackages,addDemopackage} from '../../../actions/demopackageActions';
import './App.css'
const tablecolor={
  color:'#464646',
  fontWeight:600,
  fontFamily:'ubuntu',
  border:'1px solid rgb(230, 227, 227)',
 
}
const nav={background:'#fafafa',
borderRadius:'0px',
textAlign:'left',
padding:'20px 0px',
marginTop:'-50px',
borderBottom:'1px solid #e6e3e3',};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
   
    height:35,
    marginTop:16,
  },
  textField_: {
    marginLeft: 70,
    marginRight: theme.spacing.unit,
    width:150,
    marginTop:16,
  },
  text_Field_: {
    marginLeft: 20,
    marginRight: theme.spacing.unit,
    width:150,
    marginTop:16,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  tablebody:{
    background:'white',
    fontSize:12,
    fontFamily:'ubuntu',
    padding:0,
    
      },
      table:{
        background:'#f1f1f1',
        
      }, cssLabel: {
        color:'#333',
        marginTop:-5,
        fontSize:12,
    
        '&$cssFocused': {
          color: purple[500],
          fontSize:14,
          borderRadius:'0px',
         
        
          
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

  
const btn={
    marginLeft:20,
    height:30,
    marginTop:20,
}


class FilledTextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title:'',
      no_of_credits:'',
    no_of_days:'',
      errors: {},
      name: 'Cat in the Hat',
      age: '',
      multiline: 'Controlled',
      currency: 'EUR',
      age_:'',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();


    const newBook = {
        title:this.state.title,
      no_of_credits: this.state.no_of_credits,
      no_of_days:this.state.no_of_days
    };

    this.props.addDemopackage(newBook);
    this.props.history.push('/__Demo__package');
    //window.location.reload();
    this.setState({title:''})
    this.setState({  no_of_credits:''})
    this.setState({no_of_days:''})
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    this.props.getDemopackages();

 
  }
 
 
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;


const { errors } = this.state;
const {demopackages}  = this.props.demopackage;


const k=1;
for (let i = 0; i <demopackages.length; i++) {
  demopackages[i].sno= k + +i;
  
 }
let filt=demopackages.filter((course)=> {
  return(
    course.last_updated !==undefined)});
const u=filt[0]
console.log(u)
    return (
        <div>
            
      <nav aria-label="breadcrumb">
  <ol class="breadcrumb" style={nav}>
    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
    

   <li class="breadcrumb-item active" aria-current="page">Package Demo</li>
  </ol>
</nav>
        <div>
      <form className={classes.container} onSubmit={this.onSubmit} error autoComplete="off">
        
      
      <TextField
      isRequired
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
          label="Free Trial"
          className={classes.textField}
        placeholder="Free Trial"
        name="title"
        type="text"
        value={this.state.title}
        onChange={this.onChange}
        error={errors.title}
       
        variant="outlined"
         
         
         
        />
        <TextField
        isRequired
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
          label="Number of Credits *"
          name="no_of_credits"
                 type="number"
                 value={this.state.no_of_credits}
                 onChange={this.onChange}
                 error={errors.no_of_credits}
                
          className={classes.textField}
          variant="outlined"
        />
        <TextField
        isRequired
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
          label="Number of Days"
          name="no_of_days"
          type="number"
          value={this.state.no_of_days}
          onChange={this.onChange}
          error={errors.no_of_days}
          className={classes.textField}
          variant="outlined"
        />
       
        <button id="btn_chip_play_" type="submit"  style={btn} >
        Submit
      </button>
      </form>
     
      </div>
     
      <Table className={classes.root}>
        <TableHead className={classes.table}>
          <TableRow>
            <TableCell style={tablecolor}>S.NO</TableCell>
            <TableCell style={tablecolor} >Title</TableCell>
            <TableCell style={tablecolor}> Total Credits </TableCell >
            <TableCell style={tablecolor}>From</TableCell>
            <TableCell style={tablecolor}>To</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody className={classes.tablebody}>
          {filt.map(row => {
            return (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.sno}
                </TableCell>
                <TableCell >{row.title}</TableCell>
                <TableCell >{row.no_of_credits}</TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell>{row.last_updated}</TableCell>
                
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
   
      </div>
    );
  }
}

FilledTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
  getDemopackages: PropTypes.func.isRequired,
  demopackage: PropTypes.object.isRequired,
  addDemopackage: PropTypes.func.isRequired,
 
   errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  demopackage: state.demopackage,
  demopackages:state.demopackages,
 
});
export default connect(mapStateToProps, { getDemopackages,addDemopackage})(withStyles(styles)(FilledTextFields));
