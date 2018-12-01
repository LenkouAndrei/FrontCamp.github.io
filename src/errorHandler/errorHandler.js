export class ErrorHandler {
    constructor({status, name, message}) {
        this.status = status,
        this.name = name,
        this.message = message
    }

    createMarkup() {
        const divBackDrop = document.createElement('div');
        divBackDrop.classList.add('notification--backdrop');
        const divNotification = document.createElement('div');
        divNotification.classList.add('notification');
        divNotification.innerHTML = `<h3 class="notification--headline">Error Occures</h3>
                                    <ul class="notification--description description"></ul>`;
        const ulDescription = divNotification.querySelector('.description');

        Object.entries(this).forEach(([propName, propDescription]) => {
            const liItem = document.createElement('li');
            liItem.classList.add('description--item');
            liItem.innerHTML = `<span class="description--name">${propName}: </span>
                                <span class="description--info">${propDescription}</span>`;
            ulDescription.appendChild(liItem);
        });

        divBackDrop.appendChild(divNotification);
        document.body.appendChild(divBackDrop);

        this.setBodyOverflow();
    }

    setBodyOverflow() {
        document.body.style.overflow = 'hidden';
    }

    static getInstance() {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler({status: 404, name: 'Not Found', message: 'Bla-bla'});
        }
        return ErrorHandler.instance;
    }
};