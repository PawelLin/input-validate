<template>
    <input ref="input" :type="format.type" @input="_input" @keyup="_keyup" @keydown="_keydown" :placeholder="placeholder" :maxlength="format.fmaxlength">
</template>

<script>
import format from './format'
import { isMobile } from '../../libs/utils'

export default {
    name: 'input-format',
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            validator (value) {
                return ['phone', 'bankCard', 'idCard'].indexOf(value) !== -1
            }
        },
        placeholder: {
            type: String,
            default: '请输入'
        }
    },
    data () {
        return {
            val: this.value,
            format: {
                type: 'text'
            }
        }
    },
    watch: {
        value (val) {
            if (val !== this.val) {
                this.val = val
                this.$refs.input.value = this.format.regExp(this.val)
            }
        }
    },
    created () {
        this.format = format[this.type]
    },
    mounted () {
        this.$refs.input.value = this.format.regExp(this.val)
    },
    methods: {
        _input (e) {
            let selectionEnd = e.target.selectionEnd
            let _val = this.val
            let _format = this.format.regExp(_val)
            let val = e.target.value.replace(/[^\d]/g, '')
            let char = /\d/.test(e.target.value.substr(selectionEnd - 1, 1))
            // 删除后，前后的value相同，说明删除的是空格，需要处理成把空格前面的数字也删除掉
            if (_val === val && e.target.value.length < _format.length) {
                this.val = (_format.substr(0, selectionEnd - 1) + _format.substr(selectionEnd, _format.length)).replace(/[^\d]/g, '')
                selectionEnd -= 1
            } else {
                this.val = val
                selectionEnd -= (char ? 0 : 1)
            }
            if (this.type === 'idCard' && this.val.length === 17) {
                let lastChar = e.target.value.substr(e.target.value.length - 1, 1).toUpperCase()
                if (lastChar === 'X') {
                    this.val += lastChar
                    selectionEnd += 1
                }
            }
            e.target.value = this.format.regExp(this.val)
            if (e.target.value.length > _format.length) {
                selectionEnd += e.target.value.substr(selectionEnd - 1, 1) === ' ' ? 1 : 0
            } else {
                selectionEnd -= e.target.value.substr(selectionEnd - 1, 1) === ' ' ? 1 : 0
            }
            this.selectionEnd = selectionEnd
            e.target.setSelectionRange(this.selectionEnd, this.selectionEnd)
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

