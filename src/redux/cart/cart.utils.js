export const cartItemToAdd = (cartItems, itemToAdd) => {
    const isExisting = cartItems.find(cartItem => cartItem.id === itemToAdd.id);

    if (isExisting) {
        return cartItems.map(cartItem => cartItem.id === itemToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )
    }

    return [...cartItems, {...itemToAdd, quantity: 1}];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const exisitingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    if (exisitingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    
    return cartItems.map(
        cartItem => {
            if (cartItem.id === cartItemToRemove.id) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity - 1
                }
            } else {
                return cartItem
            }
        }
    );
}