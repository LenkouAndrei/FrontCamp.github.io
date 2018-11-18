const API_KEY = 'b7898b8ae1f042849321a38b58c68df0';
let selectedArticle;

window.onload = function() {
    const url = `https://newsapi.org/v2/sources?apiKey=${API_KEY}`;
    const req = new Request(url);
    document.getElementById('download-news-button').addEventListener('click', downloadNews);

    fetch(req)
        .then(response => response.json())
        .then(answer => {
            const channelsNamesList = getChannelsList(answer.sources);
            setChannelsNamesAsSelectOptions(channelsNamesList);
        });
};

function getChannelsList(newsSources) {
    return newsSources.map(source => source.id);
}

function setChannelsNamesAsSelectOptions(channelsNames) {
    const select = document.getElementById('channel-select');
    channelsNames.forEach(chanelName => {
        const option = document.createElement('option');
        option.innerHTML = chanelName;
        option.setAttribute('value', chanelName);
        select.appendChild(option);
    });
    select.removeAttribute('disabled');
    return select;
}

function downloadNews() {
    applySelectedChannel();
}

function applySelectedChannel() {
    const select = document.getElementById('channel-select');
    selectedArticle = [...select.options].filter(option => option.selected)[0].value;
}