<template>
    <input :value="value" type="tel" @input="_input" @keyup="_keyup" @keydown="_keydown" :placeholder="placeholder" :maxlength="maxlength">
</template>

<script>
import { isMobile } from '../../libs/utils'

export default {
    name: 'input-number',
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入'
        },
        maxlength: {
            type: [String, Number],
            default: '9'
        }
    },
    data () {
        return {
            val: this.value
        }
    },
    created () {
        this.regExp = new RegExp(`^(0|[1-9]\\d*)$`)
    },
    methods: {
        _input (e) {
            if (e.target.value && !this.regExp.test(e.target.value)) {
                e.target.value = this.val
            } else {
                this.val = e.target.value
            }
            this.selectionEnd = e.target.selectionEnd
            this.$emit('input', this.val)
        },
        _keydown (e) {
            this.selectionEnd = e.target.selectionEnd
        },
        _keyup (e) {
            if (isMobile()) e.target.setSelectionRange(this.selectionEnd, this.selectionEnd)
        }
    }
}
</script>

