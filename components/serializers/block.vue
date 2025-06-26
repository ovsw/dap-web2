<template>
  <p v-if="!node || !node.style">
    <slot />
  </p>
  <div v-else>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BlockSerializer',
  props: {
    node: {
      type: Object,
      default: null
    }
  }
}
</script>