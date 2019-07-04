### 输入框限制输入
[预览](https://pawellin.github.io/input-validate/dist/index.html)
#### Vue组件示例包括：
- 纯数字输入框
- 金额输入框
- 身份证格式化
- 银行卡格式化
- 手机号格式化
- 千分位符格式化
- 自动换行输入框
#### 场景
1. 限制用户输入，如纯数字、纯金额等。
2. 格式化用户输入，如身份证、银行卡、手机号等。
#### 现象
1. input事件触发时，键入内容未显示在页面上，此时重新更替value值达到限制输入。
#### 实现 - 原生JS / Vue页面 / Vue组件 / Vue指令
1. 原生JS演示( 数字输入框 )
```
<body>
    <fieldset>
        <legend>原生JS演示</legend>
        <label for="js-input">数字输入框</label>
        <input id="js-input" type="tel">
    </fieldset>
    <script>
        let value = ''
        let regExp = new RegExp(`^(0|[1-9]\\d*)$`)
        document.getElementById('js-input').addEventListener('input', e => {
             if (e.target.value && !(regExp.test(e.target.value))) {
                e.target.value = value
             } else {
                value = e.target.value
            }
        })
    </script>
</body>
```
2. Vue页面演示 ( 数字输入框 )
```
<body>
    <div id="app">
        <fieldset>
            <legend>Vue演示</legend>
            <label for="number">数字输入框</label>
            <input id="number" v-model="number" type="tel" @input="_input">
        </fieldset>
    </div>
    <script>
        new Vue({
            el: '#app',
            data () {
                return {
                    number: '',
                    value: '',
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
                }
            }
        })
    </script>
</body>
```
3. Vue组件演示 ( 数字输入框 )
```
<template>
    <input :value="value" type="tel" @input="_input" :placeholder="placeholder" :maxlength="maxlength">
</template>
<script>
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
            this.$emit('input', this.val)
        }
    }
}
```
4. Vue指令演示
```
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
```
*因为v-model本质是input事件并且先于自定义指令触发，导致最后一个输入的非数字字符无法更新到v-model绑定的字段，故采用修饰符lazy转变为使用 change 事件进行同步。*
```
<input type="tel" v-model.lazy="dnumber" v-number></input>
```
#### 延伸 - 金额输入 / 格式化输入
1. 金额输入 ( input[type=number] )

```
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
```
*金额输入涉及到小数点，当type=tel时部分手机自带键盘没有小数点按钮，故使用type=number，弊端是无法控制光标。*

2. 格式化输入 (例：身份证格式化)
在input事件中，通过正则表达式格式化输入的身份证号码，更换e.target.value。
```
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
        // let char = /\d/.test(e.target.value.substr(selectionEnd - 1, 1))
        // 删除后，前后的value相同，说明删除的是空格，需要处理成把空格前面的数字也删除掉
        if (_val === val && e.target.value.length < _format.length) {
            this.val = (_format.substr(0, selectionEnd - 1) + _format.substr(selectionEnd, _format.length)).replace(/[^\d]/g, '')
            // selectionEnd -= 1
        } else {
            this.val = val
            // selectionEnd -= (char ? 0 : 1)
        }
        if (this.type === 'idCard' && this.val.length === 17) {
            let lastChar = e.target.value.substr(e.target.value.length - 1, 1).toUpperCase()
            if (lastChar === 'X') {
                this.val += lastChar
                // selectionEnd += 1
            }
        }
        e.target.value = this.format.regExp(this.val)
        // if (e.target.value.length > _format.length) {
            // selectionEnd += e.target.value.substr(selectionEnd - 1, 1) === ' ' ? 1 : 0
        // } else {
            // selectionEnd -= e.target.value.substr(selectionEnd - 1, 1) === ' ' ? 1 : 0
        // }
        // this.selectionEnd = selectionEnd
        // e.target.setSelectionRange(this.selectionEnd, this.selectionEnd)
        this.$emit('input', this.val)
    },
    _keydown (e) {
        // this.selectionEnd = e.target.selectionEnd
    },
     _keyup (e) {
        // if (isMobile()) e.target.setSelectionRange(this.selectionEnd, this.selectionEnd)
    }
}
```
*代码注释块为光标处理，在下面单独说明。*
#### 光标控制
当输入不符合的内容或格式化内容时，input事件进行限制处理时会导致光标位置错乱，需手动进行设置光标的位置，利用```HTMLInputElement.setSelectionRange```方法进行设置。
1. setSelectionRange(selectionStart, selectionEnd [, selectionDirection]);
![setSelectionRange兼容性](https://upload-images.jianshu.io/upload_images/14576157-4441806e1484bb25.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 扩展 - Vue指令应用第三方UI框架 ( 以iview为例 )
```
const directives = {
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
```
*input动态设置的value值通过keydown事件设置定义的value初始值。*
```
<iview-input v-model="iviewInput" v-iview-number type="tel">
    <span slot="prepend">纯数字输入框</span>
</iview-input>
```
#### 总结
利用input事件可以对输入内容进行限制，使用```HTMLInputElement.setSelectionRange```方法对输入时的光标进行控制，在使用Vue时可以方便地抽取纯数字组件、金额组件、身份证格式化组件等，在使用第三方UI框架时，也可以方便地自定义指令对基础输入组件进行限制及格式化输入。