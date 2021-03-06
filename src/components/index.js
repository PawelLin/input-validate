import inputNumber from './input/number.vue'
import inputMoney from './input/money.vue'
import inputFormat from './input/format.vue'
import inputThousand from './input/thousand.vue'
import inputTextarea from './input/textarea.vue'

const importComponent = Vue => {
    Vue.component(inputNumber.name, inputNumber)
    Vue.component(inputMoney.name, inputMoney)
    Vue.component(inputFormat.name, inputFormat)
    Vue.component(inputThousand.name, inputThousand)
    Vue.component(inputTextarea.name, inputTextarea)
}

export default importComponent
