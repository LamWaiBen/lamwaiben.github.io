const b = {
    b: 1,
    add() { b.b += 1 },
    log() { console.log((b, this)) },
}


module.exports = b