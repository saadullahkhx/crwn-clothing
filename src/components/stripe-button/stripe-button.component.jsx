import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HM6fpEaNDYVVZ3OUhzLqDws9mhCQDgMDy8KJiDexdhcpi0kELooyoTxPmcyNcYNbqfOcwuTaP0TKHlItFVw3CUP00qGAojRfu';

    const onToken = token => {
        console.log(token);
        alert('payment successful!')
    }   

    return (
        <StripeCheckout 
        label='Pay Now'
        name='Crwn Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is ${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;