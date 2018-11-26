import '../style/normalize.css'
import '../style/style.css'
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

  const request = formRequest(API_KEY)
  navigation
    .loadElements(request)
    .then(buttons => {
      const [firstButton, ...restButtons] = buttons.innerElementsList
      return firstButton
    })
    .then(firstBtn => {
      const requestForNews = firstBtn.formNewsRequest()
      return mainContainer.loadElements(requestForNews)
    })
    .then(() => {
      const mainContainerHeight = Math.ceil(mainContainer.calculateHeight())
      navigation.elementHeight = mainContainerHeight
      navigation.applyHeightToHTMLElement()
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
