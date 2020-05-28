export default {
    install(Vue) {
        Vue.iterationStorage = function(callback) {
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i) 
                if (key.replace(/=\d+/, '') === 'table') {
                    callback(key, i)
                }
            }
        } 
    }
}