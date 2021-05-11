<template>
  <section class="py-24 px-4">
    <div class="container mx-auto">
      <h2 v-if="title" class="mb-10">{{ title }}</h2>
      <ul class="gridWrapper">
        <slot></slot>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped></style>
