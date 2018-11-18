const API_KEY = 'b7898b8ae1f042849321a38b58c68df0';
const pageSize = 10;
let selectedChanel;

window.onload = function() {
    document.getElementById('download-news-button').addEventListener('click', downloadNews);

    const request = formRequest(API_KEY);
    fetch(request)
        .then(response => response.json())
        .then(answer => {
            const channelsNamesList = getChannelsList(answer.sources);
            setChannelsNamesAsSelectOptions(channelsNamesList);
        });
};

function getChannelsList(newsSources) {
    return newsSources.map(source => source.id);
}

function setChannelsNamesAsSelectOptions(channelsNames) {
    const select = document.getElementById('channel-select');
    select.innerHTML = '';
    channelsNames.forEach(chanelName => {
        const option = document.createElement('option');
        option.innerHTML = chanelName;
        option.setAttribute('value', chanelName);
        select.appendChild(option);
    });
    select.removeAttribute('disabled');
    return select;
}

function downloadNews() {
    applySelectedChannel();
    const request = formRequest(API_KEY, selectedChanel);
    fetch(request)
        .then(response => response.json())
        .then(answer => renderNews(answer.articles));
}

function applySelectedChannel() {
    const select = document.getElementById('channel-select');
    selectedChanel = [...select.options].filter(option => option.selected)[0].value;
}

function formRequest(apiKey, channelName='') {
    const url = `https://newsapi.org/v2/${channelName === '' ? 'sources' : 'everything'}?${channelName === '' ? '' : `sources="${channelName}"&pageSize=${pageSize}`}&apiKey=${apiKey}`;
    return new Request(url);
}

function renderNews(articlesNews) {
    console.log(articlesNews);
    const articleContainer = document.getElementById('output');
    let docFragment = document.createDocumentFragment();

    articlesNews.forEach(articleNews => {
        const articleHTML = document.createElement('article');
        const h2 = document.createElement('h2');
        const figure = document.createElement('figure');
        const img = (articleNews.urlToImage !== null) ? document.createElement('img') : null;
        const figcaption = document.createElement('figcaption');
        const footer = document.createElement('footer');
        const time = document.createElement('time');
        const spanAuthor = document.createElement('span');
        const spanSource = document.createElement('span');
        const div = document.createElement('div');
        const p = (articleNews.content !== null) ? document.createElement('p') : null;

        h2.innerHTML = articleNews.title;
        if (img !== null) {
            img.setAttribute('src', articleNews.urlToImage);
            img.setAttribute('width', 200);
        }
        figcaption.innerHTML = articleNews.description;
        time.innerHTML = formatTimeToReadable(articleNews.publishedAt);
        time.setAttribute('datetime', articleNews.publishedAt);
        spanAuthor.innerHTML = articleNews.author;
        spanSource.innerHTML = articleNews.source.name;
        if (p !== null) {
            p.innerHTML = articleNews.content;
        }

        div.appendChild(spanAuthor);
        div.appendChild(spanSource);
        footer.appendChild(time);
        footer.appendChild(div);
        articleHTML.appendChild(h2);
        if (img !== null) {
            figure.appendChild(img);
        }
        figure.appendChild(figcaption);
        articleHTML.appendChild(figure);
        if (p !== null) {
            articleHTML.appendChild(p);
        }
        articleHTML.appendChild(footer);

        docFragment.appendChild(articleHTML);
    });

    articleContainer.appendChild(docFragment);
}

function formatTimeToReadable(timeInternationalFormat) {
    return timeInternationalFormat.split('T').join(' ').split(0, timeInternationalFormat.lastIndexOf(':'));
}

function createArticle(articleNews) {
    const articleHTML = document.createElement('article');
    const h2 = document.createElement('h2');
    const figure = document.createElement('figure');
    const img = (articleNews.urlToImage !== null) ? document.createElement('img') : null;
    const figcaption = document.createElement('figcaption');
    const footer = document.createElement('footer');
    const time = document.createElement('time');
    const spanAuthor = document.createElement('span');
    const spanSource = document.createElement('span');
    const div = document.createElement('div');
    const p = (articleNews.content !== null) ? document.createElement('p') : null;

    h2.innerHTML = articleNews.title;
    if (img !== null) {
        img.setAttribute('src', articleNews.urlToImage);
    }
    figcaption.innerHTML = articleNews.description;
    time.innerHTML = formatTimeToReadable(articleNews.publishedAt);
    time.setAttribute('datetime', articleNews.publishedAt);
    spanAuthor.innerHTML = articleNews.author;
    spanSource.innerHTML = articleNews.source.name;
    if (p !== null) {
        p.innerHTML = articleNews.content;
    }

    div.appendChild(spanAuthor);
    div.appendChild(spanSource);
    footer.appendChild(time);
    footer.appendChild(div);
    articleHTML.appendChild(h2);
    if (img !== null) {
        figure.appendChild(img);
    }
    figure.appendChild(figcaption);
    articleHTML.appendChild(figure);
    if (p !== null) {
        articleHTML.appendChild(p);
    }
    articleHTML.appendChild(footer);

    return articleHTML;
}