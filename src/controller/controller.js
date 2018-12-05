import {view} from "../view/view";
import {data} from "../model/model";

export const controller = {
    changeNews: function(newsSource) {
        data.changeCurrentChannel(newsSource);
        data.getArticlesArray()
            .then(() => view.renderArticles());
    },
    getArticles: function() {
        return data.articlesArray;
    },
    getButtons: function() {
        return data.buttonsArray;
    },
    init: async function() {
        const channelName = await data.getButtonsArray();
        data.changeCurrentChannel(channelName);
        data.getArticlesArray()
            .then(() => view.init());
    }
}