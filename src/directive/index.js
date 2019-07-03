import directive from './directives'

const importDirective = Vue => {
    Vue.directive('number', directive.number)
    Vue.directive('iview-number', directive.iviewNumber)
}

export default importDirective
