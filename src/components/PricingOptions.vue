<template>
  <div>
    <div id="mainButton">
      <h3>Pricing Options</h3>
      <div id="buttons">
        <button id="add" v-on:click="newPrice" type="button">
          <p>&#8853;</p>
        </button>
        <button id="minus" v-on:click="delPrice" type="button">
          <p>&#8854;</p>
        </button>
      </div>
    </div>
    <div v-for="field in fieldsList" v-bind:key="field.id">

      <PricingOptionField v-bind:count="count" v-bind:id="field.id" v-bind:attractionId="attraction.pricing[field.id]"></PricingOptionField>

    </div>
  </div>
</template>

<script>
import PricingOptionField from "@/components/PricingOptionField";

export default {
  name: "PricingOptions",
  components: {
    PricingOptionField,
  },
  props: {
    attraction: {
      type: Object,
    },
  },
  data() {
    return {
      fieldsList: [],
    };
  },
  computed: {
    count() {
      return this.fieldsList.length;
    }
  },

  methods: {
    newPrice: function(){
      if (this.fieldsList.length == 3) {
        alert("Maximum of 3 Price Categories allowed!");
      } else {
        console.log("TEST PRICING: " + this.fieldsList.length)
        this.attraction.pricing[this.fieldsList.length] = {category: '', price: ''};
        this.fieldsList.push({
          id: this.fieldsList.length,
        });
      }
    },
    delPrice: function(){
      this.fieldsList.pop();
      delete this.attraction.pricing[this.fieldsList.length];

    }
  }
}
</script>

<style scoped>

  /* Pricing Options Styling */
  #mainButton {
    margin: 5px 10px;
    font-weight: bold;
    font-size: 20px;
    color: white;
    background-color: #00000033;
    border-radius: 20px;
    border: none;
    width: calc(100% - 20px);
    height: 40px;
  }

  #mainButton h3 {
    float: left;
    width: calc(80% - 20px);
    text-align: center;
    position: relative;
    left: calc(20px + 7%);
    top: 7px;
  }

  #buttons {
    float: right;
    width: 100px;
    padding: 0 10px;
  }

  #add {
    float: left;
    position: relative;
    top: 3px;
    left: 20px;
    background: transparent;
    border: none;
    color: white;
    border-radius: 20px;
  }

  #minus {
    float: right;
    position: relative;
    right: 10px;
    top: 3px;
    background: transparent;
    border: none;
    color: white;
    border-radius: 20px;
  }
</style>

