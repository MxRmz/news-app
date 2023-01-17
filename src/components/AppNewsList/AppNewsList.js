import React, {Component} from 'react';
import './AppNewsList.scss';
import NewsService from '../../services/NewsService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import Highlighter from "react-highlight-words";



class AppNewsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news_all: [],
            loading: true,
            error: false,
            term: '',
        }
    }

    

    newsService = new NewsService();

    onNewsLoaded = (news_all) => {
        this.setState({
            news_all,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateNews = () => {
        this.newsService
            .getAllArticles()
            .then(this.onNewsLoaded)
            .catch(this.onError);
            }

    componentDidMount() {
        console.log(this.props.term)
        this.updateNews();
    }

    cutSymbols = (string) => {
        if (string.length > 100) {
            string = string.slice(0, 101) + "..."
        }
        return string
    }

    searchWord = (articles, terms) => {
        if (terms) {
            let term = terms.toLowerCase().split(' '),
            title_match = [],
            description_match = [];
                articles.forEach(article => {
                    for(let i=0; i<=term.length; i++){
                        if (article.title.toLowerCase().indexOf(term[i]) > -1) {
                            /* let highlited = this.getHighlightedText(article.title, term[i])
                            console.log(highlited) */
                            title_match.push(article)
                        } else if (article.description.toLowerCase().indexOf(term[i]) > -1) {
                            description_match.push(article)
                        }
                    }
                });
            return [...new Set([...title_match,...description_match])];
        }
        return articles
   }

/*     getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        let highlited = parts.map((part) => {
            if (part.toLowerCase() === highlight.toLowerCase()) {
                return <span className="highlight">{part}</span>
            }
            return part
        })
        return highlited.join('')
    } */

    render () {
        const {term, news_all, loading, error} = this.state
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const visibleNews = this.searchWord(news_all, this.props.term)
        
        const view = visibleNews.map((news, i) => {
            return  (
                <li key={i} className="news_item" onClick={() => {this.props.updateData(news)}}>
                    <img src={news.thumbnail} alt={news.title}/>
                    <div className="news_data">
                        <div className="news_date">{news.date}</div>
                        <div className="news_name">
                        <Highlighter
                            highlightClassName="highlight"
                            searchWords={this.props.term.split(' ')}
                            autoEscape={true}
                            textToHighlight={news.title}
                        />
                        </div>          
                        <div className="news_description">
                        <Highlighter
                            highlightClassName="highlight"
                            searchWords={this.props.term.split(' ')}
                            autoEscape={true}
                            textToHighlight={this.cutSymbols(news.description)}
                        />
                        </div>
                        <div className="news_button">{news.button}</div>
                    </div>
                </li>
            )
            
            
    /*            (
                <View
                    key={char.id}
                    id={char.id}
                    name={char.name}
                    thumbnail={char.thumbnail}
                />
                ) */
        })
        const content = !(loading || error) ? view : null;
        const count = view.length
        return (
            <div>
                <div className="result">Result: {visibleNews.length}</div>
                <div className="line"></div>
                <main className="news_list">
                    <ul className="news_grid">
                        {view}
                    </ul>
                </main>
            </div>
        )
    }
}

const View = ({id, name, thumbnail}) => {
        return (<li className="char__item" onClick={this.setId(id)}>
                    <img src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>)
}

export default AppNewsList;