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
            type: Number,
            default: 9
        },
        point: {
            type: Number,
            default: 2
        },
        inMax: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            val: this.value
        }
    },
    created () {
        this.regExp = new RegExp(`^(0|[1-9]\\d{0,${this.maxlength - 1}})(\\.\\d{0,${this.point}})?$`)
        this.regExp1 = new RegExp(`^9{${this.maxlength}}(\\.\\d{0,${this.point}})?$`)
    },
    methods: {
        _input (e) {
            const value = e.target.value
            if (!value && this.val.length === 1) {
                this.val = ''
            } else {
                if ((value && (!(this.regExp.test(value)) || this.regExp1.test(value))) || isNaN(e.target.valueAsNumber)) {
                    if (this.inMax && this.regExp1.test(value)) this.val = value.replace(/\.\d*/, '')
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

