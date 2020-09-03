import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumalatedQuantity, cartItem) => {
        return accumalatedQuantity + cartItem.quantity
    }, 0)
)

export const selectHidden = createSelector(
    [selectCart],
    (cart => cart.hidden)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumalatedQuantity, cartItem) => {
        return accumalatedQuantity + cartItem.quantity * cartItem.price
    }, 0)
)