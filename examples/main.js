import Vue from 'vue'
import App from './App.vue'
/* 
  packages：用于存放所有的组件
  examples：用于进行测试，把src改为examples
*/

import myUi from '../packages'
Vue.config.productionTip = false
Vue.use(myUi)

new Vue({
  render: h => h(App),
}).$mount('#app')
