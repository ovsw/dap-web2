<template>
  <li
    class="card  bg-white transition-transform flex flex-col shadow-md rounded-tr-3xl relative hover:shadow-lg"
  >
    <div class="order-2 p-4 space-y-2">
      <h3 class="text-2xl font-bold font-display ">
        <NuxtLink
          :to="url"
          class="cardLink flex items-center"
          aria-describedby="${title}-ride` | slugify"
        >
          {{ title }}
          <span :class="eyebrowColor" v-if="eyebrow" class="pill">{{
            eyebrow
          }}</span>
        </NuxtLink>
      </h3>
      <p v-if="description" class=" text-muted">
        {{ description }}
      </p>
      <p
        class="underline font-bold"
        aria-hidden="true"
        :id="`${title}-ride` | slugify"
      >
        Learn more
      </p>
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
  transform: scale(1.03);
}
.card:hover {
  transform: scale(1.03);
}
</style>
