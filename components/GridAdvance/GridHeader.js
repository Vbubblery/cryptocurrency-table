import React from "react";
import PropTypes from 'prop-types';

import {TableHead,TableRow,TableCell,TableSortLabel,Checkbox} from '@material-ui/core';

class GridHeader extends React.Component{
  constructor(props){
    super(props);
    this.classes = props.classes;
  };

  componentDidMount () {}

  componentWillUnmount () {}

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };


  render(){
    const {tableHeader,order,orderBy,rowCount} = this.props;
    return(
      <TableHead>
        <TableRow>
          <TableCell>
            123
          </TableCell>
        </TableRow>
        <TableRow>
          {tableHeader.map(item=>{
            return(
              <TableCell
                key={item}
                sortDirection={orderBy === item ? order : false}
              >
                <TableSortLabel
                  active={orderBy === item}
                  direction={order}
                  onClick={this.createSortHandler(item)}
                >
                  {item}
                </TableSortLabel>
              </TableCell>
            )
          },this)}
        </TableRow>
      </TableHead>
    )
  }

}
export default GridHeader;
