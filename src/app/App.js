import React, { Component } from 'react';
import HomePage from '../components/pages/HomePage';
import AppArticlePage from '../components/appArticlePage/AppArticlePage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <Router>
                <>
                    <Routes>
                        <Route path='/' element={<HomePage/>}></Route>
                        <Route path='/article/:articleId' element={<AppArticlePage/>}/>
                        <Route path='*'></Route>
                    </Routes>
                </>
            </Router>
        )
    }
}

export default App;