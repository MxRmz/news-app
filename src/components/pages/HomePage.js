import React, {Component} from 'react';
import AppHeader from "../appHeader/AppHeader";
import AppNewsList from "../AppNewsList/AppNewsList";

class HomePage extends Component {
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
            </div>
        )
    }
}
 
export default HomePage;
