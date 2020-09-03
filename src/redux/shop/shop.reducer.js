import SHOP_DATA from '../../Pages/shop/shop.data'

const INITIAL_STATE = {
  collections: SHOP_DATA
}

const shopReducer = (prevState = INITIAL_STATE, action) => {
    if(action.type) {
        return prevState
    }
}

export default shopReducer;