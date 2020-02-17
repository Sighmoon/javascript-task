import React from "react";
import {NavLink} from "react-router-dom";

export default function Header(props) {
    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to='/'>eShop</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto">
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to='/cart'>Shopping Cart</NavLink>
                    </li>
                </ul>
            </ul>
        </div>
    </nav>
}