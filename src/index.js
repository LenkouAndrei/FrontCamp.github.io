import '../style/normalize.scss'
import '../style/style.scss'
import { Data } from './model/model'

window.onload = function() {
  const data = new Data()
  data.getButtonsArray()
}
