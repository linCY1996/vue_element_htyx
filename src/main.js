import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import qs from 'qs'
// 'development',use package;'production':use cdn;

Vue.prototype.$qs = qs
import ElementUI from 'element-ui'
import Host from './common/request'
Vue.use(ElementUI, { size: 'small'});
import('element-ui/lib/theme-chalk/index.css')
import global from './Global'
Vue.prototype.Global = global

import './components/iconSvg' // iconSvg
import axios from 'axios';
Vue.prototype.$ajax = axios;

import '@/permission' // permission control
Vue.prototype.$http = Host

import '@/mockjs'; // mock数据

// i18n国际化
import i18n from "@/lang";

// 分享功能集合
// import { shareConfig } from './utils/share';
// Vue.prototype.shareConfig = shareConfig;


Vue.config.productionTip = false;



new Vue({
  router,
  store,
  i18n,  // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  render: h => h(App),
}).$mount('#app')
