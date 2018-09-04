<template>
  <div class="product">

    <div class="product-image">
      <a :href="product.href">
        <img :src="image">
      </a>
    </div>

    <div class="product-info">
      <h1>{{title}}</h1>
      <h2>{{product.desc}}</h2>
        <h3 v-if="product.inventory > 10">In Stock !</h3>
        <h3 v-else-if="product.inventory < 10 && product.inventory >=1">Almost sold out !</h3>

        <!-- shown below are 3 ways of binding classes -->
        <!--           <h3 :class="{outOfStock : !product.inStock}" v-else>Out of Stock !</h3> -->
        <!-- <h3 :class="outOfStockClassObject" v-else>Out of Stock !</h3> -->
        <h3 :class="[inStock ? '' : 'outOfStock']" v-else>Out of Stock !</h3>

        <p>{{onSale}}</p>

        <product-tabs></product-tabs>
        <other-details-tab :shipping="shipping" :details="product.details"></other-details-tab>

        <div v-for="(variant, index) in product.variants"
             :key="variant.color"
             class="color-box"
             :style="variant.styleObject"
             @mouseover="showVariant(index)">
        </div>

        <button :disabled="!inStock"
                :class="{disabledButton: !inStock} "
                @click="addToCart">Add to Cart</button>

        <button @click="removeFromCart">Remove</button>
    </div>
  </div>
</template>

<script>

  import producttabs from './product-tabs'
  import otherDetailTabs from './other-details-tab'
  import EventBus from './event-bus'

    export default {
        name: "product",
      data() {
        return {
          product: {
            brand: 'Vue',
            name: 'Socks',
            desc: 'Warm socks that would keep your feet cozy in winters',
            selectedVariant: 0,
            // img: './stihl.gif',
            href: 'http://publish.stihl-aem-demo.rg02.diconium.cloud/',
            inStock: false,
            inventory: 10,
            onSale: false,
            details: [{
              desc1: "80 % metal",
              desc2: "20 % aluminium",
              desc3: " used to cut trees"
            },
              {
                desc1: "50 % metal",
                desc2: "20 % aluminium",
                desc3: " used to cut trees"
              }],
            variants: [{
              id: "GJKK123",
              color: "Orange",
              img: "../src/assets/stihl1.gif",
              styleObject:{
                backgroundColor: "Orange"
              },
              quantity: 10,
              onSale: true
            },
              {
                id: "OOU45",
                color: "Green",
                img: "../src/assets/stihl2.gif",
                styleObject:{
                  backgroundColor: "Green"
                },
                quantity: 1,
                onSale: false
              }],
            cart: 0
          }
        }
      },
      methods: {
        addToCart(){
          this.$emit('add-to-cart',this.product.variants[this.product.selectedVariant].id)
        },
        showVariant(index){
          this.product.selectedVariant = index;
          console.log(index);
        },
        removeFromCart(){
          this.$emit('remove-from-cart',this.product.variants[this.product.selectedVariant].id)
        }
      },
      computed: {
        outOfStockClassObject() {
          return {
            outOfStock: !this.product.inStock
          }
        },
        title(){
          return this.product.brand + "..." + this.product.name;
        },
        image(){
          return this.product.variants[this.product.selectedVariant].img;
        },
        inStock(){
          return this.product.variants[this.product.selectedVariant].quantity;
        },
        onSale(){
          if (this.product.variants[this.product.selectedVariant].onSale) {
            return this.product.brand + "..." + this.product.name + " are on sale"
          }
          return this.product.brand + "..." + this.product.name + " are not on sale"
        },
        shipping(){
          if (this.$store.state.premium) {
            return "Free"
          }
          return 2.99
        }
        // onSale(){
        // 	return this.product.variants[this.product.selectedVariant].onSale;
        // }
      },
      components:{
        'product-tabs':producttabs, 'other-details-tab' : otherDetailTabs
      }
    }
</script>

<style scoped>

</style>
