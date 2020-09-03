import {CartActionTypes} from './cart.types';
import {cartItemToAdd, removeItemFromCart} from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (prevState = INITIAL_STATE, action) => {
    if (action.type === CartActionTypes.TOGGLE_CART_HIDDEN) {
        return {
            ...prevState,
            hidden: !prevState.hidden
        }
    }
    else if (action.type === CartActionTypes.ADD_ITEM) {
        return {
            ...prevState,
            cartItems: cartItemToAdd(prevState.cartItems, action.payload)
        }
    }
    else if (action.type === CartActionTypes.CLEAR_ITEMS_FROM_CART) {
        return {
            ...prevState,
            cartItems: prevState.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            )
        }
    }

    else if (action.type === CartActionTypes.REMOVE_ITEM) {
        return {
            ...prevState,
            cartItems: removeItemFromCart(prevState.cartItems, action.payload) 
        }
    }
    
    else {
        return prevState
    }
}

export default cartReducer;