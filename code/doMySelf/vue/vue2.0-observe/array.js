const util = require('./util')
function arrayPro() {
    const methodsToPatch = [
        'push',
        'pop',
        'shift',
        'unshift',
        'splice',
        'sort',
        'reverse'
    ]

    const arrayProto = Array.prototype;
    const arrayMethods = Object.create(arrayProto)

    methodsToPatch.forEach(method => {
        let originMethod = arrayProto[method]
        util.def(arrayMethods, method, function (...args) {
            let res = originMethod.apply(this, args)
            let ob = this.__ob__
            let inserted;
            switch (method) {
                case 'push':
                case 'unshift':
                    inserted = args
                    break;
                case 'splice':
                    inserted = args.slice(2)
                    break;
                default:
                    break;
            }

            if (inserted && inserted.length) ob.observeArray(inserted)
            ob.dep.notify()
            return res
        })
    })

    return arrayMethods
}

module.exports = arrayPro();