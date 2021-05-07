<template>
  <div>
    <PageHeader
      :title="allergensPage.content.title"
      :image="allergensPage.content.mainImage"
      :narrow="false"
    />

    <SectionsRenderer :sections="allergensPage.content.sections" />
    <section class="faqSection  px-grd my-grd 2xl:px-0">
      <div class="[ wrapper 2xl:px-grd ]">
        <div class="[ pannel border-4 border-green p-10 md:p-20 bg-light ]">
          <div class="max-w-5xl mx-auto md:py-10 lg:py-20">
            <h2 class="menuSection__heading mb-10 ">
              Food Allergens Listing
            </h2>

            <div
              v-for="(foodPlace, index) in allergensPage.content
                .allergenLocations"
              :key="index"
              class="prose prose-xl max-w-5xl"
            >
              <h3>{{ foodPlace.locationTitle }}</h3>
              <ul>
                <li
                  v-for="(dish, index) in foodPlace.allergenList"
                  :key="index"
                >
                  <strong class="">{{ dish.name }}</strong>
                  <span v-if="allergenListing(dish.allergenList) == 'none'">
                    <span class="pill bg-green text-light-light"
                      >no allergens</span
                    ></span
                  >
                  <span v-else>
                    {{ allergenListing(dish.allergenList) }}
                  </span>
                  <span
                    class="space-x-2"
                    v-if="specialConditions(dish.allergenList).length > 0"
                  >
                    <span
                      v-for="(item, index) in specialConditions(
                        dish.allergenList
                      )"
                      :key="index"
                      v-html="item"
                    >
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const query = /* groq */ `{
  "allergensPage": *[_type == 'allergensPage'] {
    ...
  }[0]
}
`;

export default {
  name: "allergensPage",
  asyncData({ $sanity }) {
    const sanityCall = $sanity.fetch(query);
    // console.log("🎈 asyncData: called", sanityCall);
    return sanityCall;
  },
  methods: {
    specialConditions(allergensArray = []) {
      const specialConditions = allergensArray.filter(string =>
        string.includes("*")
      );
      const out = specialConditions.map(item => {
        if (item === "* Grilled") {
          return `<span class="pill inline-block bg-red text-light-light">${item}</span>`;
        } else if (item === "** Fried") {
          return `<span class="pill inline-block bg-yellow">${item}</span>`;
        } else if (item === "*** Can Be Adapted") {
          return `<span class="pill inline-block bg-blue text-light-light">${item}</span>`;
        } else if (item === "**** Manufactured") {
          return `<span class="pill inline-block bg-cyan text-light-light">**** Allergen Traces from manufacturing</span>`;
        }
        return item;
      });
      return out;
    },
    allergenListing(allergensArray = []) {
      const allergenNamesArray = allergensArray.filter(
        string => !string.includes("*")
      );
      return allergenNamesArray.length > 0
        ? `contains: ${allergenNamesArray.join(", ")}`
        : `none`;
    }
  },

  computed: {
    seoTitle() {
      if (
        this.allergensPage.content.seo &&
        this.allergensPage.content.seo.title
      )
        return this.allergensPage.content.seo.title;
      return undefined;
    },
    seoDescription() {
      if (
        this.allergensPage.content.seo &&
        this.allergensPage.content.seo.description
      )
        return this.allergensPage.content.seo.description;
      return undefined;
    },
    seoImage() {
      return undefined;
    },
    seoPageUrl() {
      return `https://www.mydelgrossopark.com/${this.allergensPage.content.slug.current}/`;
    },
    seoShareImage() {
      return undefined;
    }
  },

  head() {
    return {
      title: this.seoTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seoDescription
        },
        {
          hid: "ogtitle",
          name: "og:title",
          content: this.seoTitle
        },
        {
          hid: "ogdescription",
          name: "og:description",
          content: this.seoDescription
        },
        {
          hid: "ogimage",
          name: "og:image",
          content: this.seoShareImage
        },
        {
          hid: "ogurl",
          name: "og:url",
          content: this.seoPageUrl
        }
      ],
      link: [{ rel: "cannonical", href: this.seoPageUrl }],
      __dangerouslyDisableSanitizersByTagID: {
        ogimage: ["content"]
      }
    };
  }
};
</script>
