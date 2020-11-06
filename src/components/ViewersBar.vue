<script>
  import { Bar } from 'vue-chartjs'
 

  export default {
    extends: Bar,
    name:"ViewersBar",
    props: {
        docId: {
            type: String
        },
        datacollection: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    
    mounted () {
      
      this.renderChart(this.datacollection, this.options)
      console.log("Should be after")
    }
  }
</script>