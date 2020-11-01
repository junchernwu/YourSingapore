<template>
  <div id="background">
    <h2>DAILY STATISTICS</h2>
    <h4>NUMBER OF VIEWERS TODAY</h4>
    {{viewsToday}}
    <h4>NUMBER OF PEOPLE WHO ADDED YOUR ATTRACTION TO THEIR PLANNER TODAY</h4>
    
    <h4>EXPECTED NUMBER OF ARRIVALS</h4>
  </div>
</template>

<script>
import { database } from "@/firebase/";
export default {
  name: "BumpStats",
  props: {
    docId: {
      type: String,
    }
  },
  data(){
      return{
          viewsToday:0,
          addsToday:0
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
                var currentDate= new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
                if(currentDate in documentSnapshot.data().stats){
                    this.viewsToday=documentSnapshot.data().stats[`${currentDate}`].views
                    console.log(this.viewsToday)
                }
            }
        })
    }
  }
}
</script>

<style scoped>
  #background {
    background-color: rgba(255, 248, 248, 0.2);
    border-radius: 20px;
    padding: 20px;
    margin: 20px;
    width: 400px;
  }
  h2 {
    text-align: center;
    margin: 0;
    font-weight: bolder;
    font-family: 'Montserrat';
    color:rgb(177, 177, 177);
  }
  h1 {
    text-align: center;
    margin: 10px 0;
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