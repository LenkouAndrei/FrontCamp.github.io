import { performRequest } from '../utilities/utilities'

export class Data {
    constructor() {
        articlesArray: [];
        buttonsArray: [];
        currentChannel: '';
    }

    getButtonsArray() {
        performRequest('GET')
          .then(response => response.json())
          .then(jsonData => {
              this.buttonsArray = [...jsonData.sources.map(source => source.id)];
              this.currentChannel = this.buttonsArray[0];
          });
    }
}