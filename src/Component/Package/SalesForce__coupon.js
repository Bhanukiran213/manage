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

import './App.css';

import {  Link } from "react-router-dom";


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

  
  
  tablebody:{
background:'white',
fontSize:12,
fontFamily:'ubuntu',
padding:0,

  },
  table:{
    background:'#f1f1f1',
    
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

});

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
class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [
      createData('Cupcake', 305, 3.7),
      createData('Donut', 452, 25.0),
      createData('Eclair', 262, 16.0),
      createData('Frozen yoghurt', 159, 6.0),
      createData('Gingerbread', 356, 16.0),
      createData('Honeycomb', 408, 3.2),
      createData('Ice cream sandwich', 237, 9.0),
      createData('Jelly Bean', 375, 0.0),
      createData('KitKat', 518, 26.0),
      createData('Lollipop', 392, 0.2),
      createData('Marshmallow', 318, 0),
      createData('Nougat', 360, 19.0),
      createData('Oreo', 437, 18.0),
    ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
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
    
    
    <li class="breadcrumb-item active" aria-current="page">Salesforce Offer list</li>
  
  </ol>
</nav>
               
        
      
    
          <Table className={classes.root}>
         
          <TableHead className={classes.table}>
          <TableRow>
         <TableCell style={tablecolor}> S.No</TableCell>
         <TableCell style={tablecolor}>Nulurn Deal ID </TableCell>
         <TableCell style={tablecolor}>Full Name</TableCell>
         <TableCell style={tablecolor}>Mobile No.</TableCell>
         <TableCell style={tablecolor}>Email ID </TableCell>
          
         <TableCell style={tablecolor}>Status </TableCell>
          
          </TableRow>
        </TableHead>
            <TableBody className={classes.tablebody}>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                     1
                    </TableCell>
                    <TableCell>
                      <Link to="/Sales__Force__Offer__list" id="offline">
                      fac35312
                      </Link>
                      </TableCell>
                    <TableCell > Hariparshad</TableCell>
                    <TableCell >Omksrisha</TableCell>
                    <TableCell >Hari.om@learncab.com</TableCell>
                   
                    <TableCell >

<FormControlLabel control={<Switch value="checkedC" />}  />
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
                rowsPerPage={rowsPerPage}
                page={page}
                className={classes.paginborder}
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
