const requestMethods = {
    'GET': async function({url, ...rest}) {
        return await fetch(url, {method: 'GET'});
    },
    'POST': async function({url, requestBody}) {
        const formData = new FormData();
        formData.append('first_name', requestBody.firstName);
        formData.append('last_name', requestBody.lastName);
        formData.append('email', requestBody.email);
        return await fetch(url, {method: 'POST', body: formData});
    },
    'PUT': async function({url, requestBody}) {
        const formData = new FormData();
        formData.append('first_name', requestBody.firstName);
        formData.append('last_name', requestBody.lastName);
        formData.append('email', requestBody.email);
        return await fetch(url, {method: 'PUT', body: formData});
    },
    'DELETE': async function({url, ...rest}) {
        return await fetch(url, {method: 'GET'})
    }
}

const API_KEY = 'b7898b8ae1f042849321a38b58c68df0';
export function performRequest(method, channelNameOrRequestBody = '') {
    const url = `https://newsapi.org/v1/${
        channelNameOrRequestBody === '' ? 'sources' : 'articles'
        }?${channelNameOrRequestBody === '' ? '' : `source=${channelNameOrRequestBody}`}&apiKey=${API_KEY}`
    let proxy = new Proxy(requestMethods[method], {
        apply: function(target, thisArg, argumentsList) {
            console.log(`запрос пойдёт по адресу: ${argumentsList[0].url}`);
            console.log(`тело запроса: ${argumentsList[0].requestBody}`);
            console.log(`метод: ${method}`);
            return target.apply(thisArg, argumentsList);
        }
    });
    return proxy({
        url,
        requestBody: channelNameOrRequestBody
    });
}