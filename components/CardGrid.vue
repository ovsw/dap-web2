<template>
  <li class="card flex flex-col shadow-md rounded-tr-3xl relative">
    <div class="order-2 p-4 space-y-2">
      <h3 class="text-2xl font-black font-display flex items-center">
        <NuxtLink :to="url" class="cardLink">{{ title }}</NuxtLink>
        <span
          :class="eyebrowColor"
          v-if="eyebrow"
          class="ml-2 px-2 py-1 rounded-full text-sm"
          >{{ eyebrow }}</span
        >
      </h3>
      <p v-if="description" class=" text-muted">
        {{ description }}
      </p>
      <p class="underline font-bold">Learn more</p>
    </div>
    <img
      :src="
        $urlFor(image)
          .width(400)
          .height(300)
      "
      :alt="image.alt"
      class="order-1 rounded-tr-3xl"
    />
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "missing title"
    },
    eyebrow: {
      type: String
    },
    image: {
      type: Object
    },
    description: {
      type: String
    },
    url: {
      type: String,
      default: "/"
    }
  },
  computed: {
    eyebrowColor() {
      if (this.eyebrow == "Thrill Ride") {
        return "bg-red text-light";
      } else if (this.eyebrow == "Family Ride") {
        return "bg-yellow text-dark";
      } else if (this.eyebrow == "Kiddie Ride") {
        return "bg-green  text-light";
      }

      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
.cardLink::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.cardLink:focus {
  outline: none !important;
}

.card:focus-within {
  // box-shadow: 0 0 0 0.25rem #10722d;
  outline: 2px dashed green;
  outline-offset: 0.5rem;
}
</style>
