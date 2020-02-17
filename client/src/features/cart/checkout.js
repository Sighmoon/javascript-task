import React from "react";
import {Field, reduxForm} from 'redux-form'

function Checkout(props) {
    const {handleSubmit} = props;

    return <form id="checkoutForm" onSubmit={event => {
        handleSubmit(event);
    }} method="post">
        <div className="formGroup row">
            <label htmlFor="emailInput" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
                <Field className="form-control" id="emailInput" name="email" component="input" type="email"
                       placeholder="Email"/>
            </div>
        </div>
        <div>
            <button type="submit" className="btn btn-primary mt-2">
                Submit
            </button>
        </div>
    </form>
}

export default reduxForm({
    form: 'checkout'
})(Checkout)