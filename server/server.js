const express = require('express');
const express_graphql = require('express-graphql');
const {buildSchema, GraphQLID, GraphQLInputObjectType, GraphQLInt} = require('graphql');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/eShop");

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Product = mongoose.model("Product", {
    name: String,
    description: String,
    image: String
});

const ShoppingCart = mongoose.model("ShoppingCart", {
    email: String,
    products: [{
        productID: String,
        quantity: Number
    }]
});

Product.create({
    name: "Test product",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non hendrerit purus, nec ullamcorper lectus. Integer viverra id ipsum nec semper. Sed commodo lacus rhoncus leo finibus, sed aliquet neque.",
    image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
});

const typeDefs = `

type Product {
    id: ID!
    name: String!
    description: String!
    image: String!
}

type ShoppingCartItem {
    productID: String, 
    quantity: Int
}

input ShoppingCartItemInput {
    productID: String, 
    quantity: Int
}

type ShoppingCart {
    id: ID!
    email: String
    products: [ShoppingCartItem]
}

type Mutation {
    addProduct(name: String!, description: String!, image: String): Product!,
    deleteProduct(id: ID!): String
    submitShoppingCart(email: String, products: [ShoppingCartItemInput]): ShoppingCart!
}

type Query {
    products: [Product]
    product: Product
    shoppingCart: ShoppingCart
    shoppingCarts: [ShoppingCart]
}

`;

// GraphQL schema
let schema = buildSchema(typeDefs);

const resolvers = {
    product: async ({id}) => await Product.findById(id),
    products: () => Product.find(),
    addProduct: async ({name, description, image}) => {
        const product = new Product({name, description, image});
        await product.save(function (err) {
            if (err) console.log(err)
        });
        return product
    },
    deleteProduct: async ({id}) => {
        await Product.findByIdAndRemove(id, {useFindAndModify: false});
        return "Product removed"
    },
    shoppingCart: async ({id}) => await ShoppingCart.findById(id),
    shoppingCarts: () => ShoppingCart.find(),
    submitShoppingCart: async ({email, products}) => {
        const shoppingCart = new ShoppingCart({email, products});
        await shoppingCart.save(function (err) {
            if (err) console.log(err)
        });
        return shoppingCart
    }
};

// Create an express server and a GraphQL endpoint
let app = express();

// allow cross-origin requests
app.use(cors());

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

mongoose.connection.once("open", function () {
    app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
});