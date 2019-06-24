import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TablePagination from '@material-ui/core/TablePagination';
import {TableRow,FormControlLabel,Switch }from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';


import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import { fade } from '@material-ui/core/styles/colorManipulator';

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


const styles = theme => ({
  root: {
    
   
  },
  
  tableWrapper: {
    overflowX: 'auto',
   
  },
  button: {
    margin: theme.spacing.unit,
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
  cardposition:{
    marginBottom:20,
    paddingRight:10,
    height:60,
    
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
   marginTop:10,
   

   float:'right',
   marginLeft:420,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
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
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [
   
    ],
    page: 0,
    rowsPerPage: 5,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    
    return (
       
        <div>
           <div>

        <div>
           </div>
           </div>
           <nav aria-label="breadcrumb">
  <ol class="breadcrumb" style={nav}>
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    
    <li class="breadcrumb-item"><a href="#">Salesforce Coupon</a></li>
    
   <li class="breadcrumb-item active" aria-current="page"> Salesforce Coupon List</li>
  </ol>
</nav>
           <div className={classes.cardposition}>
          
           
      
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
           />
         </div>
   

          </div>    
        
    
      
      
    
          <Table className={classes.root}>
         
          <TableHead className={classes.table}>
          <TableRow>
          <TableCell style={tablecolor}> S.No</TableCell>
          <TableCell style={tablecolor}>sf_deal_courses_id</TableCell>
          <TableCell style={tablecolor}>Package Code</TableCell>
          <TableCell style={tablecolor}>Courses</TableCell>
          <TableCell style={tablecolor}>Courses Level</TableCell>
          
          <TableCell style={tablecolor}>Discount</TableCell>
          <TableCell style={tablecolor}> Promocode</TableCell>
          <TableCell style={tablecolor}>Number of Logins</TableCell>
          <TableCell style={tablecolor}>Used</TableCell>
          <TableCell style={tablecolor}>Validity</TableCell>
          <TableCell style={tablecolor}>Status</TableCell>
          </TableRow>
        </TableHead>
            <TableBody className={classes.tablebody}>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                     1
                    </TableCell >
                    
                    
                    <TableCell>
                      fac35312
                      </TableCell>
                      
                      <TableCell>
                      fac35312
                      </TableCell>
                      
                      <TableCell>
                      fac35312
                      </TableCell>
                      <TableCell>
                      fac35312
                      </TableCell>
                      
                      <TableCell>
                      fac35312
                      </TableCell>
                    <TableCell > Hariparshad</TableCell>
                    <TableCell >Omksrisha</TableCell>
                    <TableCell >Hari.om@learncab.com</TableCell>
                                       
<TableCell>
                      fac35312
                      </TableCell>
                    <TableCell >

<FormControlLabel color ="primary"control={<Switch value="checkedC" />}  />
</TableCell >


                       
                
                  </TableRow>
                );
              })}
              
               
            </TableBody>
           
          </Table>
         

          <TablePagination
          style={{float:'right'}}
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={rows.length}
                className={classes.paginborder}
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
};

export default withStyles(styles)(CustomPaginationActionsTable);
