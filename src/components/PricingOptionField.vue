<template>
  <div id="total">
    <div :style="divStyle">
      <div id="field">
        <input type="text" class="category" placeholder="Category" v-model="attractionId.category">
        <br>
        <input type="text" class="price" placeholder="Price" v-model="attractionId.price">
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "PricingOptionField",
  props:{
    count:{
      type: Number,
    },
    id:{
      type: Number,
    },
    attractionId:{
      type: Object,
    },
  },
  computed: {
    divStyle() {
      return {
        'background-color': 'rgba(255,248,248,0.2)',
        'border-radius': '20px',
        'margin': '5px 5px',
        'float': 'left',
        'width': 'calc(' + (100 / this.count) + '%' + ' - 10px',
      }
    },
  },
}
</script>

<style scoped>
  #total {
    margin: 5px 10px;
  }
  input {
    background-color: transparent;
    color: white;
    border: 1px solid lightblue;
    padding: 5px 10px;
    margin: 5px 10px;
    width: calc(100% - 40px);
    text-align: center;
  }
  ::placeholder {
    color: white;
    text-align: center;
  }
  #field {
    float: left;
    position: relative;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: center;
  }
  button {
    background: none;
    border: none;
    color: white;
    font-weight: bold;
  }
  .category {
    font-weight: bold;
    font-size: 18px;
    width: 7em;
  }
  .price {
    font-size: 16px;
    width: 4.5em;
  }
</style>