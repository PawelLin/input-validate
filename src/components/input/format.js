export default {
    phone: {
        type: 'tel',
        maxlength: 11,
        fmaxlength: 13,
        regExp (val) {
            return val.replace(/^(\d{3})(?=\d)/g, "$1 ").replace(/(\d{4})(?=\d)/g, "$1 ")
        }
    },
    bankCard: {
        type: 'tel',
        maxlength: 19,
        fmaxlength: 23,
        regExp (val) {
            return val.replace(/(\d{4})(?=\d)/g, "$1 ")
        }
    },
    idCard: {
        type: 'text',
        maxlength: 18,
        fmaxlength: 21,
        regExp (val) {
            return val.replace(/^(\d{6})(\d{4})?(\d{4})?(\w{4})?/g, "$1 $2 $3 $4").replace(/\s+/g, ' ').replace(/\s$/, '')
        }
    }
}