const {timeout, cleartimeout, interval, clearinterval} = (function () {
  let TIMEOUTID = 0
  let INANIMATION = false

  let TIMEOUTQUEUE = {}
  let PROXYQUEUE = new Proxy(TIMEOUTQUEUE, {
    get (target, key, receiver) {
      if (key === 'length') {
        return Object.keys(target).length
      }
      return Reflect.get(target, key, receiver)
    },
    set (target, key, value, receiver) {
      startAnimationFrame()
      return Reflect.set(target, key, value, receiver)
    }
  })

  function startAnimationFrame () {
    if (INANIMATION) return

    function frameCallback() {
      let now = new Date().getTime()
      
      for (let i in PROXYQUEUE) {
        if (now - PROXYQUEUE[i].startTime >= PROXYQUEUE[i].delay) {
          PROXYQUEUE[i].callback()
          if (!PROXYQUEUE[i].isinterval) {
            delete PROXYQUEUE[i]
          } else {
            PROXYQUEUE[i].startTime += PROXYQUEUE[i].delay
          }
        }
      }
      if (PROXYQUEUE.length > 0) {
        window.requestAnimationFrame(frameCallback)
      } else {
        INANIMATION = false
      }
    }
  
    window.requestAnimationFrame(frameCallback)
    INANIMATION = true
  }

  function timeout (callback, delay = 0, ...params) {
    if (!Number.isInteger(delay)) {
      throw TypeError('the delay must be a integer number')
    }
  
    if (typeof callback === 'function') {
      callback = callback.bind(window, ...params)

    } else if (typeof callback === 'string') {
      let callbackstr = callback
      callback = function(){eval(callbackstr)}.bind(window)
      
    }

    TIMEOUTID++
    if (!PROXYQUEUE[TIMEOUTID]) {
      PROXYQUEUE[TIMEOUTID] = {
        startTime: new Date().getTime(),
        delay: delay,
        callback: callback,
        isinterval: false
      }
    } else {
      PROXYQUEUE[TIMEOUTID].startTime = new Date().getTime()
      PROXYQUEUE[TIMEOUTID].delay = delay
      PROXYQUEUE[TIMEOUTID].callback = callback
    }

    return TIMEOUTID
  }

  function cleartimeout (timeoutid) {
    delete PROXYQUEUE[timeoutid]
  }

  function interval (...allparams) {
    let TIMEOUTID_COPY = TIMEOUTID
    
    PROXYQUEUE[++TIMEOUTID_COPY] = {
      isinterval: true
    }

    timeout(...allparams)

    return TIMEOUTID_COPY
  }

  function clearinterval (intervalid) {
    delete PROXYQUEUE[intervalid]
  }

  return {timeout, cleartimeout, interval, clearinterval}
}())



// test
var a = new Date().getTime()

var intervalid = interval(function() {
  console.log('interval: ',new Date().getTime() - a)
}, 2000)

timeout(function() {
  console.log('timeout: ',new Date().getTime() - a )
  timeout(function() {
    clearinterval(intervalid)
    console.log('clearinterval: ', intervalid)
  }, 10000)
}, 1000)