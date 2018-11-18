const API_KEY = 'b7898b8ae1f042849321a38b58c68df0';
let selectedChanel;

window.onload = function() {
    document.getElementById('download-news-button').addEventListener('click', downloadNews);

    const request = formRequest(API_KEY);
    fetch(request)
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
    selectedChanel = [...select.options].filter(option => option.selected)[0].value;
}

function formRequest(apiKey, channelName='') {
    const url = `https://newsapi.org/v2/${channelName === '' ? 'sources' : 'everything'}?${channelName === '' ? '' : `sources=${channelName}`}apiKey=${apiKey}`;
    return new Request(url);
}