<template>
  <div
    class="
    cardGeneric
    flex flex-col  "
  >
    <div
      class="header space-y-4 text-light rounded-tr-large p-10"
      :class="`bg-${colorTheme}`"
    >
      <component
        :is="`h${headingLvl}`"
        class=" text-2xl font-black font-display uppercase"
        >{{ title }}</component
      >
      <p class=" uppercase tracking-wider font-semibold">{{ subtitle }}</p>
    </div>

    <div
      class="body bg-light flex-1 p-10 border-5 flex flex-col justify-around items-start rounded-br-large"
      :class="`border-${colorTheme}`"
    >
      <slot></slot>

      <ButtonC
        v-if="buttonText && buttonUrl"
        :url="buttonUrl"
        class="mt-6"
        :bgColor="colorTheme"
        >{{ buttonText }}</ButtonC
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "missing card title"
    },
    subtitle: {
      type: String,
      default: "missing card subtitle"
    },
    color: {
      type: String,
      default: "green"
    },
    headingLvl: {
      type: String,
      default: "3"
    },
    buttonText: {
      type: String
    },
    buttonUrl: {
      type: String,
      default: "#"
    }
  },
  computed: {
    colorTheme() {
      return this.color.replace("Theme", "");
    }
  }
};
</script>

<style lang="scss" scoped></style>
