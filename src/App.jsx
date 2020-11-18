import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import classes from './App.module.scss'
import CollectionList from './views/CollectionList/CollectionList'
import Collection from './views/Collection/Collection'

function App() {
    return (
        <BrowserRouter>
        <div className={classes.container}>
            <Route path="/" exact component={CollectionList}/>
            <Route path="/collection/:id" exact component={Collection}/>
        </div>
        </BrowserRouter>
    )
}

export default App
