<template>
  <div>
    <button v-on:click="newPrice" type="button">
      <h3>Pricing Options</h3>
      <p>&#8853;</p>
    </button>
    <div v-for="field in fieldsList" v-bind:key="field.id">
      <PricingOptionField v-bind:count="count" v-bind:id="field.id" v-bind:list="fieldsList" v-bind:attractionId="attraction.pricing[field.id]"></PricingOptionField>
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
      }
    },
    data() {
      return {
        fieldsList: [],
      }
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
          this.fieldsList.push({
            id: this.fieldsList.length,
          });
        }
      }
    },
  }
</script>

<style scoped>
  /* Pricing Options Styling */
  button {
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
  button h3 {
    float: left;
    width: calc(98% - 20px);
    position: relative;
    left: 20px;
    top: 5px;
  }
  button p {
    float: right;
    width: calc(2% + 20px);
    position: relative;
    right: 10px;
    top: 3px;
  }
</style>