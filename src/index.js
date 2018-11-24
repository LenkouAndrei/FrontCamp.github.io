window.onload = function() {
	const API_KEY = 'b7898b8ae1f042849321a38b58c68df0';

	class CommonElement {
		constructor(htmlElementOrTagName) {
			this.htmlElement =
				typeof htmlElementOrTagName === 'string'
					? document.createElement(htmlElementOrTagName)
					: htmlElementOrTagName;
		}

		get element() {
			return this.htmlElement;
		}

		set element(newHTMLElement) {
			this.htmlElement = newHTMLElement;
		}

		addChild(childElement) {
			this.htmlElement.appendChild(childElement);
		}

		clearElement() {
			this.htmlElement.innerHTML = '';
		}
	}

	class Button extends CommonElement {
		constructor({ text, ...classesOptions }) {
			super('input');
			this.text = text;
			this.classList = classesOptions.classes;
			this.active = classesOptions.active;
		}

		clearElement() {
			super.clearElement();
			this.htmlElement.classList.remove(this.classList);
		}

		formHTMLElement() {
			this.htmlElement.setAttribute('value', this.text);
			this.htmlElement.setAttribute('type', 'submit');
			this.classList.forEach(elementClass =>
				this.htmlElement.classList.add(elementClass)
			);
		}

		formNewsRequest() {
			return formRequest(API_KEY, this.text);
		}
	}

	class Article extends CommonElement {
		constructor(options) {
			super('article');
			this.publishedAt = options.publishedAt || '';
			this.title = options.title || '';
			this.urlToImage = options.urlToImage || './img/eye.jpg';
			this.url = options.url || '';
			this.imgWidth = 230;
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
										</a>`;
			this.htmlElement.classList.add('news');
			const el = this.htmlElement.querySelector('.news_image');
			el.style.backgroundImage = `url(\'${this.urlToImage}\')`;
		}

		formatTimeToReadable(timeInternationalFormat) {
			const [date, timeWithSeconds] = timeInternationalFormat.split('T');
			return timeWithSeconds
				? timeWithSeconds.slice(0, timeWithSeconds.lastIndexOf(':'))
				: '';
		}
	}

	const nameToClass = {
		navigation: Button,
		field: Article,
	};

	class ElementContainer extends CommonElement {
		constructor(htmlElement, name) {
			super(htmlElement);
			this.innerElementsResponseList = [];
			this.innerHTMLElementsList = [];
			this.innerElementsList = [];
			this.name = name;
			this.activeButton;
			this.height = '';
		}

		get elementHeght() {
			return this.height;
		}

		set elementHeight(height) {
			this.height = height;
		}

		get activeBtn() {
			return this.activeButton;
		}

		set activeBtn(element) {
			this.activeButton = element;
		}

		calculateHeight() {
			return this.htmlElement.getBoundingClientRect().height;
		}

		applyHeightToHTMLElement() {
			this.htmlElement.style.height = `${this.height}px`;
		}

		loadElements(request) {
			return fetch(request)
				.then(response => response.json())
				.then(answer => {
					this.innerElementsResponseList =
						answer.articles ||
						this.transformResponseJSONToInnerElementsList(answer.sources);
					this.createInnerElements();
					return {
						innerElementsResponseList: this.innerElementsResponseList,
						innerHTMLElementsList: this.innerHTMLElementsList,
						innerElementsList: this.innerElementsList,
					};
				});
		}

		transformResponseJSONToInnerElementsList(innerElements) {
			return innerElements.map(source => source.id);
		}

		createInnerElements() {
			this.clearElement();
			const documentFragment = this.createFragment();

			let innerElementWithRange = {
				from: 0,
				to: this.innerElementsResponseList.length,
				createInnerElement: this.createInnerElement,
				innerElementsList: this.innerElementsResponseList,
				context: this,
				[Symbol.iterator]() {
					let current = this.from;
					let last = this.to;
					let createInnerElement = this.createInnerElement;
					let innerElementsList = this.innerElementsList;
					let context = this.context;

					return {
						next() {
							if (current < last) {
								const active = current === 0;
								const value = innerElementsList[current++];
								return {
									done: false,
									value: createInnerElement.call(context, { value, active }),
								};
							} else {
								return {
									done: true,
								};
							}
						},
					};
				},
			};

			for (let innerElement of innerElementWithRange) {
				this.innerHTMLElementsList.push(innerElement);
				documentFragment.appendChild(innerElement);
			}

			this.addChild(documentFragment);
		}

		createInnerElement({ value, active }) {
			const classOptions = value.title
				? value
				: {
						text: value,
						classes: ['navigation_btn'],
				  };
			if (active && !value.title) {
				classOptions.classes.push('active');
			}
			const innerElement = new nameToClass[this.name](classOptions);
			innerElement.formHTMLElement();
			this.innerElementsList.push(innerElement);
			if (active && !value.title) {
				this.activeBtn = innerElement.element;
			}
			return innerElement.element;
		}

		createFragment() {
			const fragment = document.createDocumentFragment();
			return fragment;
		}
	}

	const mainContainer = new ElementContainer(
		document.getElementById('output'),
		'field'
	);
	const navigation = new ElementContainer(
		document.getElementById('buttons'),
		'navigation'
	);

	const request = formRequest(API_KEY);
	navigation
		.loadElements(request)
		.then(buttons => {
			const [firstButton, ...restButtons] = buttons.innerElementsList;
			return firstButton;
		})
		.then(firstBtn => {
			const requestForNews = firstBtn.formNewsRequest();
			return mainContainer.loadElements(requestForNews);
		})
		.then(() => {
			const mainContainerHeight = Math.ceil(mainContainer.calculateHeight());
			navigation.elementHeight = mainContainerHeight;
			navigation.applyHeightToHTMLElement();
			navigation.innerElementsList.forEach(button => {
				const buttonHTML = button.element;
				buttonHTML.addEventListener('click', () => {
					navigation.activeBtn.classList.remove('active');
					buttonHTML.classList.add('active');
					navigation.activeBtn = buttonHTML;
					const freshNewsRequest = button.formNewsRequest();
					mainContainer.loadElements(freshNewsRequest);
				});
			});
		});

	function formRequest(apiKey, channelName = '') {
		const url = `https://newsapi.org/v1/${
			channelName === '' ? 'sources' : 'articles'
		}?${channelName === '' ? '' : `source=${channelName}`}&apiKey=${apiKey}`;
		return new Request(url);
	}
};
