<template>
  <div>
    <!-- <component :is="'style'" v-if="siteHome.content.hero.image">
      .hero[data-id="12312321"] { background-image: url('{{
        $urlFor(siteHome.content.hero.image)
          .width(600)
          .height(400)
      }}')!important; } @media screen and (min-width: 640px) {
      .hero[data-id="12312321"] { background-image: url('{{
        $urlFor(siteHome.content.hero.image)
          .width(1200)
          .height(800)
      }}')!important; } } @media screen and (min-width: 1280px) {
      .hero[data-id="12312321"] { background-image: url('{{
        $urlFor(siteHome.content.hero.image)
          .width(1600)
          .height(1200)
      }}')!important; } }
    </component> -->

    <Hero2
      :title="siteHome.content.hero.title"
      :subtitle="siteHome.content.hero.subTitle"
      :buttonText="siteHome.content.hero.button.text"
      :buttonUrl="siteHome.content.hero.button.url"
      :image="siteHome.content.hero.image"
      :text="siteHome.content.hero.text"
    />

    <!-- <div class=" pt-24">
      <div
        class="hero relative bg-center bg-cover py-36 px-4"
        :id="12312321"
        :data-id="12312321"
      >
        <div class="container mx-auto">
          <div class="hero__content">
            <CardGeneric
              color="green"
              :title="siteHome.content.hero.title"
              :subtitle="siteHome.content.hero.subTitle"
              :buttonText="siteHome.content.hero.button.text"
              :buttonUrl="siteHome.content.hero.button.url"
              class="max-w-lg"
            >
              <div class="prose">
                <ul>
                  <li>Visit The Kid's Kingdom</li>
                  <li>Enjoy our thrilling midway rides and games</li>
                  <li>Dig into our famous food</li>
                  <li>Cool off at our Water Park</li>
                </ul>
              </div>
            </CardGeneric>

            
          </div>
        </div>
      </div>
    </div> -->
    <SectionsRenderer :sections="siteHome.content.sections" />
  </div>
</template>

<script>
const query = /* groq */ `{
  "siteHome": *[_type == 'siteHome'] {
          ...,
          content {
            ...,
            sections[] {
              ...,
              _type == "sponsorsSection" => {
                sponsorsList[]->{
                  ...
                }
              },
              _type == "faqSection" => {
                faqItems[]->{
                  ...
                }
              }
            }
          }
        }[0]
}
`;

export default {
  name: "siteHome",
  asyncData({ $sanity }) {
    const sanityCall = $sanity.fetch(query);
    // console.log("🎈 asyncData: called", sanityCall);
    return sanityCall;
  },

  computed: {
    seoTitle() {
      if (this.siteHome.content.seo && this.siteHome.content.seo.title)
        return this.siteHome.content.seo.title;
      return undefined;
    },
    seoDescription() {
      if (this.siteHome.content.seo && this.siteHome.content.seo.description)
        return this.siteHome.content.seo.description;
      return undefined;
    },
    seoImage() {
      return undefined;
    },
    seoPageUrl() {
      return `https://www.mydelgrossopark.com/`;
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
      link: [{ rel: "canonical", href: this.seoPageUrl }],
      __dangerouslyDisableSanitizersByTagID: {
        ogimage: ["content"]
      }
    };
  }
};
</script>
