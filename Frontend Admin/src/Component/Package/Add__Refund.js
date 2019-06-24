import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import CloseIcon from '@material-ui/icons/Close';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import SearchIcon from '@material-ui/icons/Search';

import { fade } from '@material-ui/core/styles/colorManipulator';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { getStudentCredits} from '../../actions/studentActions';
import { addRefund} from '../../actions/refundActions';
import green from '@material-ui/core/colors/green';
import {Table,TableCell,TableBody,TableFooter,IconButton,Dialog, DialogActions, DialogContent,DialogContentText,DialogTitle,Slide,TablePagination,TableRow,Switch,Tooltip,TableHead,Button,InputBase} from '@material-ui/core';
import {Add} from '@material-ui/icons';
const helpde = {
    width:'100%',
    marginBottom:20,
    border:'0px',
    boxShadow:'0px 0px 0px 0px',
    
    
   
  
   
  };
 
  const ho={

  }
const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}
const Page_position={
  float:'right',
  fontFamily:'ubuntu'
}
const styles = theme => ({
 
  tableWrapper: {
   
    marginRght:20,
   
  },
  
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 10,
  },
  paginborder:{
    border:0,
  },
  formControl: {
    margin: theme.spacing.unit,
    width:300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
   marginTop:25
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  Wdirai:{
      width:300,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width:'100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:300,
    height:40,
    float:'left',
    
   
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
   marginTop:40,
   marginBottom:20,
   marginLeft:500,
    float:'left',
  
  },
  input: {
    display: 'none',
  },
  marho:{
      
      width:500,
  },
  typep:{
      float:'right',
      marginRight:'23%',
      marginTop:20,
  },
  fmarho:{
    marginLeft:20,
},
root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  cardposition:{
    marginBottom:20,
    height:60,
    
    paddingRight:10,
  },
  addicon:{
    width:20,
    height:20,
    float:'left',
  color:'white'  ,
  fontSize:'18px',
  marginLeft:'0px',
  marginTop:'0px',
  padding:'0px 0px'
  },
 
  search: {
    position: 'relative',
   
   marginTop:-45,
   
   float:'right',
   marginLeft:420,
   border:'1px solid #e8e8e8',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      
     
    },
    
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    color:'#d4d4d4',
    padding:'2px 4px'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    border:'0px'
  },
  inputInput: {
    height:11,
  
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft:45,
    fontSize:'12px',
    fontFamily:'ubuntu',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },

  tablebody:{
background:'white',
fontSize:12,
fontFamily:'ubuntu',
padding:0,

  },
  table:{
    background:'#f1f1f1',
    
  },
  
  errors: {
    color: theme.palette.error.dark,
  },
  

  colorSwitchBase: {
    color: '#7cbb42',
    '&$colorChecked': {
      color:'#7cbb42',
      '& + $colorBar': {
        backgroundColor: '#7cbb42'
      },
    },
  },
  colorBar: {},
  colorChecked: {},
  
  tablebody:{
    background:'white',
    fontSize:12,
    fontFamily:'ubuntu',
    padding:0,
    
      },
      table:{
        background:'#f1f1f1',
        
      },
      
      DialogWidth:{
        width:550,
        marginTop:100,
        height:400,
        marginLeft:'30%',
        float:'left'
      },
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
const titlecolor={
  color:'#464646',
 textAlign:'center',
 paddingTop:10,
 paddingbottom:5,
 height:50,
  fontFamily:'ubuntu',
  border:'1px solid rgb(230, 227, 227)',
 
}
const nav={background:'#fafafa',
borderRadius:'0px',
textAlign:'left',
padding:'20px 0px',
marginTop:'-50px',
borderBottom:'1px solid #e6e3e3',};
const tablecolor={
  color:'#464646',
  fontWeight:600,
  fontFamily:'ubuntu',
  border:'1px solid rgb(230, 227, 227)',
 
}
class CustomPaginationActionsTable extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    rows: [
     
    ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
    page: 0,
    rowsPerPage: 10,
    search:'',
    course_id:'',
    type:'',
    student_id : '',
      
      course_level_id :'',
      description : '',
      credits:'',
      ticket_no:'',
   
      user_id:''
  };
  this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

onChange(e) {
  this.setState({ [e.target.name]: e.target.value });
}
  onSubmit(e) {
    e.preventDefault();
        const newBook = {
         
          course_id: this.state.course_id,
          type: this.state. type,
          student_id :  this.state.student_id,
            
            course_level_id : this.state.course_level_id,
            description :  this.state.description,
            credits: this.state.credits,
            ticket_no: this.state.ticket_no,
         
            user_id: this.state.user_id
        };
        console.log(newBook)
      this.props.addRefund(newBook);
    
     this.props.history.push('/__Refund__Credit__');
     this.setState({ open_: false });
      }
  



  updateSearch(event){
    console.log(event.target.value)
    this.setState({search:event.target.value});
    console.log(this.state.search)
    this.props.getStudentCredits(event.target.value);
}
handleChange = event => {
  console.log(event)
  this.setState({ course_id: event.target.value });
};
handleChange1 = event => {
  const{user}=this.props.auth
  const{students}=this.props.student
  const h=students.map(c=>c.student_id)
  console.log(h)
  this.setState({ type: event.target.value });
  this.setState({  user_id:user.id})
this.setState({student_id:h[0]})
};
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleClickOpen_ = () => {
    this.setState({ open_: true });
  };

  handleClose_ = () => {
    this.setState({ open_: false });
  };
  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const {students}  = this.props.student;
    const{user}=this.props.auth
    const { errors } = this.state;
    for (let i = 0; i <students.length?students.length:0; i++) {
     // students[i].sno= k + +i;
      console.log(students[i].course_id)
      if(students[i].course_id=="5abcd6ee466c1cc09e4f5d14"){
        students[i].d="CS"
      }
      else if(students[i].course_id=="5abcd6ea466c1cc09e4f5d13"){
        students[i].d="CA"
      }
      else{
        students[i].d="CMA"
      }
    }
    console.log(students)
    console.log(this.state.student_id)
    return (
       
           <div>
               <nav aria-label="breadcrumb">
  <ol class="breadcrumb" style={nav}>
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    
    <li class="breadcrumb-item"><a href="#">Refund List</a></li>
    
   <li class="breadcrumb-item active" aria-current="page">Add Refund</li>
  </ol>
</nav>
 <div className={classes.cardposition}>
 <Tooltip title="Create Faculty"placement="right">
          <button id="btnchip"
           onClick={this.handleClickOpen_}
           variant="outlined"
           className={classes.chip}
          >
          
      <Add className={classes.addicon} />Add Refund

      </button>
      
      
        </Tooltip>
        <Dialog
         className={classes.DialogWidth}
          fullScreen
          open={this.state.open_}
        onClose={this.handleClose_}
         
        ><form onSubmit={this.onSubmit} >
          <div className="dialog-header">
          
            <button id="btn_btn_Cancel_chip"  type="button"onClick={this.handleClose_}>
              
              <CloseIcon />
               
              </button>
             
              <button id="btn_btn_chip" type="submit"  >
                save
              </button>
         
          </div>
         <div id="textform" className="TextField-without-top-border-radius fieldset">
         
        
      {/* <FormControl variant="outlined" className={classes.formControl}>
      Course *
        <Select
        label="Feature"
          value={this.state.type}
          onChange={this.handleChange}
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              style={{width:450}}
              name="type"
              id="outlined-age-simple"
            />
          }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Video'} >Video</MenuItem>
          <MenuItem value={'Quiz'} >Quiz</MenuItem>
          <MenuItem value={'Examples'} >Examples</MenuItem>
          <MenuItem value={'Did You Know'} >Did you know</MenuItem>
          <MenuItem value={'Downloads'} >Downloads</MenuItem>
          <MenuItem value={'Notes'} >Notes</MenuItem>
        </Select>
      </FormControl> */}

<TextField
          id="outlined-select-currency"
          select
          label="Courses Name"
          className={classes.textField}
          style={{height:40}}
          value={this.state.course_id}
          onChange={this.handleChange}
          name="course_id"
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
            
            {students.map(c=>
            <MenuItem value={c.course_id} >{c.d}</MenuItem>)}
        </TextField>
     

      {/* <FormControl variant="outlined" className={classes.formControl}>
      Type *
        <Select
        label="Feature"
          value={this.state.type}
          onChange={this.handleChange}
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              style={{width:450}}
              name="type"
              id="outlined-age-simple"
            />
          }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Video'} >Video</MenuItem>
          <MenuItem value={'Quiz'} >Quiz</MenuItem>
          <MenuItem value={'Examples'} >Examples</MenuItem>
          <MenuItem value={'Did You Know'} >Did you know</MenuItem>
          <MenuItem value={'Downloads'} >Downloads</MenuItem>
          <MenuItem value={'Notes'} >Notes</MenuItem>
        </Select>
      </FormControl> */}

        <TextField
          id="outlined-select-currency"
          select
          label="Type *"
          className={classes.textField}
          style={{height:40}}
          value={this.state.type}
          onChange={this.handleChange1}
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
            <MenuItem value='Credit' >Credit</MenuItem>
           <MenuItem value='Debit' >Debit</MenuItem>
          </TextField>
     
        <TextField
          id="outlined-email-input"
          label=" Number of Credits"
          className={classes.textField}
          name="credits"
                 type="number"
                 value={this.state.credits}
                 onChange={this.onChange}
                 //error={errors.credits}
          style={ho}
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
       label=" Ticket Number *"
       className={classes.textField}
       name="ticket_no"
                 type="text"
                 value={this.state.ticket_no}
                 onChange={this.onChange}
                
       style={ho}
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
          label="Content"
          className={classes.textField}
          multiline
          rowsMax="4"
          name="description"
                 type="text"
                 value={this.state.description}
                 onChange={this.onChange}
                
          rows="5"
          style={ho}
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
        /></div>
         
              </form>
        </Dialog>
      
          <div className={classes.grow} />
          <div className={classes.search}>
           <div className={classes.searchIcon}>
             <SearchIcon />
           </div>
           <InputBase
             placeholder="Search…"
             classes={{
               root: classes.inputRoot,
               input: classes.inputInput,
             }}
             value={this.state.search}
                onChange={this.updateSearch.bind(this)}
           />
         </div>
   

          </div>
               
             
             
        
      
      
    
          <Table className={classes.root}>
         
          <TableHead className={classes.table}>
          <TableRow>
          <TableCell style={tablecolor}> S.No</TableCell>
          <TableCell style={tablecolor}>Course</TableCell>
          <TableCell style={tablecolor}>Course Level</TableCell>
          <TableCell style={tablecolor}>Total Credits</TableCell>
          <TableCell style={tablecolor}>Balance Credits</TableCell>
          
         
          </TableRow>
        </TableHead>
            <TableBody className={classes.tablebody}>
              {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                     1
                    </TableCell>
                   
                    <TableCell>{row.d}</TableCell>
                    <TableCell > {row.course_level_id}</TableCell>
                    <TableCell >{row.credits_per_month}</TableCell>
                    <TableCell >{row.credits_per_month}-{row.credits_used}</TableCell>
                    
                  </TableRow>
                );
              })}
              
            </TableBody>
           
          </Table>
         
          <TablePagination
        style={Page_position}
                rowsPerPageOptions={[10, 20, 30]}
                colSpan={3}
                className={classes.paginborder}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
        </div>
     
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  getStudentCredits: PropTypes.func.isRequired,

  students: PropTypes.array.isRequired,
  addRefund: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  refund: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  student:state.student,
   students:state.students,
   refund: state.refund,
  errors: state.errors,
  auth:state.auth
 });
export default  connect(mapStateToProps, { getStudentCredits ,addRefund})(withStyles(styles)(CustomPaginationActionsTable));
