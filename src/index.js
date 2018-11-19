const API_KEY = 'b7898b8ae1f042849321a38b58c68df0';
const AMOUNT_OF_NEWS = 10;
const AMOUNT_OF_ELEMENTS_IN_ROW = 4;
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
    const newsAmount = parseInt(document.getElementById('news-amount').value) || AMOUNT_OF_NEWS;
    const request = formRequest(API_KEY, selectedChanel, newsAmount);
    fetch(request)
        .then(response => response.json())
        .then(answer => renderNews(answer.articles));
}

function applySelectedChannel() {
    const select = document.getElementById('channel-select');
    selectedChanel = [...select.options].filter(option => option.selected)[0].value;
}

function formRequest(apiKey, channelName='', newsAmount=AMOUNT_OF_NEWS) {
    const url = `https://newsapi.org/v2/${channelName === '' ? 'sources' : 'everything'}?${channelName === '' ? '' : `sources="${channelName}"&pageSize=${newsAmount}`}&apiKey=${apiKey}`;
    return new Request(url);
}

function renderNews(articlesNews) {
    const articleContainer = document.getElementById('output');
    articleContainer.innerHTML = '';
    let docFragment = document.createDocumentFragment();

    articlesNews.forEach((articleNews, articleIndex) => {
        const articleHTML = document.createElement('article');
        const link = document.createElement('a');
        const h2 = document.createElement('h2');
        const figure = document.createElement('figure');
        const img = (articleNews.urlToImage !== null) ? document.createElement('img') : null;
        const figcaption = document.createElement('figcaption');
        const footer = document.createElement('footer');
        const time = document.createElement('time');
        const spanAuthor = document.createElement('span');
        const spanSource = document.createElement('span');
        const spanReadMore = document.createElement('span');
        const div = document.createElement('div');
        const p = (articleNews.content !== null) ? document.createElement('p') : null;

        h2.innerHTML = articleNews.title;
        if (img !== null) {
            img.setAttribute('src', articleNews.urlToImage);
            img.setAttribute('width', 230);
        }
        figcaption.innerHTML = articleNews.description;
        time.innerHTML = formatTimeToReadable(articleNews.publishedAt);
        time.setAttribute('datetime', articleNews.publishedAt);
        spanAuthor.innerHTML = articleNews.author;
        spanSource.innerHTML = articleNews.source.name;
        if (p !== null) {
            const content = articleNews.content;
            p.innerHTML = content.slice(0, content.lastIndexOf('['));
        }
        spanReadMore.innerHTML = 'Read more...';
        spanReadMore.setAttribute('role', 'link');
        link.setAttribute('href', articleNews.url);

        div.appendChild(spanAuthor);
        div.appendChild(spanSource);
        footer.appendChild(time);
        footer.appendChild(div);
        link.appendChild(h2);
        if (img !== null) {
            figure.appendChild(img);
        }
        figure.appendChild(figcaption);
        link.appendChild(figure);
        if (p !== null) {
            link.appendChild(p);
        }
        link.appendChild(spanReadMore);
        link.appendChild(footer);

        articleHTML.appendChild(link);
        docFragment.appendChild(articleHTML);
        clearFloatAfterNthElement(docFragment, articleIndex, AMOUNT_OF_ELEMENTS_IN_ROW);
    });

    articleContainer.appendChild(docFragment);
}

function formatTimeToReadable(timeInternationalFormat) {
    return timeInternationalFormat.split('T').join(' ').slice(0, timeInternationalFormat.lastIndexOf(':'));
}

function clearFloatAfterNthElement(containerElement, currentElementNumber, amountOfElementsInRow) {
    if (currentElementNumber !== 0 && currentElementNumber % amountOfElementsInRow === (amountOfElementsInRow - 1)) {
        const divClear = document.createElement('div');
        divClear.setAttribute('class', 'clearfix');
        containerElement.appendChild(divClear);
    }
}
