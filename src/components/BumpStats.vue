<template>
  <div id="background">
    <h2>BUMP</h2>
    <p>{{this.stat}}</p>
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
              if (documentSnapshot.data().bump.status) {
                this.lastBumpDate = documentSnapshot.data().bump.date;
              }
              this.boostStat()
            }
          })
    },
    boostStat: function() {
      if (this.timesBoosted == 0) {
        this.stat = "No Bumps Yet"
      } else {
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
        if (calculated == 0) {
          this.stat = 0 + " %"
        } else if (isNaN(calculated)) {
          this.stat = "NIL"
        } else if (calculated > 0) {
          this.stat = "+ " + calculated + " %"
        } else {
          this.stat = "- " + -calculated + " %"
        }
        console.log("Non Boost Stat: " + nonBoostStat)
        console.log("CALCULATED: " + calculated)
        console.log("BOOST DAYS: " + boostDays)
        console.log("DAYS: " + this.numDays)
      }
    }
  },
}
</script>

<style scoped>
  #background {
    background-color: rgba(255, 248, 248, 0.2);
    border-radius: 20px;
    padding: 15% 20px;
    margin: 20px;
    width: 110%;
    height: 30%;
  }
  h2 {
    text-align: center;
    margin-top: 10px;
    font-weight: bold;
    font-family: 'Montserrat';
    color:rgb(177, 177, 177);
    position: relative;
  }
  h4 {
    margin: 0;
    text-align: center;
    font-weight: bold;
    font-family: 'Montserrat'
  }
  p {
    text-align: center;
    margin: 10px 0;
    font-weight: bold;
    font-size: 40px;
    font-family: Montserrat;
  }
</style>