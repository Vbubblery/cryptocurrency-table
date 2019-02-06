import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  gridPage:{
    data:{
      header:[],
      body:[],
    },
    currency:"USD"
  }
};

const gridActionTypes = {
  UPDATE: 'UPDATE',
  UPDATECURRENCY:'UPDATECURRENCY'
};

// Reducers
const gridReducer = (state = initialState, action) => { // state include the current state value.
  switch (action.type) {
    case gridActionTypes.UPDATE:
      return {...state, gridPage:{...state.gridPage,data:action.data}}
    case gridActionTypes.UPDATECURRENCY:
      return {...state, gridPage:{...state.gridPage,currency:action.data}}
    default: return state
  }
}

// Combine Reducers
const reducers = combineReducers({
  gridPage:gridReducer,
});

//Actions
export const updateGrid = (props) => dispatch => {
  return dispatch({ type: gridActionTypes.UPDATE, data:props.data })
  // console.log(props.data)
}
export const updateCurrency = (props) => dispatch => {
  // console.log(props);
  return dispatch({ type: gridActionTypes.UPDATECURRENCY, data:props.currency })
  // console.log(props.data)
}

export const initializeStore = (initialState = initialState) => {
  return createStore(reducers, initialState,composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
