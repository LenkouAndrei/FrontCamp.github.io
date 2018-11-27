import {CommonElement} from "../commonElement/commonElement";
import {Button} from "../button/button";
import {Article} from "../article/article";

const nameToClass = {
    navigation: Button,
    field: Article,
}

export class ContainerElement extends CommonElement {
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
        return this.height
    }

    set elementHeight(height) {
        this.height = height
    }

    get activeBtn() {
        return this.activeButton
    }

    set activeBtn(element) {
        this.activeButton = element
    }

    async loadElements(request) {
        const innerListsObject = await fetch(request)
            .then(response => response.json())
            .then(answer => {
                this.innerElementsResponseList =
                    answer.articles ||
                    this.transformResponseJSONToInnerElementsList(answer.sources)
                this.createInnerElements()
                return {
                    innerElementsResponseList: this.innerElementsResponseList,
                    innerHTMLElementsList: this.innerHTMLElementsList,
                    innerElementsList: this.innerElementsList,
                }
            })
        return innerListsObject;
    }

    transformResponseJSONToInnerElementsList(innerElements) {
        return innerElements.map(source => source.id)
    }

    createInnerElements() {
        this.clearElement()
        const documentFragment = this.createFragment()

        let innerElementWithRange = {
            from: 0,
            to: this.innerElementsResponseList.length,
            createInnerElement: this.createInnerElement,
            innerElementsList: this.innerElementsResponseList,
            context: this,
            [Symbol.iterator]() {
                let current = this.from
                let last = this.to
                let createInnerElement = this.createInnerElement
                let innerElementsList = this.innerElementsList
                let context = this.context

                return {
                    next() {
                        if (current < last) {
                            const active = current === 0
                            const value = innerElementsList[current++]
                            return {
                                done: false,
                                value: createInnerElement.call(context, { value, active }),
                            }
                        } else {
                            return {
                                done: true,
                            }
                        }
                    },
                }
            },
        }

        for (let innerElement of innerElementWithRange) {
            this.innerHTMLElementsList.push(innerElement)
            documentFragment.appendChild(innerElement)
        }

        this.addChild(documentFragment)
    }

    createInnerElement({ value, active }) {
        const classOptions = value.title
            ? value
            : {
                text: value,
                classes: ['navigation_btn'],
            }
        if (active && !value.title) {
            classOptions.classes.push('active')
        }
        const innerElement = new nameToClass[this.name](classOptions)
        innerElement.formHTMLElement()
        this.innerElementsList.push(innerElement)
        if (active && !value.title) {
            this.activeBtn = innerElement.element
        }
        return innerElement.element
    }

    createFragment() {
        const fragment = document.createDocumentFragment()
        return fragment
    }
}