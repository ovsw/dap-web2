<template>
  <div class="Test">
    <h1>this is the preview test page</h1>
    <p>check the console</p>
  </div>
</template>

<script>
export default {
  asyncData() {
    console.log('🎈 asyncData: called')
  },
}
</script>

<style lang="css" scoped>
.Test {
  padding: 10vw;
}
</style>