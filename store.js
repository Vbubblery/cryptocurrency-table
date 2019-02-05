import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  gridPage:{
    data:{
      header:[],
      body:[],
    }
  }
};

const gridActionTypes = {
  UPDATE: 'UPDATE',
  RESET: 'RESET',
};

// Reducers
const gridReducer = (state = initialState, action) => { // state include the current state value.
  switch (action.type) {
    case gridActionTypes.UPDATE:
      return {...state, gridPage:{...state.gridPage,data:action.data}}
    case gridActionTypes.RESET:
      return {...state, gridPage:initialState.gridPage}
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
}

export const resetGrid = (props) => dispatch => {
  return dispatch({ type: gridActionTypes.RESET })
}


export const initializeStore = (initialState = initialState) => {
  return createStore(reducers, initialState,composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
