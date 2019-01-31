const url = require('url');

const fullUrl = req => {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl,
    });
};

const handleError = (text, next) => {
    const err = new Error(text);
    err.status = 404;
    next(err);
};

exports.fullUrl = fullUrl;
exports.handleError = handleError;