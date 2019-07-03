import Vue from 'vue'
import App from '../public/index.html'
import importDirective from './directive'
import importComponent from './components'
import { Input } from 'iview'
importDirective(Vue)
importComponent(Vue)
Vue.component('iview-input', Input);
new Vue({
    el: '#app',
    template: App.body,
    data () {
        return {
            number: '',
            value: '',
            input: {
                number: '111',
                money: '222',
                idCard: '333',
                bankCard: '444',
                phone: '555',
                thousand: '6666',
                textarea: '7777'
            },
            dnumber: '888',
            iviewInput: '999',
            showValue: false,
            tab: {
                type: 'input-number',
                value: ''
            }
        }
    },
    beforeCreate () {
        this.regExp = {
            number: new RegExp(`^(0|[1-9]\\d*)$`)
        }
    },
    methods: {
        _input (e) {
            if (e.target.value && !(this.regExp.number.test(e.target.value))) {
                this.number = this.value
            } else {
                this.value = this.number
            }
        },
        test (e) {
            console.log('page')
            console.log(e.target.value)
        }
    }
})