export class ErrorHandler {
    constructor({status, name, message}) {
        this.status = status,
        this.name = name,
        this.message = message,
    }

    static getInstance() {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }
};