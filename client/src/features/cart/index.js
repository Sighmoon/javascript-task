import React from "react";
import {connect} from 'react-redux'
import Checkout from "./checkout";
import CartList from "./shopping-cart-list";

import {useMutation} from '@apollo/react-hooks';
import {gql} from 'apollo-boost'

const SubmitCartMutation = gql`
  mutation SubmitCart($email: String, $products: [ShoppingCartItemInput]) {
    submitShoppingCart(email: $email, products: $products){
        email,
        products{
            productID
            quantity
        }
    }
  }
`;

function Cart(props) {
    const [submitCart] = useMutation(SubmitCartMutation);

    return <div className="container">
        <CartList
            cart={props.cart}
            addToCart={props.addToCart}
            removeFromCart={props.removeFromCart}
            removeAllFromCart={props.removeAllFromCart}
        />
        <Checkout onSubmit={(data) => {
            let products = props.cart.map(item => {
                return {
                    productID: item.id,
                    quantity: item.quantity
                }
            });
            submitCart({variables: {email: data.email, products: products}}).then((data) => {
                props.checkout(data)
            });
        }}/>
    </div>
}


function mapStateToProps(state) {
    return {
        cart: state.cart,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (item) => {
            dispatch({type: 'ADD', payload: item})
        },
        removeFromCart: (item) => {
            dispatch({type: 'REMOVE', payload: item})
        },
        removeAllFromCart: (item) => {
            dispatch({type: 'REMOVE_ALL', payload: item})
        },
        checkout: (checkoutPayload) => {
            dispatch({type: 'CHECKOUT', payload: checkoutPayload})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)