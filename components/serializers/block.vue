<template>
  <!-- Handle blocks without style property by wrapping in <p> -->
  <p v-if="shouldWrapInParagraph">
    <slot />
  </p>
  <!-- For blocks with style, render as div to let default handling take over -->
  <div v-else>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    shouldWrapInParagraph() {
      // Check if node exists and lacks style property
      return this.node && !this.node.style;
    }
  }
};
</script>