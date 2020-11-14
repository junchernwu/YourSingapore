<template>
  <div id="background">
    <h2>DAILY STATISTICS</h2>
    <h4>NUMBER OF VIEWERS TODAY</h4><br>
    <h1>{{viewsToday}}</h1>
    <h4>NUMBER OF PEOPLE WHO ADDED YOUR ATTRACTION TO THEIR PLANNER TODAY</h4><br>
    <h1>{{addsToday}}</h1>
    <h4>EXPECTED NUMBER OF ARRIVALS</h4><br>
    <h1>{{arrivals}}</h1>
  </div>
</template>

<script>
import { database } from "@/firebase/";
export default {
  name: "Dailystats",
  props: {
    docId: {
      type: String,
    }
  },
  data(){
      return{
          viewsToday:0,
          addsToday:0,
          arrivals:0
      }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      database
          .collection("attraction2")
          .doc(this.docId).get().then((documentSnapshot) => {
            if (documentSnapshot.exists) {
                var currentDate1= new Date()
                var currentDate=this.formatDate(currentDate1)
                if(currentDate in documentSnapshot.data().stats){
                    this.viewsToday=documentSnapshot.data().stats[`${currentDate}`].views
                    this.addsToday=documentSnapshot.data().stats[`${currentDate}`].adds
                    this.arrivals=documentSnapshot.data().arrivals[`${currentDate}`].numArrivals

                }
            }
            
        })
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
  #background {
    background-color: rgba(255, 248, 248, 0.2);
    border-radius: 20px;
    padding: 50px 30px;
    margin: 20px;
    width: 110%;
    height: 70%;
  }
  h2 {
    text-align: center;
    font-weight: bolder;
    font-family: 'Montserrat';
    color:rgb(177, 177, 177);
    margin-top: 10px;
    margin-bottom: 20px;
  }
  h1 {
    text-align: center;
    margin-bottom: 10px;
    position: relative;
    top: -25px;
    font-weight: bolder;
    font-size: 60px;
    font-family: 'Montserrat'
  }
  h4 {
    margin: 0;
    text-align: center;
    font-weight: bolder;
    font-family: 'Montserrat'
  }
</style>