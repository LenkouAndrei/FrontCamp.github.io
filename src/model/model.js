import { performRequest } from '../utilities/utilities'

export const data = {
    articlesArray: [],
    buttonsArray: [],
    currentChannel: '',
    getButtonsArray: function() {
        return performRequest('GET')
          .then(response => response.json())
          .then(jsonData => {
              this.buttonsArray = [...jsonData.sources.map(source => source.id)];
              return this.buttonsArray[0];
          })
          .catch(error => {
            import('../errorHandler/errorHandler').then(module => {
                const singletonHandler = module.ErrorHandler.getInstance()
                singletonHandler.error = error
                singletonHandler.createMarkup()
            });
          });
    },
    changeCurrentChannel: function(source) {
        this.currentChannel = source;
    },
    getArticlesArray: function() {
        console.log(this.currentChannel);
        return performRequest('GET', this.currentChannel)
            .then(response => response.json())
            .then(jsonData => this.articlesArray = jsonData.articles)
            .catch(error => {
                import('../errorHandler/errorHandler').then(module => {
                    const singletonHandler = module.ErrorHandler.getInstance()
                    singletonHandler.error = error
                    singletonHandler.createMarkup()
                });
            });
    }
}