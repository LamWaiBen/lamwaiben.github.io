module.exports = {
    enhance(target, methodName) {
        const origin = target[methodName]
        return function () {
            const result = origin.apply(target, arguments)
            const event = new Event(methodName.toLowerCase())
            event.arguments = arguments
            window.dispatchEvent(event)
            return result
        }
    }
}