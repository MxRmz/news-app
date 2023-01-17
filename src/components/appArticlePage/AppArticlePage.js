/* import React, {Component} from 'react';
import AppText from '../AppGetText/AppGetText';
import NewsService from '../../services/NewsService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import './AppArticlePage.scss';



class AppArticlePage extends Component {


    article = new AppText()
    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        

    
        console.log(this.state.data)
        this.updateChar();
        
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
            }
    

    render() {
        const {char, loading, error} = this.state
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    
    return (
        <div>
            <header>
                <div>
                    <img src={news.thumbnail} alt={news.title}/>
                </div>
            </header>
            <main>

            </main>
        </div>
    )
}

export default AppArticlePage; */