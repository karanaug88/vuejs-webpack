<template>
  <form class="submit-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
      <b>Please correct the following errors</b>
    </p>
    <ul>
      <li v-for="error in errors">
        {{error}}
      </li>
    </ul>


    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name">
    </p>

    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>
      <span>Would you recommend this product: </span>
      <input type="radio" v-model="recommendation" value="yes" checked> Yes<br>
      <input type="radio" v-model="recommendation" value="no"> No<br>
    </p>

    <p>
      <input type="submit" value="Submit">
    </p>
  </form>
</template>

<script>
  import EventBus from './event-bus'

    export default {
        name: "product-review",
      data(){
        return {
          name:null,
          review: null,
          rating: null,
          recommendation: null,
          errors: []
        }
      },
      methods:{
        onSubmit(){

          if (this.name && this.review && this.rating) {
            let productReview = {
              name: this.name,
              review: this.review,
              rating: this.rating,
              recommendation: this.recommendation
            }
            EventBus.$emit('review-submitted',productReview)

            this.name = null
            this.review = null
            this.rating = null
            this.recommendation = null
          }
          else {
            if (!this.name) {this.errors.push("Name required")}
            if (!this.review) {this.errors.push("Review required")}
            if (!this.rating) {this.errors.push("Rating required")}
            if (!this.recommendation) {this.errors.push("Recommendation required")}
          }
        }
      }
    }
</script>

<style scoped>

</style>
