import { on } from '../libs/tools'

const directives = {
    number: {
        inserted: (el, binding, vnode) => {
            let input = el.tagName.toUpperCase() === 'INPUT' ? el : null
            if (!input) {
                for (let i of el.children) {
                    if (i.tagName.toUpperCase() === 'INPUT') input = i
                }
            }
            if (input) {
                let regExp = new RegExp(`^(0|[1-9]\\d*)$`)
                let value = input.value || ''
                const handleInput = e => {
                    let len = e.target.value.length
                    if (!value && len > 1) value = e.target.value.substring(0, len - 1)
                    if (e.target.value && !(regExp.test(e.target.value))) {
                        e.target.value = value
                    } else {
                        value = e.target.value
                    }
                }
                const handleKeydown = e => {
                    value = e.target.value
                }
                on(input, 'input', handleInput)
                on(input, 'change', handleInput)
                on(input, 'keydown', handleKeydown)
            }
        }
    },
    iviewNumber: {
        inserted: (el, binding, vnode) => {
            let input = el.tagName.toUpperCase() === 'INPUT' ? el : null
            if (!input) {
                for (let i of el.children) {
                    if (i.tagName.toUpperCase() === 'INPUT') input = i
                }
            }
            if (input) {
                let regExp = new RegExp(`^(0|[1-9]\\d*)$`)
                let value = input.value || ''
                const handleInput = e => {
                    if (e.target.value && !(regExp.test(e.target.value))) {
                        e.target.value = value
                    } else {
                        value = e.target.value
                    }
                }
                const handleKeydown = e => {
                    value = e.target.value
                }
                on(input, 'input', handleInput)
                on(input, 'keydown', handleKeydown)
            }
        }
    }
}

export default directives
