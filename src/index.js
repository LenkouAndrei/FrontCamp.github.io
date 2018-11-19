const API_KEY = 'b7898b8ae1f042849321a38b58c68df0';
const AMOUNT_OF_NEWS = 10;
const AMOUNT_OF_ELEMENTS_IN_ROW = 4;

class FieldWithText {
    constructor(text, tagName) {
        this.text = text;
        this.tagName = tagName;
    }

    renderText() {
        const elementHTML = document.createElement(this.tagName);
        elementHTML.innerHTML = this.text;
        return elementHTML;
    }
}

class FieldContainer extends FieldWithText {
    constructor(text, tagName, id) {
        super(text, tagName);
        this.id = id;
    }

    renderText() {
        const elementHTML = super.renderText();
        elementHTML.setAttribute('id', this.id);
        return elementHTML;
    }

    clear() {
        document.getElementById(this.id).innerHTML = '';
    }

    fillContent(elementHTMLWithContent) {
        document.getElementById(this.id).appendChild(elementHTMLWithContent);
    }

    clearFloatAfterNthElement(containerElement, currentElementNumber, amountOfElementsInRow) {
        if (currentElementNumber !== 0 && currentElementNumber % amountOfElementsInRow === (amountOfElementsInRow - 1)) {
            const divClear = document.createElement('div');
            divClear.setAttribute('class', 'clearfix');
            containerElement.appendChild(divClear);
        }
    }

    createFragment() {
        const fragment = document.createDocumentFragment();
        return fragment;
    }

    renderNews(articlesNews) {
        this.clear();
        let docFragment = this.createFragment();

        articlesNews.forEach((articleNews, articleIndex) => {
            const article = new Article(articleNews);
            const articleHTML = article.createArticleHTML();
            docFragment.appendChild(articleHTML);
            this.clearFloatAfterNthElement(docFragment, articleIndex, AMOUNT_OF_ELEMENTS_IN_ROW);
        });

        this.fillContent(docFragment);
    }
}

 class Article {
     constructor(options) {
        this.author = options.author || '';
        this.content = options.content || '';
        this.description = options.description || '';
        this.publishedAt = options.publishedAt || '';
        this.sourceName = options.sourceName || '';
        this.title = options.title || '';
        this.url = options.url || '';
        this.urlToImage = options.urlToImage || '';
        this.imgWidth = 230;
     }

     createArticleHTML() {
         const articleHTML = document.createElement('article');
         const link = document.createElement('a');
         const h2 = document.createElement('h2');
         const figure = document.createElement('figure');
         const img = document.createElement('img');
         const figcaption = document.createElement('figcaption');
         const footer = document.createElement('footer');
         const time = document.createElement('time');
         const spanAuthor = document.createElement('span');
         const spanSource = document.createElement('span');
         const spanReadMore = document.createElement('span');
         const div = document.createElement('div');
         const p = document.createElement('p');
         const content = this.content;

         h2.innerHTML = this.title;
         img.setAttribute('src', this.urlToImage);
         img.setAttribute('width', this.imgWidth);
         figcaption.innerHTML = this.description;
         time.innerHTML = this.formatTimeToReadable(this.publishedAt);
         time.setAttribute('datetime', this.publishedAt);
         spanAuthor.innerHTML = this.author;
         spanSource.innerHTML = this.sourceName;
         p.innerHTML = content.slice(0, content.lastIndexOf('['));
         spanReadMore.innerHTML = 'Read more...';
         spanReadMore.setAttribute('role', 'link');
         link.setAttribute('href', this.url);

         div.appendChild(spanAuthor);
         div.appendChild(spanSource);
         footer.appendChild(time);
         footer.appendChild(div);
         link.appendChild(h2);
         figure.appendChild(img);
         figure.appendChild(figcaption);
         link.appendChild(figure);
         link.appendChild(p);
         link.appendChild(spanReadMore);
         link.appendChild(footer);

         articleHTML.appendChild(link);
         return articleHTML;
     }

     formatTimeToReadable(timeInternationalFormat) {
         return timeInternationalFormat.split('T').join(' ').slice(0, timeInternationalFormat.lastIndexOf(':'));
     }
 }

 class Select {
    constructor(options) {
        this.defaultValue = options.defaultValue;
        this.channelsList = options.channelsList;
        this.disabled = options.disabled;
        this.id = options.id;
        this.selectedName = {};
    }

    set selectedValue(value) {
        this.selectedName.name = value;
    }

    get selectedValue() {
        return this.selectedName.name
    }

    changeChannelsList(newChannelsList) {
        this.channelsList = newChannelsList;
    }

     allowSelect() {
        const select = document.getElementById(this.id);
        this.disabled = false;
        select.disabled = this.disabled;
    }

    createSelect() {
        const selectHTML = document.createElement('select');
        const optionHTML = document.createElement('option');

        selectHTML.setAttribute('id', this.id);
        selectHTML.classList.add('page-header_selection');
        selectHTML.disabled = this.disabled;

        optionHTML.setAttribute('value', this.defaultValue);
        optionHTML.innerHTML = this.defaultValue;

        selectHTML.appendChild(optionHTML);

        return selectHTML;
    }

    loadOptions(request) {
        fetch(request)
            .then(response => response.json())
            .then(answer => {
                const channelsNamesList = this.transformResponseJSONToChannelsList(answer.sources);
                this.changeChannelsList(channelsNamesList);
                this.createOptions();
            });
    }

     transformResponseJSONToChannelsList(newsSources) {
         return newsSources.map(source => source.id);
     }

     createOptions() {
         this.clearSelect();
         const select = document.getElementById(this.id);
         const documentFragment = this.createFragment();
         this.channelsList.forEach(chanelName => {
             const option = this.createOption(chanelName);
             documentFragment.appendChild(option);
         });
         this.selectedValue = this.channelsList[0];
         select.appendChild(documentFragment);
         this.allowSelect();
     }

     createOption(optionValue) {
         const option = document.createElement('option');
         option.innerHTML = optionValue;
         option.setAttribute('value', optionValue);
         return option;
     }

     clearSelect() {
         const select = document.getElementById(this.id);
         select.innerHTML = '';
     }

     createFragment() {
         const fragment = document.createDocumentFragment();
         return fragment;
     }
 }

 class Button {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    createButton() {
        const button = document.createElement('button');
        button.setAttribute('id', this.id);
        button.classList.add('page-header_btn');
        button.innerHTML = this.name;
        return button;
    }

     downloadNews() {
         const newsAmount = inputElement.value;
         const request = formRequest(API_KEY, select.selectedValue, newsAmount);
         fetch(request)
             .then(response => response.json())
             .then(answer => mainContainer.renderNews(answer.articles));
     }

     getButton() {
        return document.getElementById(this.id);
     }
 }

 class Input {
    constructor(placeholder, id, value) {
        this.placeholder = placeholder;
        this.id = id;
        this.value = value;
    }

    createInput() {
        const inputHTML = document.createElement('input');
        inputHTML.placeholder = this.placeholder;
        inputHTML.classList.add('page-header_input');
        inputHTML.setAttribute('id', this.id);
        inputHTML.setAttribute('type', 'text');
        return inputHTML;
    }

     changeValue() {
        const inputHTML = this.getInput();
        this.value = parseInt(inputHTML.value) || this.value;
    }

    getInput() {
        return document.getElementById(this.id);
    }
 }

const small = new FieldWithText('© Copyright 2018, Front Camp Created', 'small');
const mainContainer = new FieldContainer('Articles will be here', 'div', 'output');
const select = new Select({
    defaultValue: 'Loading...',
    channelsList: [],
    disabled: true,
    id: 'channel-select',
});
const button = new Button('Show News', 'download-news-button');
const inputElement = new Input('enter number of news...', 'news-amount', AMOUNT_OF_NEWS);

window.onload = function() {
    document.getElementById('copyright').appendChild(small.renderText());
    document.getElementById('container').appendChild(mainContainer.renderText());
    document.getElementById('buttons-container').appendChild(button.createButton());
    document.getElementById('buttons-container').appendChild(inputElement.createInput());
    document.getElementById('buttons-container').appendChild(select.createSelect());

    inputElement.getInput().addEventListener('input', () => inputElement.changeValue());
    button.getButton().addEventListener('click', button.downloadNews);

    const request = formRequest(API_KEY);
    select.loadOptions(request);
};

function formRequest(apiKey, channelName='', newsAmount=AMOUNT_OF_NEWS) {
    const url = `https://newsapi.org/v2/${channelName === '' ? 'sources' : 'everything'}?${channelName === '' ? '' : `sources="${channelName}"&pageSize=${newsAmount}`}&apiKey=${apiKey}`;
    return new Request(url);
}
