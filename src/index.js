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

  document.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      import('./errorHandler/errorHandler').then(module => {
        const handler = module.ErrorHandler
        const singletonHandler = handler.getInstance()
        singletonHandler.createMarkup()
      })
    }
  })

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
      navigation.innerElementsList.forEach(button => {
        const buttonHTML = button.element
        buttonHTML.addEventListener('click', () => {
          navigation.activeBtn.classList.remove('active')
          buttonHTML.classList.add('active')
          navigation.activeBtn = buttonHTML
          const freshNewsRequest = button.formNewsRequest()
          performRequest('GET', freshNewsRequest)
            .then(response => response.json())
            .then(jsonData => mainContainer.setInnerElemenst(jsonData))
        })
      })
    })
}
