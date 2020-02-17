import React from 'react';
import Router from "./Router";
import Header from "./partials/header";

function App() {
    return (
        <div className='page-container'>
            <Header/>
            <Router/>
        </div>
    );
}

export default App;
