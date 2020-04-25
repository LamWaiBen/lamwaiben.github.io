const customRequire = require('./index')

const b = customRequire('./b.js')
b.log()
b.add()
b.log()


const c = customRequire('./c.js')
// const b2 = customRequire('./b.js')
// b2.add()
// b2.log()