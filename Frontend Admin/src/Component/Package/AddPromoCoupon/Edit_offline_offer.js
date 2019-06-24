import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { updateOfflineoffer, getOfflineoffer} from "../../../actions/facultyActions";
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from "react-router-dom";
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
   
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:600,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 500,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  CardContainer:{
    width:600,
    padding:20,
  },
});



class OutlinedTextFields extends React.Component {



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
  componentDidMount() {
   this.props.getOfflineoffer(this.props.match.params.id);
  
  
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.offlineoffer.offlineoffer) {
      const offlineoffer = nextProps.offlineoffer.offlineoffer;
     
      this.setState({
        user_id:      offlineoffer.user_id,
        package_id:               offlineoffer.package_id,
       start_date:             offlineoffer.start_date,
       end_date:             offlineoffer.end_date,
       amount:            offlineoffer.amount,
        coupon_code:        offlineoffer.coupon_code,
        tax:      offlineoffer.tax,
        discount:offlineoffer.discount,
      });
      const packages = nextProps.package.package;

      console.log(packages)
          this.setState({
           
            tax:           packages.tax,
            amount:            packages.amount,
           
          });
    }
  }
  onSubmit(e) {
    const{offlineoffer}=this.props.offlineoffer
    e.preventDefault();
   
 
    const bookData = {
        package_id:               this.state.package_id,
        start_date:             this.state.start_date,
        end_date:             this.state.end_date,
        amount:            this.state.amount,
         coupon_code:        this.state.coupon_code,
         tax:      this.state.tax,
         discount:this.state.discount,
    }
   
 
    this.props.updateOfflineoffer(this.props.match.params.id, bookData)
   this.props.history.push('/Faculty')
  }

  

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
   
  handleChange_password = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  Radiohandle = event => {
    this.setState({ selectedValue: event.target.value });
  };
  handleChange = event => {
    this.setState({ package_id: event.target.value },this.props.getPackage(event.target.value));
  };
  handleChange_ = (event, value_) => {
    this.setState({ value_ });
  };


  render() {
    const { classes } = this.props;
const nav={background:'white'};
const fieldtext ={
  width:350,
  
}

const{faculty}=this.props.faculty
   
const { errors } = this.state;
    return (<div>
      <nav aria-label="breadcrumb">
  <ol class="breadcrumb" style={nav}>
    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
    <li class="breadcrumb-item"><Link to="/faculty">Add Faculty</Link></li>
   

   <li class="breadcrumb-item active" aria-current="page">Edit Faculty</li>
  </ol>
</nav>
      <Card className={classes.CardContainer}> 
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit} error>
        
        <input type="hidden" name="faculty_id" value={this.state.faculty_id} />
          <TextField
            id="outlined-email-input"
            label="Enter Your First Name"
            className={classes.textField}
  
            name="first_name"
            type="first_name"
            value={this.state.first_name}
            onChange={this.onChange}
            error={errors.first_name}
            autoComplete="text"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-email-input"
            label="Enter Your Last Name"
            className={classes.textField}
            name="last_name"
      type="last_name"        
      value={this.state.last_name}
      onChange={this.onChange}
      error={errors.last_name}
            autoComplete="text"
            margin="normal"
            variant="outlined"
          />
  
  <TextField
            id="outlined-email-input"
            label="Enter Your Email Address"
            className={classes.textField}
            name="username"
     type="email"
     value={this.state.username}
     onChange={this.onChange}
     error={errors.username}
            autoComplete="email"
            margin="normal"
            variant="outlined"
          />
         


          <InputLabel htmlFor="adornment-password" >Password</InputLabel>
          <Input
          
          className={classes.textField}
            type={this.state.showPassword ? 'text' : 'password'}
           
         
            value={this.state.password}
            
            error={errors.password}
            
            onChange={this.handleChange_password('password')}
            margin="normal"
            variant="outlined"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <TextField
            id="outlined-dense"
            label="Enter Your Mobile Numbers"
            className={classNames(classes.textField, classes.dense)}
            name="mobile_no"
     type="mobile_no"
     value={this.state.mobile_no}
     onChange={this.onChange}
     error={errors.mobile_no}
            margin="dense"
            variant="outlined"
          />
         <TextField
            id="outlined-dense"
            label="Enter Your Profession"
            className={classNames(classes.textField, classes.dense)}
            name="profession"
     type="profession"
     value={this.state.profession}
     onChange={this.onChange}
     error={errors.profession}
            margin="dense"
            variant="outlined"
          />
  
  
          <TextField
            id="outlined-multiline-static"
            label="Short Description"
            multiline
            rows="4"
            name="description"
            type="description"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
            
        <Button variant="contained" type="submit" color="primary" className={classes.button}>
    Update
        </Button>
        <Button variant="contained"  color="secondary" className={classes.button}>
          Cancel
        </Button>
         
        </form>
        <div>
      
     
     
    </div></Card>
      </div>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
  updateOfflineoffer: PropTypes.func.isRequired,
  offlineoffer: PropTypes.object.isRequired,
  getOfflineoffer: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  offlineoffer: state.offlineoffer,
  errors:state.errors
});
export default connect(mapStateToProps, { updateOfflineoffer, getOfflineoffer}) (withStyles(styles)(OutlinedTextFields));