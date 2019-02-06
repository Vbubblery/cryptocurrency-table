import React from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import {Toolbar,Typography,Divider,MenuItem,Select,Paper,InputBase} from '@material-ui/core';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  title: {
    flex: '0 0 auto',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
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
        <Typography component="p" variant="h6" style={{flex:0.5}} id="tableTitle">Coinmarketcap</Typography>
        <Paper style={{display:'flex',flex:0.5}} elevation={1} >
          <InputBase className={classes.input} placeholder="Filter the result" />
          <Divider className={classes.divider} />
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
        </Paper>
      </Toolbar>
    )
  }
}
GridToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(toolbarStyles)(GridToolBar);
