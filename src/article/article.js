import {CommonElement} from "../commonElement/commonElement";

export class Article extends CommonElement {
    constructor(options) {
        super('article')
        this.publishedAt = options.publishedAt || ''
        this.title = options.title || ''
        this.urlToImage = options.urlToImage || './img/eye.jpg'
        this.url = options.url || ''
        this.imgWidth = 230
    }

    formHTMLElement() {
        this.htmlElement.innerHTML = `<a class="news_link" href="${this.url}">
											<div class="news_image-wrapper">
												<div class="news_image"></div>
												<time class="news_pub-time" pubdate="${
            this.publishedAt
            }">${this.formatTimeToReadable(this.publishedAt)}</time>
											</div>
											<h2  class="news_headline">${this.title}</h2>
										</a>`
        this.htmlElement.classList.add('news')
        const el = this.htmlElement.querySelector('.news_image')
        el.style.backgroundImage = `url(\'${this.urlToImage}\')`
    }

    formatTimeToReadable(timeInternationalFormat) {
        const [date, timeWithSeconds] = timeInternationalFormat.split('T')
        return timeWithSeconds
            ? timeWithSeconds.slice(0, timeWithSeconds.lastIndexOf(':'))
            : ''
    }
}