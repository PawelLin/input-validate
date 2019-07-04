<template>
        <div ref="textarea"
            class="textarea"
            @input="_input"
            @keyup="_keyup"
            contenteditable="true">
    </div>
</template>

<script>
import { isMobile } from '../../libs/utils'

export default {
    name: 'input-textarea',
    props: {
        value: {
            type: String,
            default: ''
        },
        maxlength: {
            type: Number,
            default: 200
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
                this.$refs.textarea.innerText = this.val = val
            }
        }
    },
    mounted () {
        this.$refs.textarea.innerText = this.val
    },
    methods: {
        _input (e) {
            this.selectionEnd = document.getSelection().getRangeAt(0).startOffset
            let len = e.target.innerText.length
            if (len > this.maxlength || e.target.innerText.match(/[^\u4E00-\u9FA5\dA-Za-z\s~#'\-()|*]/)) {
                let inputLen = len - this.val.length
                let index = this.selectionEnd - inputLen
                e.target.innerText = this.val
                this.setSelection(e, index)
            } else {
                this.val = e.target.innerText
            }
            this.val = e.target.innerText
            this.$emit('input', this.val)
        },
        _keyup (e) {
            if (isMobile()) this.setSelection(e, this.selectionEnd)
        },
        setSelection (e, index) {
            if (e.target.firstChild && index >= 0) {
                this.selectionEnd = index
                let range = document.createRange()
                range.setStart(e.target.firstChild, index)
                range.setEnd(e.target.firstChild, index)
                let selection = window.getSelection()
                selection.selectAllChildren(e.target)
                selection.removeAllRanges()
                selection.addRange(range)
            }
        }
    }
}
</script>

<style scoped>
.textarea {
    display: inline-block;
    padding: 6px 7px 4px;
    width: 170px;
    min-height: 22px;
    max-height: 100px;
    overflow-x: hidden;
    overflow-y: auto;
    word-break: break-all;
    background-color: white;
    cursor: text;
    vertical-align: middle;
    font-size: 13px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
}
.textarea:focus, .textarea:hover {
    border-color: #42b983;
}
.textarea:focus {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(45,240,204,.2);
}
[contentEditable=true]:empty:before{
    content: attr(placeholder);
    color: #b5b5b5;
}
</style>


