import directive from './directives'

const importDirective = Vue => {
    Vue.directive('number', directive.number)
    Vue.directive('test', directive.test)
}

export default importDirective
