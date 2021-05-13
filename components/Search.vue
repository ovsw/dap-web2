<template>
  <ais-instant-search :search-client="searchClient" index-name="dap-2">
    <ais-configure :hits-per-page.camel="5">
      <!-- :attributesToSnippet="['title', 'sections.body']" -->
      <ais-autocomplete v-click-outside="onClickOutside">
        <div slot-scope="{ currentRefinement, indices, refine }">
          <input
            type="search"
            ref="searchInput"
            :placeholder="searchPlaceholder"
            class="w-full py-2 px-3"
            :value="currentRefinement"
            @input="refine($event.currentTarget.value)"
            autocomplete="off"
            @focus="showResults = true"
            @keydown.up.prevent="highlightPrevious"
            @keydown.down.prevent="highlightNext(indices[0].hits.length)"
            @keydown.enter="goToDoc(indices)"
          />

          <!-- results dropdown -->
          <div
            v-show="currentRefinement.length && showResults"
            class="absolute z-10 transform mt-3 px-2 max-w-md sm:px-0"
          >
            <div class="rounded-md shadow-lg overflow-hidden">
              <div
                class="relative grid gap-6 bg-light text-dark px-5 py-6 sm:gap-8 sm:p-8"
              >
                <div
                  v-if="currentRefinement"
                  v-for="section in indices"
                  :key="section.objectID"
                  class="divide-y divide-gray-200"
                >
                  <nuxt-link
                    :to="`/${hit.slug}/`"
                    v-for="(hit, index) in section.hits"
                    :key="hit.objectID"
                    class="block text-sm col-span-2 py-2 transition ease-in-out duration-150"
                    :class="{
                      'bg-light-light': isCurrentIndex(index)
                    }"
                  >
                    <div class="px-2" @mouseover="highlightedIndex = index">
                      <ais-highlight
                        attribute="title"
                        :hit="hit"
                        class="block text-dark font-medium"
                      />
                      <ais-snippet
                        attribute="seoDescription"
                        :hit="hit"
                        class="block text-green-900 font-base"
                      />
                    </div>
                  </nuxt-link>
                </div>
                <ais-powered-by class="px-2" />
              </div>
            </div>
          </div>
        </div>
      </ais-autocomplete>
    </ais-configure>
  </ais-instant-search>
</template>

<script>
import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "F9U95OH1S6",
  "3480906b9c18dc543bb25da7b19d41bc"
);

export default {
  data() {
    return {
      searchClient,
      showResults: false,
      highlightedIndex: -1
    };
  },
  head() {
    return {
      // link: [
      //   {
      //     rel: "stylesheet",
      //     href:
      //       "https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css"
      //   }
      // ]
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      window.addEventListener("keydown", event => {
        if (event.ctrlKey && event.key === "k") {
          this.$refs.searchInput.focus();
          event.preventDefault();
        }
      });
    });
  },
  watch: {
    $route() {
      this.showResults = false;
      this.$refs.searchInput.blur();
    }
  },
  computed: {
    searchPlaceholder() {
      if (navigator.appVersion.indexOf("Mac") !== -1) {
        return "Search - ⌘k to focus";
      } else if (navigator.appVersion.indexOf("Win") !== -1) {
        return "Search - CTRL + k to focus";
      } else {
        return "Search";
      }
    }
  },
  methods: {
    onClickOutside() {
      this.showResults = false;
    },
    highlightPrevious() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex -= 1;
      }
    },
    highlightNext(resultsCount) {
      if (this.highlightedIndex < resultsCount - 1) {
        this.highlightedIndex += 1;
      }
    },
    isCurrentIndex(index) {
      return index === this.highlightedIndex;
    },
    goToDoc(indices) {
      this.$nuxt.$router.push(indices[0].hits[this.highlightedIndex].objectID);
    }
  }
};
</script>

<style lang="scss" scoped>
.ais-Highlight-highlighted,
.ais-Snippet-highlighted {
  color: yellow;
}
</style>
