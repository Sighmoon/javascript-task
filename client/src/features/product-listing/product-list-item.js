import React from "react";

export default function ProductListItem(props) {
    let product = props.product;
    return <div className='product-listing-item card'>
        <img
            className='card-img-top'
            alt="Product preview"
            src={product.image}/>
        <div className='card-body'>
            <h5 className="card-title">{product.name} </h5>
            <p className='description'> {product.description} </p>
            <div>
                <button
                    className='btn btn-primary btn-sm mr-2'
                    onClick={() => props.addToCart(props.product)}>
                    Add to cart {
                    (props.cartItem && "(" + props.cartItem.quantity + ")") || ""
                }
                </button>
                {
                    props.cartItem
                        ? <button

                            className='btn btn-outline-primary btn-sm'
                            onClick={() => props.removeFromCart(props.cartItem)}>Remove from cart</button>
                        : null
                }
            </div>
        </div>
    </div>
}