import '../style/normalize.scss'
import '../style/style.scss'
import { ContainerElement } from './containerElement/containerElement.js'
import { API_KEY, formRequest } from './utilities/utilities'

window.onload = function() {
  const mainContainer = new ContainerElement(
    document.getElementById('output'),
    'field'
  )
  const navigation = new ContainerElement(
    document.getElementById('buttons'),
    'navigation'
  )

  document.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      console.log('load')
      import('./errorHandler/errorHandler').then(module => {
        const handler = module.ErrorHandler
        const singletonHandler = handler.getInstance()
        singletonHandler.createMarkup()
      })
    }
  })

  const request = formRequest(API_KEY)
  navigation
    .loadElements(request)
    .then(buttons => {
      const [firstButton, ...restButtons] = buttons.innerElementsList
      return firstButton
    })
    .then(firstBtn => {
      const requestForNews = firstBtn.formNewsRequest()
      mainContainer.loadElements(requestForNews)
      navigation.innerElementsList.forEach(button => {
        const buttonHTML = button.element
        buttonHTML.addEventListener('click', () => {
          navigation.activeBtn.classList.remove('active')
          buttonHTML.classList.add('active')
          navigation.activeBtn = buttonHTML
          const freshNewsRequest = button.formNewsRequest()
          mainContainer.loadElements(freshNewsRequest)
        })
      })
    })
}
