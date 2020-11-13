<template>
  <div>
    <div class="graph">
      <ViewersBar id="viewersBar" v-bind:docId="docId" :datacollection="datacollection" :options="options"  v-if="loaded" ></ViewersBar>
      <AddsBar id="addsBar" v-bind:docId="docId" :datacollection2="datacollection2" :options2="options2"  v-if="loaded" ></AddsBar>
    </div>
    <div class="stats">
      <Dailystats v-bind:docId="docId"></Dailystats>
      <BumpStats v-bind:docId="docId"></BumpStats>
    </div>
  </div>
</template>

<script>
import BumpStats from "@/components/BumpStats";
import Dailystats from "@/components/Dailystats";
import ViewersBar from "@/components/ViewersBar";
import AddsBar from "@/components/AddsBar";
import { database } from "@/firebase/";

export default {
  name: "Dashboard",
  components: {BumpStats,Dailystats,ViewersBar,AddsBar},
  async mounted() {
    console.log("TESTING: " + this.$route.query.docId)
    this.loaded=false
    try{
      await this.fetchData()
    }
    catch{
      console.error("ERROR")
    }
  },

  data() {
    return {
      docId: this.$route.query.docId,
      loaded:false,
      dates:[],
      datacollection: {
        labels: [],
        datasets: [
          {
            label: 'Number of viewers over the past week',
            backgroundColor: "#2F78B9",
            data: []
            
          }
        ]
      },
      datacollection2: {
        labels: [],
        datasets: [
          {
            label: 'Number of people who added your attraction to their planner over the past week',
            backgroundColor: "#5f4ea3",
            data: []
            
          }
        ]
      },
      options: {
        legend: {
            labels: {
                    fontColor: "white",
                    fontSize: 12
                }
        },
        scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 12,
                        stepSize: 2,
                        beginAtZero: true
                    },
                    gridLines:{
                        display:false,
                        color:"white"
                        
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 12,
                        stepSize: 2,
                        beginAtZero: true
                    },
                    gridLines:{
                        display:false,
                        color:"white"
                        
                    }
                }]
          },
        responsive: true,
        maintainAspectRatio: false
      },
      options2: {
        legend: {
            labels: {
                    fontColor: "white",
                    fontSize: 12
                }
        },
        scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 12,
                        stepSize: 2,
                        beginAtZero: true
                    },
                    gridLines:{
                        display:false,
                        color:"white"
                        
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 12,
                        stepSize: 2,
                        beginAtZero: true
                    },
                    gridLines:{
                        display:false,
                        color:"white"
                        
                    }
                }]
          },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  
  methods: {
        fetchData: function () {
            database
            .collection("attraction2")
            .doc(this.docId).get().then((documentSnapshot) => {
                this.GetDates(7)
                if (documentSnapshot.exists) {
                    console.log("CHART:"+ this.docId)
                    console.log(this.dates)
                    
                    for(const x of this.dates){
                        //this.datacollection.labels.push(key.toString())
                        console.log(x)
                        if(x in documentSnapshot.data().stats){
                          this.datacollection.datasets[0].data.push(documentSnapshot.data().stats[`${x}`].views)
                          this.datacollection2.datasets[0].data.push(documentSnapshot.data().stats[`${x}`].adds)
                        }
                        else{
                          this.datacollection.datasets[0].data.push(0)
                          this.datacollection2.datasets[0].data.push(0)
                        }
                    }
                    console.log(this.datacollection.datasets[0].data)
                    this.loaded=true
                    
                }
            })
            
        },
        GetDates: function(daysToAdd) {
            var current=new Date().getTime()
            for (var i = 0; i < daysToAdd; i++) {
                this.dates.push(this.formatDate(new Date(current - (i*86400000)).toString()))
            }
            this.datacollection.labels = this.dates
            this.datacollection2.labels = this.dates
        },

        formatDate: function(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;

          return [year, month, day].join('-');
        }
    }
}
</script>

<style scoped>
.graph{
  float:left;
  width:70%;
  
}
.stats{
  float:left;
  width:25%;
}
#viewersBar{
  height:350px;
}
#addsBar{
  height:350px;
}


</style>