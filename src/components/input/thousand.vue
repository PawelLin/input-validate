<template>
    <input ref="input" type="tel" @input="_input" @keyup="_keyup" @keydown="_keydown" :placeholder="placeholder" :maxlength="maxlength">
</template>

<script>
import { isMobile } from '../../libs/utils'

export default {
    name: 'input-thousand',
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
    watch: {
        value (val) {
            if (val !== this.val) {
                this.val = val
                this.$refs.input.value = this.thousand(this.val)
            }
        }
    },
    mounted () {
        this.$refs.input.value = this.thousand(this.val)
    },
    methods: {
        _input (e) {
            let selectionEnd = e.target.selectionEnd
            let _val = this.val
            let _format = this.thousand(_val)
            let val = this.number(e.target.value)
            let char = /\d/.test(e.target.value.substr(selectionEnd - 1, 1))
            // 删除后，前后的value相同，说明删除的是逗号，需要处理成把逗号前面的数字也删除掉
            if (_val === val && e.target.value.length < _format.length) {
                this.val = this.number(_format.substr(0, selectionEnd - 1) + _format.substr(selectionEnd, _format.length))
                selectionEnd -= 1
            } else {
                this.val = val
                selectionEnd -= (char ? 0 : 1)
            }
            e.target.value = this.thousand(this.val)
            selectionEnd += this.comma(e.target.value).length - this.comma(_format).length
            this.selectionEnd = selectionEnd < 0 ? 0 : selectionEnd
            e.target.setSelectionRange(this.selectionEnd, this.selectionEnd)
            this.$emit('input', this.val)
        },
        _keydown (e) {
            this.selectionEnd = e.target.selectionEnd
        },
        _keyup (e) {
            if (isMobile()) e.target.setSelectionRange(this.selectionEnd, this.selectionEnd)
        },
        thousand (val) {
            return val.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
        },
        number (val) {
            return val.replace(/[^\d]/g, '')
        },
        comma (val) {
            return val.replace(/[^,]/g, '')
        }
    }
}
</script>

