<template>
  <div class="col mb-4 menu" @click="addCart(Data)">
    <div class="card card-menu">
      <img :src="product_img" class="card-img-top" />
      <div class="card-body pl-0">
        <h5 class="card-title font-weight-bold mb-0">{{ product_name }}</h5>
        <p class="card-text font-weight-bold">Rp. {{ product_price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    product_name: {
      type: String,
      require: true,
    },
    product_price: {
      type: Number,
      require: true,
    },
    product_img: {
      type: String,
      require: true,
    },
    Data: {
      type: Object,
    },
  },
  methods: {
    addCart(value) {
      this.$emit('addtoCart', value);
    }
  }
};
</script>

<style scoped>
.card-menu {
  border: none;
  background: transparent;
}
.card-menu:hover {
  background-color: white;
  box-shadow: 3px 2px 3px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
</style>
