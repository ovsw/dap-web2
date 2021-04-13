<template>
  <article>
    <h1>{{ page.content.title }}</h1>

    <component
      v-for="(section, index) in page.content.sections"
      :is="getComponentFromSectionType(section._type)"
      :key="index"
      :section="section"
    />
  </article>
</template>

<script>
import externalLink from "@/components/serializers/externalLink";

const query = /* groq */ `{ "page": *[_type == 'page' && content.slug.current == $slug] | order(_updatedAt desc)[0]}`;

export default {
  name: "Page",

  validate({ params, store, query }) {
    // console.log('params:', params)
    // If FALSE redirect to 404 page
    return (
      query.preview === "true" || store.state.pagesSlugs.includes(params.page)
    );
  },

  asyncData({ $sanity, params, payload }) {
    if (payload) {
      return { page: payload };
    }
    return $sanity.fetch(query, {
      slug: params.page
    });
  },

  data() {
    return {
      serializers: {
        marks: {
          link: externalLink
        }
      }
    };
  },

  methods: {
    getComponentFromSectionType(sectionType) {
      if (sectionType == "magSection") {
        return "SectionsMagazine";
      } else if (sectionType == "faqSection") {
        return "SectionsFaqSection";
      } else if (sectionType == "ctaSection") {
        return "SectionsCtaSection";
      } else if (sectionType == "bigHeading") {
        return "SectionsBigHeading";
      }
      return "SectionsDefault";
    }
  }
};
</script>
