import '../style/normalize.scss'
import '../style/style.scss'
import { controller } from './controller/controller'

window.onload = function() {
  controller.init()
}
