import React from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import {Toolbar,Typography,Divider,MenuItem,Select} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  title: {
    flex: '0 0 auto',
  },
});

const ITEM_HEIGHT = 55;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class GridToolBar extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount () {}

  componentWillUnmount () {}

  handleChange = event => {
    this.props.handleCurrencyChange(event.target.value)
  };

  render(){
    const {classes,currencies,currency} = this.props;
    return(
      <Toolbar className={classes.root}>
        <Typography component="p" style={{flex: 1,}} variant="h6" align="left" id="tableTitle">Coinmarketcap</Typography>
        <div>
          <Select
            value={currency}
            onChange={this.handleChange}
            MenuProps={MenuProps}
          >
            {currencies.map(c => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </div>
      </Toolbar>
    )
  }
}
GridToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(toolbarStyles)(GridToolBar);
