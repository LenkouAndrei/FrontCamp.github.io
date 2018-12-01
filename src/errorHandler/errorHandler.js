export class ErrorHandler {
    constructor() {
        this.errorStore = [
            {
                status: 400,
                name: 'Bad Request',
                message: `The server cannot or will not process the request due to an apparent client error 
                      (e.g., malformed request syntax, size too large, invalid request message framing,
                      or deceptive request routing).`,
            },
            {
                status: 401,
                name: 'Unauthorized',
                message: `The response must include a WWW-Authenticate header field containing a challenge
                          applicable to the requested resource.`,
            },
            {
                status: 404,
                name: 'Not Found',
                message: `The requested resource could not be found but may be available in the future. Subsequent
                          requests by the client are permissible.`,
            },
            {
                status: 408,
                name: 'Request Timeout',
                message: `The server timed out waiting for the request. According to HTTP specifications: "The
                          client did not produce a request within the time that the server was prepared to wait.
                          The client MAY repeat the request without modifications at any later time."`,
            },
            {
                status: 413,
                name: 'Payload Too Large',
                message: `The request is larger than the server is willing or able to process. Previously called
                          "Request Entity Too Large".`,
            }
        ]
    }


    createMarkup(status) {
        const error = this.errorStore.filter(error => error.status === status)[0] || {status: 'unknown', name: 'unknownError', message: 'something went wrong'};
        const divBackDrop = document.createElement('div');
        divBackDrop.classList.add('notification--backdrop');
        const divNotification = document.createElement('div');
        divNotification.classList.add('notification');
        divNotification.innerHTML = `<h3 class="notification--headline">Error Occures</h3>
                                    <ul class="notification--description description"></ul>`;
        const ulDescription = divNotification.querySelector('.description');

        Object.entries(error).forEach(([propName, propDescription]) => {
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
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }
};