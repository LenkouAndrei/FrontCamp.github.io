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
        this.htmlElement.setAttribute('value', this.text)
        this.htmlElement.setAttribute('type', 'submit')
        this.classList.forEach(elementClass =>
            this.htmlElement.classList.add(elementClass)
        )
    }

    formNewsRequest() {
        return formRequest(API_KEY, this.text)
    }
}