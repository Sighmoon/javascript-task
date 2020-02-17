import React from "react";

function sort(items) {
    return items.sort((a, b) => a.id.localeCompare(b.id))
}

export default function CartList(props) {
    return <div className="row">
        <div className="col-12">
            <table className="table ">
                <thead>
                <tr className="row">
                    <th scope="col" className="col-md-6">Item</th>
                    <th scope="col" className="col-md-4 text-center">Quantity</th>
                    <th scope="col" className="col-md-2"/>
                </tr>
                </thead>
                <tbody>
                {
                    sort(props.cart).map(item => <tr className="row">
                        <td className="col-md-6">{item.name}</td>
                        <td className="col-md-4 text-center">{item.quantity}</td>
                        <td className="col-md-2">
                            <button type="button" className="btn btn-primary btn-sm mr-2"
                                    onClick={() => props.addToCart(item)}>+
                            </button>
                            <button type="button" className="btn btn-primary btn-sm mr-2"
                                    onClick={() => props.removeFromCart(item)}>-
                            </button>
                            <button type="button" className="btn btn-danger btn-sm"
                                    onClick={() => props.removeAllFromCart(item)}>X
                            </button>
                        </td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
    </div>
}
