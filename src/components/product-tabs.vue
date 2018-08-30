<template>
  <div>
	<span v-for="(tab,index) in tabs" class="tab"
        :class="{ activeTab : selectedTab === tab}"
        @click="selectedTab = tab">
		{{tab}}
	</span>


    <div v-show="selectedTab === 'Reviews'">
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet</p>
      <ul>
        <li v-for="review in reviews">
          <p>{{review.name}}</p>
          <p>{{review.review}}</p>
          <p>{{review.rating}}</p>
          <p>{{review.recommendation}}</p>
        </li>
      </ul>
    </div>

    <product-review v-show="selectedTab==='Make a Review'"></product-review>
  </div>
</template>

<script>
  import productReview from './product-review'

    export default {
        name: "product-tabs",
      props: {
        reviews:{
          type: Array,
          required: true
        }
      },
      data(){
        return {
          tabs: ["Reviews","Make a Review"],
          selectedTab: 'Reviews'
        }
      },
      components:{
        'product-review':productReview
      }
    }
</script>

<style scoped>

</style>
