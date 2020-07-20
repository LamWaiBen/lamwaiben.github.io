
console.log(self)

self.addEventListener('message', e => {
    console.log('Message event:', e);
})

self.addEventListener('sync', e => {
    console.log('Sync event:', e);
})

self.addEventListener('push', e => {
    console.log('Push event:', e);
})



/**
 * 找出对应的其他key并进行删除操作
 * @returns {*}
 */
function deleteOldCaches() {
    return caches.keys().then(function (keys) {
        var all = keys.map(function (key) {
            if (key.indexOf(CACHE_PREFIX) !== -1 && key.indexOf(CACHE_VERSION) === -1) {
                console.log('[SW]: Delete cache:' + key);
                return caches.delete(key);
            }
        });
        return Promise.all(all);
    });
}


///////////////////////////////  生命周期 ///////////////////////////////////////////////////
// 事件: install  activate

const CACHE_PREFIX = 'SW-CACHE';
const CACHE_VERSION = '0.0.4';
const CACHE_NAME = CACHE_PREFIX + '-' + CACHE_VERSION;

// install阶段, 如果缓存不存在则自动发送请求, 把结果缓存起来
let allAssets = [
    './index.css',
    './test_cache.js'
]

self.addEventListener('install', function (e) {
    console.log('Install event:', e);
    self.skipWaiting();     // 直接调过等待阶段, 使更新的sw立即工作

    e.waitUntil(
        // caches.open 打开指定的缓存
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW]: Opend cache');
                return cache.addAll(allAssets)
            })
    )
});

self.addEventListener('activate', function (e) {
    console.log('Activate event:', e);

    // 当需要重新激活时, 说明上一个sw已失效, 那么需要把之前的缓存清空
    e.waitUntil(
        // 遍历 caches 里所有缓存的 keys 值
        caches.keys().then(deleteOldCaches)
    );
});


///////////////////////////////  缓存功能 ///////////////////////////////////////////////////
// 事件: fetch

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                console.log('请求的缓存:', response)
                if (response) return response    // 缓存命中

                response = fetch(event.request)

                return response
            })
    )
})

///////////////////////////////  crash监听 ///////////////////////////////////////////////////
// 事件: message

const CHECK_CRASH_INTERVAL = 10 * 1000;
const CRASH_THRESHOLD = 20 * 1000;
const pages = {}
let timer

function checkCrash() {
    const now = Date.now()
    for(let id in pages) {
        const page = pages[id]
        if((now - page.t) > CRASH_THRESHOLD) {
            // todo 上报 crash 
            delete pages[id]
        }
    }
    if(Object.keys(pages).length === 0) {
        clearInterval(timer)
        timer = null
    }
}

self.addEventListener('message', event => {
    let data = event.data
    if(data.type === 'heartbeat') {
        
        pages[data.id] = {
            t: Date.now()
        }
    
        if(!timer) {
            timer = setInterval(() => {
                checkCrash()
            }, CHECK_CRASH_INTERVAL)
        }

    } else if(data.type === 'unload') {
        delete pages[data.id]
    }
})

