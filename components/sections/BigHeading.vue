<template>
  <section
    class="[ bigHeadingSection ] bg-green text-light-light p-10 md:p-16 my-grd"
  >
    <div class="wrapper">
      <div class="text-center">
        <h2>{{ section.title }}</h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
