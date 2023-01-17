import React, {Component} from 'react';
import './appHeader.scss';

class AppHeader extends Component{
    constructor(props){
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value
        this.setState({term}, () => this.props.onUpdateSearch(this.state.term))
    } 

    render() {
        return (
            <header>
                <nav className="search">
                    <div className="search_wraper">
                        <label className="search_header" for="search">Filter by keywords</label>
                        <form className="search_form">
                            <input type="text" 
                                id="search" 
                                className="search_input" 
                                placeholder="The most successful IT companies in 2020"
                                value={this.state.term}
                                onChange={this.onUpdateSearch}/>
                        </form>
                    </div>
                </nav>
            </header>
        )
    }
}

export default AppHeader;