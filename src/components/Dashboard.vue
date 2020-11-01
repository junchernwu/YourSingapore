<template>
  <div>
    <div class="graph">
      <Graphs v-bind:docId="docId"></Graphs>
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
import Graphs from "@/components/Graphs";
export default {
  name: "Dashboard",
  components: {BumpStats,Dailystats,Graphs},
  mounted() {
    console.log("TESTING: " + this.$route.query.docId)
  },
  data() {
    return {
      docId: this.$route.query.docId
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

</style>