import React from "react";
import axios from 'axios';
// components
import Grid from './GridAdvance/Grid';

// redux connect
import {connect} from 'react-redux';
import {updateGrid,updateCurrency} from '../store'

const currencies = [
  'USD',
  'CNY',
  'EUR',
  'JPY',
  'EGP'
];

class TableList extends React.Component{
  constructor(props){
    super(props);
    this.classes = props.classes;
  };

  componentDidMount () {
    this.handleInput();
  }

  handleInput = async() => {
    // const {dispatch,gridPage} = this.props;
    // const options = {
    //   method: 'get',
    //   url:'/api/cryptocurrency/listings/latest',
    //   params:{
    //     start: 1,
    //     limit: 5000,
    //     convert: gridPage.currency
    //   }
    // };
    // const res = await axios(options);
    // let data = res.data.data;
    console.log(this.props.gridPage.currency);
    // data = data.map(i=>{return {"id":i["id"],"name":i['name'],...i["quote"][options.params.convert]}})
    // const header = ["id","name","price","market_cap","volume_24h","percent_change_1h","percent_change_24h","percent_change_7d","last_updated"];

    // dispatch(updateGrid({data:{header:header,body:data}}));
  }

  handleCurrencyChange = props => {
    const {dispatch} = this.props;
    dispatch(updateCurrency({currency:props}));
    this.handleInput();
  }

  componentWillUnmount () {}

  render(){
    return(
      <>
        <Grid
          tableHeader={this.props.gridPage.data.header}
          tableData={this.props.gridPage.data.body}
          handleCurrencyChange={this.handleCurrencyChange}
          currencies={currencies}
          currency={this.props.gridPage.currency}
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
