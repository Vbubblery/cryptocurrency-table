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
    this.handleInput();
  }

  handleInput = async() => {
    const {dispatch} = this.props;
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
    let data = res.data.data;
    data = data.map(i=>{return {"id":i["id"],"name":i['name'],...i["quote"][options.params.convert]}})
    const header = ["id","name","price","market_cap","volume_24h","percent_change_1h","percent_change_24h","percent_change_7d","last_updated"];

    dispatch(updateGrid({data:{header:header,body:data}}));
  }

  async getData(){


    if(res.status.error_code===0) return res.data
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
