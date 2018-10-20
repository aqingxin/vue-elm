import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/my-mint.css'
import axios from 'axios'
// import { Indicator } from 'mint-ui'
Vue.prototype.$http=axios

Vue.config.productionTip = false

Vue.use(MintUI)
// Vue.component(Indicator)
function setHtmlFontSize(px){
  var recalc = function () {
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0];
    // if(htmlWidth>=px){
    //   htmlDom.style.fontSize = '100px';
    // }
    // else{
      htmlDom.style.fontSize = 100 * (htmlWidth / px) + 'px';
    // }
  }

  window.addEventListener('resize',recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
}

setHtmlFontSize(375);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
