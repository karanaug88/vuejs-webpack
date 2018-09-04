import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    premium : false,
    reviews: []
  },
  mutations:{
    addReview:(state,productReview) =>{
      state.reviews.push(productReview);
    },
    deleteReview:(state, index) =>{
      state.reviews.slice(index,1);
    }
  }
})
