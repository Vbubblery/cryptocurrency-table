import React from "react";
import axios from 'axios';
// components
import Grid from './GridAdvance/Grid';

// redux connect
import {connect} from 'react-redux';
import {resetGrid, updateGrid} from '../store'

class TableList extends React.Component{
  constructor(props){
    super(props);
    this.classes = props.classes;
  };

  componentDidMount () {
    // this.getData();
    this.handleInput()
  }

  handleInput = () => {
    const {dispatch} = this.props;
    const header = ["a","b","c"]
    const csv = [{"a":1,"b":2,"c":3}]
    dispatch(updateGrid({data:{header:header,body:csv}}));
  }

  async getData(){
    const options = {
      method: 'get',
      url:'/api/cryptocurrency/listings/latest',
      params:{
        start: 1,
        limit: 5000,
        convert: 'USD'
      }
    };
    const res = await axios(options);
    console.log(res)
  }

  componentWillUnmount () {}

  render(){
    return(
      <>
        <Grid
          tableHeader={this.props.gridPage.data.header}
          tableData={this.props.gridPage.data.body}
        />
      </>
    )
  }
}

function mapStateToProps (state) {
  const {gridPage} = state;
  return gridPage
}

export default connect(mapStateToProps)(TableList);
