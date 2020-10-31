<template>
  <div>
    <BumpStats v-bind:docId="docId"></BumpStats>
  </div>
</template>

<script>
import BumpStats from "@/components/BumpStats";
export default {
  name: "Dashboard",
  components: {BumpStats},
  mounted() {
    console.log("TESTING: " + this.$route.params.docId)
  },
  data() {
    return {
      docId: this.$route.params.docId
    }
  }
}
</script>

<style scoped>
</style>