class NewsService {
    _apiBase = 'https://api.spaceflightnewsapi.net/v3/articles';
    articles_limit = 100;

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllArticles = async () => {
        const res = await this.getResource(`${this._apiBase}?_limit=${this.articles_limit}`)
        return res.map(this._transformArticle);
    }

    getArticle = async (id) => {
        const res = await this.getResource(`${this._apiBase}/${id}`)
        return this._transformArticle(res);
    }

    _transformArticle = (article) => {
            let date = new Date(article.publishedAt),
            transformed_date = this.transformDate(date)
            return {
                id: article.id,
                date: transformed_date,
                title: article.title,
                description: article.summary,
                thumbnail: article.imageUrl
        }
    }

    transformDate = (date) => {
        let months = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
          ],
        month = months[date.getMonth()],
        day = date.getDate(),
        year = date.getFullYear(),
        ending = '';
        
        switch (day % 10) {
            case 1: 
                ending = 'st';
                break;
            case 2: 
                ending = 'nd';
                break
            case 3: 
                ending = 'rd';
                break
            default: ending = 'th';
        }
        return `${month} ${day}${ending}, ${year}`
    }
}

export default NewsService;