import React from "react";
import PropTypes from 'prop-types';

import {TableRow,TableBody,TableCell,TextField,Typography,Checkbox,Avatar} from '@material-ui/core';

import {stableSort,getSorting} from '../../lib/gridUtils';

import {findById} from '../../lib/gridUtils';

class GridBody extends React.Component{
  constructor(props){
    super(props);
    this.classes = props.classes;
  };

  componentDidMount () {}

  componentWillUnmount () {}

  render(){
    const {tableData,tableHeader,rowsPerPage,page,order,orderBy} = this.props;
    return(
      <TableBody >
        {stableSort(tableData, getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row,key)=>{
            return(
              <TableRow hover key={key} tabIndex={-1}>
                {tableHeader.map((i,key)=>{
                  return(
                    <TableCell align="left" key={key}>
                      {i=='name'?
                         (<><Avatar src={`https://s2.coinmarketcap.com/static/img/coins/16x16/${row["id"]}.png`} /><Typography variant="body2">{row[i]}</Typography></>):
                         (<Typography variant="body2">{row[i]}</Typography>)
                      }
                    </TableCell>)
                })}
              </TableRow>
            )
          })}
      </TableBody>
    )
  }
}

GridBody.propTypes = {
  tableHeader: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.any),
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

export default GridBody;
