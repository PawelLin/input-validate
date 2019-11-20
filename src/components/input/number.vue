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
            type: Number,
            default: 9
        }
    },
    data () {
        return {
            val: this.value
        }
    },
    created () {
        this.regExp = new RegExp(`^(0|[1-9]\\d{0,${this.maxlength - 1}})$`)
    },
    methods: {
        _input (e) {
            this.selectionEnd = e.target.selectionEnd
            if (e.target.value && !this.regExp.test(e.target.value)) {
                e.target.value = this.val
                this.selectionEnd -= 1
            } else {
                this.val = e.target.value
            }
            if (!isMobile()) this.setSelection(e)
            this.$emit('input', this.val)
        },
        _keydown (e) {
            if (isMobile()) this.selectionEnd = e.target.selectionEnd
        },
        _keyup (e) {
            if (isMobile()) this.setSelection(e)
        },
        setSelection (e) {
            e.target.setSelectionRange(this.selectionEnd, this.selectionEnd)
        }
    }
}
</script>

