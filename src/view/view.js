const INPUT = 'INPUT';

export const view = {
    navigation: null,
    divContainer: '',
    init: () => {
        this.navigation = document.getElementById('buttons');
        this.divContainer = document.getElementById('output');

        this.navigation.addEventListener('click', event => {
            if (event.target.tagName === INPUT) {
                controller.changeNews(event.target.value);
            }
        });

        this.render();
    },

    renderArticls: () => {
        this.divContainer.innerHTML = '';

        const fragment = document.createDocumentFragment();

        controller.getArticls().forEach(article => {
            const articleHTML = document.createElement('article');
            articleHTML.innerHTML = `<a class="news_link" href="${article.url}">
											<div class="news_image-wrapper">
												<div class="news_image"></div>
												<time class="news_pub-time" pubdate="${article.publishedAt}">${this.formatTimeToReadable(article.publishedAt)}</time>
											</div>
											<h2  class="news_headline">${article.title}</h2>
										</a>`;
            fragment.appendChild(articleHTML);
        })

        this.divContainer.appendChild(fragment);
    },

    renderButtons: () => {
        this.navigation.innerHTML = '';

        const fragment = document.createDocumentFragment();

        controller.getButtons().forEach(btnText => {
            const buttonHTML = document.createElement('input');
            buttonHTML.setAttribute('type', 'submit');
            buttonHTML.value = btnText;
            fragment.appendChild(buttonHTML);
        })

        this.divContainer.appendChild(fragment);
    },

    render: () => {
        this.renderArticls();
        this.renderButtons();
    }
}