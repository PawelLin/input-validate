import { on } from '../libs/tools'

const directives = {
    number: {
        bind: (el, binding, vnode) => {
            let input = el.tagName.toUpperCase() === 'INPUT' ? el : null
            if (!input) {
                for (let i of el.children) {
                    if (i.tagName.toUpperCase() === 'INPUT') input = i
                }
            }
            if (input) {
                let regExp = new RegExp(`^(0|[1-9]\\d*)$`)
                let value = ''
                const handleInput = e => {
                    if (e.target.value && !(regExp.test(e.target.value))) {
                        e.target.value = value
                    } else {
                        value = e.target.value
                    }
                }
                on(input, 'input', handleInput)
                on(input, 'change', handleInput)
            }
        }
    }
}

export default directives
