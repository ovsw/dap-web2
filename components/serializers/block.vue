<template functional>
  <!-- Simple functional component to avoid hydration issues -->
  <!-- Always wrap in <p> if no style, otherwise <div> -->
  <p v-if="!props.node || !props.node.style">
    <slot />
  </p>
  <div v-else>
    <slot />
  </div>
</template>