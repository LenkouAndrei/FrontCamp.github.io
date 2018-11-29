export const API_KEY = 'b7898b8ae1f042849321a38b58c68df0';
export function formRequest(apiKey, channelName = '') {
    const url = `https://newsapi.org/v1/${
        channelName === '' ? 'sources' : 'articles'
        }?${channelName === '' ? '' : `source=${channelName}`}&apiKey=${apiKey}`
    return new Request(url)
}