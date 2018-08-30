<template>
  <div>
		<span v-for="(tab,index) in tabs" class="tab"
          :class="{activeTab : selectedTab === tab}"
          @click="selectedTab = tab">
			{{tab}}
		</span>

    <p v-show="selectedTab === 'Shipping'">User is premium {{shipping}}</p>
    <product-details v-show="selectedTab === 'Details'" :details="details"></product-details>

  </div>
</template>

<script>
  import productDetails from './product-details'

    export default {
        name: "other-details-tab",
      props: {
        shipping:{
          required: true
        },
        details:{
          type: Array,
          required: true
        }
      },
      data(){
        return{
          tabs: ['Shipping','Details'],
          selectedTab: 'Shipping'
        }
      },
      components:{'product-details': productDetails}
    }
</script>

<style scoped>

</style>
