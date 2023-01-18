import React, {Component} from 'react';
import './AppNewsList.scss';
import NewsService from '../../services/NewsService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import Highlighter from "react-highlight-words";
import { Link } from 'react-router-dom';



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

    render () {
       
        const {term, news_all, loading, error} = this.state
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        
        const visibleNews = this.searchWord(news_all, this.props.term)
        
        const view = visibleNews.map(news => {
            return  (
                <li key={news.id} className="news_item" onClick={() => {}}>
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
                        <div className="news_button">
                            <Link to={`/article/${news.id}`}>Read more</Link>
                        </div>
                    </div>
                </li>
            )
        })
        const content = !(loading || error) ? <View view={view} length={visibleNews.length}/> : null;
        return (
                <>
                    {errorMessage}
                    {spinner}
                    {content}
                </>
        )
    }
}

const View = (props) => {
    return (
        <div className="homepage">
            <div className="result">Result: {props.length}</div>
            <div className="line"></div>
            <main className="news_list">
                <ul className="news_grid">
                    {props.view}
                </ul>
            </main>
        </div>

    )
}

export default AppNewsList;