import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import classes from './App.module.scss'

function App() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={() => "Hello World"}/>
        </BrowserRouter>
    )
}

export default App
