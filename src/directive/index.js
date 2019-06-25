import directive from './directives'

const importDirective = Vue => {
    Vue.directive('number', directive.number)
}

export default importDirective
