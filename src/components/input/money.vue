<template>
    <input :value="value" type="number" @input="_input" :placeholder="placeholder">
</template>

<script>
export default {
    name: 'input-money',
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
            default: 9
        },
        point: {
            type: [String, Number],
            default: 2
        }
    },
    data () {
        return {
            val: this.value
        }
    },
    created () {
        this.regExp = new RegExp(`^(0|[1-9]\\d{0,${this.maxlength - 1}})(\\.\\d{0,${this.point}})?$`)
    },
    methods: {
        _input (e) {
            if (!e.target.value && this.val.length === 1) {
                this.val = ''
            } else {
                if ((e.target.value && !(this.regExp.test(e.target.value))) || isNaN(e.target.valueAsNumber)) {
                    e.target.value = this.val
                } else {
                    this.val = e.target.value
                }
            }
            this.$emit('input', this.val)
        }
    }
}
</script>

