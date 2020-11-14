<script>
  import { Bar } from 'vue-chartjs'
 

  export default {
    extends: Bar,
    name:"AddsBar",
    props: {
        docId: {
            type: String
        },
        datacollection2: {
            type: Object,
            default: null
        },
        options2: {
            type: Object,
            default: null
        }
    },
    
    mounted () {
      this.renderChart(this.datacollection2, this.options2)
      console.log("Should be after")
    }
  }
</script>