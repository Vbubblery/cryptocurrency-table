import React from "react";
import axios from 'axios';
class TableList extends React.Component{
  constructor(props){
    super(props);
    this.classes = props.classes;
  };

  componentDidMount () {
    // this.getData();
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
        Hello world2
      </>
    )
  }
}


export default TableList;
