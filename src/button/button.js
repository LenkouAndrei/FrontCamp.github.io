import {CommonElement} from "../commonElement/commonElement";
import {API_KEY, formRequest} from "../utilities/utilities";

export   class Button extends CommonElement {
    constructor({ text, ...classesOptions }) {
        super('input')
        this.text = text
        this.classList = classesOptions.classes
        this.active = classesOptions.active
    }

    clearElement() {
        super.clearElement()
        this.htmlElement.classList.remove(this.classList)
    }

    formHTMLElement() {
        this.htmlElement.setAttribute('type', 'submit')
        this.classList.forEach(elementClass =>
            this.htmlElement.classList.add(elementClass)
        )
        const emptySubstringLength = Math.floor((20 - this.text) / 2);
        const newText = (this.text.length < 20) ?
            `${this.text.padStart(emptySubstringLength).padEnd(emptySubstringLength)}` : this.text;
        this.htmlElement.value = newText
    }

    formNewsRequest() {
        return formRequest(API_KEY, this.text)
    }
}