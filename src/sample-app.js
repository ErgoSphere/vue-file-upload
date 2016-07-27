import Vue from 'vue'
import VueResource from 'vue-resource'
import SampleApp from './SampleApp'

Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { SampleApp }
})
