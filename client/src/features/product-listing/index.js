import React from "react";
import ProductListItem from "./product-list-item";
import {connect} from 'react-redux'

function ProductListing(props) {
    console.log(props);
    if (props.data.loading) {
        return <p>Loading ...</p>;
    }
    if (props.data.error) {
        return <p>{props.data.error.message}</p>;
    }
    return <div className='product-listing'>
        {
            props.data.products.map(product =>
                <ProductListItem
                    product={product}
                    addToCart={props.addToCart}
                    removeFromCart={props.removeFromCart}
                    cartItem={props.cart.filter(cartItem => cartItem.id === product.id)[0]}/>)
        }
    </div>
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (item) => {
            dispatch({type: 'ADD', payload: item})
        },
        removeFromCart: (item) => {
            dispatch({type: 'REMOVE', payload: item})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing)