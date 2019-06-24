import Vue from 'vue'
import App from './App'
import api from '@/common/js/vmeitime-http/'

Vue.config.productionTip = false
Vue.prototype.$api = api
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
