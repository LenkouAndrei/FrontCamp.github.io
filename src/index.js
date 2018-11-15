const API_KEY = 'b7898b8ae1f042849321a38b58c68df0';

window.onload = function() {
    const url = `https://newsapi.org/v2/sources?apiKey=${API_KEY}`;
    const req = new Request(url);
    const textField = document.getElementById('output');

    fetch(req)
        .then(response => response.json())
        .then(answer => {
            const chanelsList = getChanelsList(answer.sources);
            const ul = transformToHTMLChanelsList(chanelsList);
            textField.appendChild(ul);
        });
};

function getChanelsList(newsSources) {
    return newsSources.map(source => source.id);
}

function transformToHTMLChanelsList(chanels) {
    const ul = document.createElement('ul');
    chanels.forEach(chanel => {
        const li = document.createElement('li');
        li.innerHTML = chanel;
        ul.appendChild(li);
    });
    return ul;
}
