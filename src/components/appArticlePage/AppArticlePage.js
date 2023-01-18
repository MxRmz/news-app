import React, {useEffect, useState} from 'react';
import { useParams, Link} from 'react-router-dom';
import NewsService from '../../services/NewsService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import './AppArticlePage.scss';


const AppArticlePage = () => {
    const {articleId} = useParams();
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const news_service = new NewsService();


    useEffect(() => {
        updateNews()
    })

    const updateNews = () => {
        news_service.getArticle(articleId)
            .then(onArticleLoaded)
            .catch(onError)
    }

    const onError = () => {
        setError(true);
    }
    const onArticleLoaded = (article) => {
        setArticle(article);
        setLoading(false);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !article) ? <View article={article}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>

    )

}


const View = ({article}) => {
    const {id, date, title, name, description, thumbnail} = article
    const background = {
        backgroundImage: 'url(' + thumbnail + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    return (
        <div className='article'>
                <div className='article_photo' style={background}></div>
                <div className='article_wrap'>
                <div className='article_canvas'>
                        <div className='article_header'>{title}</div>
                        <div className='article_body'>{description}</div>
                </div>
                <div className="article_goback"><Link to={`/`}>Back to homepage</Link></div>
                </div>
        </div>
    )
}

export default AppArticlePage;
