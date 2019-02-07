import React from "react";
import axios from 'axios';
// components
import Grid from './GridAdvance/Grid';

// redux connect
import {connect} from 'react-redux';
import {updateGrid,updateCurrency,updateFilter} from '../store'

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
    const {dispatch,gridPage} = this.props;
    const options = {
      method: 'get',
      url:'/api/cryptocurrency/listings/latest',
      params:{
        start: 1,
        limit: 5000,
        convert: gridPage.currency
      }
    };
    const res = await axios(options);
    let data = res.data.data;
    data = data.map(i=>{return {"id":i["id"],"name":i['name'],...i["quote"][options.params.convert]}})
    const header = ["id","name","price","market_cap","volume_24h","percent_change_1h","percent_change_24h","percent_change_7d","last_updated"];

    dispatch(updateGrid({data:{header:header,body:data}}));
  }

  handleCurrencyChange = async props => {
    const {dispatch} = this.props;
    await dispatch(updateCurrency({currency:props}));
    this.handleInput();
  }

  handleFilterChange = async props => {
    const {dispatch} = this.props;
    dispatch(updateFilter({filter:props}));
  }

  componentWillUnmount () {}

  render(){
    return(
      <>
        <Grid
          tableHeader={this.props.gridPage.data.header}
          tableData={this.props.gridPage.data.body}
          handleCurrencyChange={this.handleCurrencyChange}
          handleFilterChange={this.handleFilterChange}
          currencies={currencies}
          currency={this.props.gridPage.currency}
          filter={this.props.gridPage.filter}
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
