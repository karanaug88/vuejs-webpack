import Vue from 'vue'
import MainPage from './components/mainpage';
import {store} from './store/store'

new Vue({
  store: store,
  el: '#app',
  render: h => h(MainPage)
})
