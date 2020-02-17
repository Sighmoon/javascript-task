import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

import './index.css';
import App from './App';
import store from './config/store'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
    }
});

const app = <Provider store={store}>
    <ApolloProvider client={client}>s
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ApolloProvider>
</Provider>
ReactDOM.render(app, document.getElementById('root'));