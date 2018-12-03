import '../style/normalize.scss'
import '../style/style.scss'
import { ContainerElement } from './containerElement/containerElement.js'
import { performRequest } from './utilities/utilities'

window.onload = function() {
  const mainContainer = new ContainerElement(
    document.getElementById('output'),
    'field'
  )
  const navigation = new ContainerElement(
    document.getElementById('buttons'),
    'navigation'
  )

  performRequest('GET')
    .then(response => response.json())
    .then(jsonData => navigation.setInnerElemenst(jsonData))
    .then(buttons => {
      const [firstButton, ...restButtons] = buttons.innerElementsList
      return firstButton
    })
    .then(firstBtn => {
      firstBtn
        .formNewsRequest()
        .then(response => response.json())
        .then(jsonData => mainContainer.setInnerElemenst(jsonData))
        .catch(error => {
          import('./errorHandler/errorHandler').then(module => {
            const singletonHandler = module.ErrorHandler.getInstance()
            singletonHandler.error = error
            singletonHandler.createMarkup()
          })
        })
      navigation.innerElementsList.forEach(button => {
        const buttonHTML = button.element
        buttonHTML.addEventListener('click', () => {
          navigation.activeBtn.classList.remove('active')
          buttonHTML.classList.add('active')
          navigation.activeBtn = buttonHTML
          button
            .formNewsRequest()
            .then(response => response.json())
            .then(
              jsonData => mainContainer.setInnerElemenst(jsonData) || jsonData
            )
            .catch(error => {
              import('./errorHandler/errorHandler').then(module => {
                const singletonHandler = module.ErrorHandler.getInstance()
                singletonHandler.error = error
                singletonHandler.createMarkup()
              })
            })
        })
      })
    })
    .catch(error => {
      import('./errorHandler/errorHandler').then(module => {
        const singletonHandler = module.ErrorHandler.getInstance()
        singletonHandler.error = error
        singletonHandler.createMarkup()
      })
    })
}
