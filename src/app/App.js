import React, { Component } from 'react';
import AppHeader from "../components/appHeader/AppHeader";
import AppNewsList from "../components/AppNewsList/AppNewsList";
import AppArticlePage from '../components/appArticlePage/AppArticlePage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    render() {

        return (
            <div className="app">
                <AppHeader onUpdateSearch={this.onUpdateSearch}/>
                <AppNewsList term={this.state.term}/>

                {/* <AppArticlePage/> */}
{/*                 <main>
                    <input>erwe</input>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList updateData={this.updateData}/>
                        <CharInfo char={this.state.char}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main> */}
            </div>
        )
    }
    
}

export default App;