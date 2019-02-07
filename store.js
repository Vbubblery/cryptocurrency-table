import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  gridPage:{
    data:{
      header:[],
      body:[],
    },
    currency:"USD",
    filter:"",
  }
};

const gridActionTypes = {
  UPDATE: 'UPDATE',
  UPDATECURRENCY:'UPDATECURRENCY',
  FILTER:'FILTER'
};

// Reducers
const gridReducer = (state = initialState, action) => { // state include the current state value.
  switch (action.type) {
    case gridActionTypes.UPDATE:
      return {...state, gridPage:{...state.gridPage,data:action.data}}
      case gridActionTypes.UPDATECURRENCY:
        return {...state, gridPage:{...state.gridPage,currency:action.data}}
    case gridActionTypes.FILTER:
      return {...state, gridPage:{...state.gridPage,filter:action.data}}
    default: return state
  }
}

// Combine Reducers
const reducers = combineReducers({
  gridPage:gridReducer,
});

//Actions
export const updateGrid = (props) => dispatch => dispatch({ type: gridActionTypes.UPDATE, data:props.data })
export const updateCurrency = (props) => dispatch => dispatch({ type: gridActionTypes.UPDATECURRENCY, data:props.currency })
export const updateFilter = (props) => dispatch => dispatch({ type: gridActionTypes.FILTER, data:props.filter })


export const initializeStore = (initialState = initialState) => {
  return createStore(reducers, initialState,composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
