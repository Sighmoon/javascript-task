import React from "react";
import ProductListing from "../features/product-listing";
import {gql} from 'apollo-boost'
import {graphql} from "react-apollo";

const getProductsQuery = gql`
    {
        products {
            id
            name
            description
            image
        }
    }
`;

export default function HomePage(props) {
    return <div>
        <ProductListWithData/>
    </div>
}

const ProductListWithData = graphql(getProductsQuery)(ProductListing);