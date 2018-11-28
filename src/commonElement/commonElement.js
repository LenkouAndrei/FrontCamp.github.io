export class CommonElement {
    constructor(htmlElementOrTagName) {
        this.htmlElement =
            typeof htmlElementOrTagName === 'string'
                ? document.createElement(htmlElementOrTagName)
                : htmlElementOrTagName
    }

    get element() {
        return this.htmlElement
    }

    set element(newHTMLElement) {
        this.htmlElement = newHTMLElement
    }

    addChild(childElement) {
        this.htmlElement.appendChild(childElement)
    }

    clearElement() {
        this.htmlElement.innerHTML = ''
    }
}