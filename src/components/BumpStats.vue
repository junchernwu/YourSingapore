<template>
  <div id="background">
    <h2>BUMP</h2>
    <h1>{{this.stat}}</h1>
    <h4>increased views / day</h4>
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
  data() {
    return {
      dateAdded: '',
      timesBoosted: -1,
      numDays: -1,
      totalBoostViews: -1,
      totalNonBoostViews: -1,
      lastBumpDate: '',
      stat: null,
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
              this.dateAdded = documentSnapshot.data().dateAdded;
              this.timesBoosted = documentSnapshot.data().bumpTimes;
              this.numDays = Math.round((new Date().getTime() - this.dateAdded.toDate().getTime()) / (1000 * 3600 * 24));
              this.totalBoostViews = documentSnapshot.data().bumpViews;
              this.totalNonBoostViews = documentSnapshot.data().notBumpViews;
              if (documentSnapshot.data().bump != null) {
                this.lastBumpDate = documentSnapshot.data().bump.date;
              }
              this.boostStat()
            }
          })
    },
    boostStat: function() {
      var boostDays;
      if (this.lastBumpDate == '') {
        boostDays = this.timesBoosted * 7
      } else {
        var currentBoostDays = (new Date().getTime() - this.lastBumpDate.toDate().getTime()) / (1000 * 3600 * 24);
        boostDays = Math.round((this.timesBoosted - 1) * 7 + currentBoostDays)
      }
      var nonBoostStat = this.totalNonBoostViews / (this.numDays - boostDays)
      var boostStat = this.totalBoostViews / boostDays
      var calculated = Math.round((boostStat - nonBoostStat) / nonBoostStat * 100)
      if (calculated >= 0) {
        this.stat = "+ " + calculated + " %"
      } else {
        this.stat = "- " + -calculated + " %"
      }
      console.log("BOOST DAYS: " + boostDays)
      console.log("DAYS: " + this.numDays)
    }
  },
}
</script>

<style scoped>
  #background {
    background-color: rgba(255, 248, 248, 0.2);
    border-radius: 20px;
    padding: 20px;
    margin: 20px;
    width: 250px;
  }
  h2 {
    text-align: center;
    margin: 0;
    font-weight: bold;
    font-family: 'Montserrat'
  }
  h1 {
    text-align: center;
    margin: 10px 0;
    font-weight: bold;
    font-size: 60px;
    font-family: 'Montserrat'
  }
  h4 {
    margin: 0;
    text-align: center;
    font-weight: bold;
    font-family: 'Montserrat'
  }
</style>