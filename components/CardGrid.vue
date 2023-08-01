<template>
  <li
    class="card bg-white transition-transform flex flex-col shadow-md rounded-tr-3xl relative hover:shadow-lg"
  >
    <div class="order-2 p-4 space-y-2 flex-1 flex flex-col justify-between">
      <h3 class="">
        <a
          :href="url"
          class="cardLink"
          :aria-describedby="`${title}-ride` | slugify"
        >
          <span class="block text-xl font-bold font-display mb-3">
            {{ title }}
          </span>

          <span class="flex space-x-2 items-baseline">
            <template v-if="enableEndDates">
              <span v-if="sameStartEndDates" class="pill bg-gray-300">
                {{ date | formatDateShort }}</span
              >
              <span v-else class="pill bg-gray-300">
                {{ date | formatDateShort }} - {{ endDate | formatDateShort }}
              </span>
            </template>

            <template v-else>
              <template v-if="date">
                <span class="pill bg-gray-300">{{
                  date | formatDateShort
                }}</span>
              </template>
            </template>

            <template v-if="tags.length">
              <span
                v-for="(tag, index) in tags"
                :key="index"
                :class="tagColor(tag)"
                class="pill"
                >{{ tagText(tag) }}</span
              >
            </template>
          </span>
        </a>
      </h3>
      <p v-if="description" class="text-muted">
        {{ description }}
      </p>
      <p
        class="underline font-bold mt-autp"
        aria-hidden="true"
        :id="`${title}-ride` | slugify"
      >
        Learn more
      </p>
    </div>
    <img
      :src="$urlFor(image).width(400).height(300)"
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
      default: "missing title",
    },
    enableEndDates: {
      type: Boolean,
      default: () => false,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    image: {
      type: Object,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    endDate: {
      type: String,
    },
    url: {
      type: String,
      default: "/",
    },
  },
  computed: {
    sameStartEndDates() {
      if (this.date == this.endDate) {
        return true;
      }
      return false;
    },
  },
  methods: {
    formatDateShort(dateValue) {
      const date = new Date(dateValue);

      return date.toLocaleString(["en-US"], {
        timeZone: "America/New_York",
        month: "short",
        day: "2-digit",
      });
    },
    tagColor(tag) {
      if (["Thrill Ride", "food"].includes(tag)) {
        return "bg-red text-light-light";
      } else if (["Family Ride", "free"].includes(tag)) {
        return "bg-yellow text-dark";
      } else if (["Kiddie Ride", "park"].includes(tag)) {
        return "bg-green text-light-light";
      } else if (["music"].includes(tag)) {
        return "bg-blue text-light-light";
      }

      return "";
    },
    tagText(tag) {
      if (tag == "free") {
        return "free entry";
      }
      return tag;
    },
  },
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
