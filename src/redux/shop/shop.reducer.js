import { shopActionTypes } from './shop.types';

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined
}

const shopReducer = (prevState = INITIAL_STATE, action) => {
  if(action.type === shopActionTypes.FETCH_COLLECTIONS_START) {
      return {
        ...prevState,
        isFetching: true
      }
  }
  if(action.type === shopActionTypes.FETCH_COLLECTIONS_SUCCESS) {
    return {
      ...prevState,
      isFetching: false,
      collections: action.payload
    }
  }
  if(action.type === shopActionTypes.FETCH_COLLECTIONS_FAILURE) {
    return {
      ...prevState,
      isFetching: false,
      errorMessage: action.payload
    }
  }

  else return prevState
}

export default shopReducer;