import {controller} from "../controller/controller";

const INPUT = 'INPUT';
const URL_TO_DEFAULT_IMAGE = '../../img/eye.jpg';

export const view = {
    navigation: null,
    divContainer: null,
    init: function() {
        this.navigation = document.getElementById('buttons');
        this.divContainer = document.getElementById('output');

        this.navigation.addEventListener('click', event => {
            if (event.target.tagName === INPUT) {
                controller.changeNews(event.target.value);
            }
        });

        this.render();
    },
    renderArticles: function() {
        this.divContainer.innerHTML = '';

        const fragment = document.createDocumentFragment();

        controller.getArticles().forEach(article => {
            const articleHTML = document.createElement('article');
            articleHTML.innerHTML = `<a class="news_link" href="${article.url}">
											<div class="news_image-wrapper">
												<div class="news_image" style="background-image: url('${article.urlToImage || URL_TO_DEFAULT_IMAGE}')"></div>
												<time class="news_pub-time" pubdate="${article.publishedAt}">${this.formatTimeToReadable(article.publishedAt)}</time>
											</div>
											<h2  class="news_headline">${article.title}</h2>
										</a>`;
            fragment.appendChild(articleHTML);
        })

        this.divContainer.appendChild(fragment);
    },
    renderButtons: function() {
        this.navigation.innerHTML = '';

        const fragment = document.createDocumentFragment();

        controller.getButtons().forEach(btnText => {
            const buttonHTML = document.createElement('input');
            buttonHTML.setAttribute('type', 'submit');
            buttonHTML.value = btnText;
            fragment.appendChild(buttonHTML);
        });

        this.navigation.appendChild(fragment);
    },
    render: function() {
        this.renderArticles();
        this.renderButtons();
    },
    formatTimeToReadable: function(timeInternationalFormat) {
        const [date, timeWithSeconds] = timeInternationalFormat ? timeInternationalFormat.split('T') : ['', ''];
        return timeWithSeconds
            ? timeWithSeconds.slice(0, timeWithSeconds.lastIndexOf(':'))
            : ''
    }
}