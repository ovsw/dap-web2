<template>
  <div>
    <component
      v-for="section in sections"
      :is="getComponentFromSectionType(section._type)"
      :key="section._key"
      :section="section"
    />
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    // TODO: embedsection
    getComponentFromSectionType(sectionType) {
      if (sectionType == "magSection") {
        return "SectionsMagazine";
      } else if (sectionType == "faqSection") {
        return "SectionsFaq";
      } else if (sectionType == "ctaSection") {
        return "SectionsCta";
      } else if (sectionType == "bigHeading") {
        return "SectionsBigHeading";
      } else if (sectionType == "tableSection") {
        return "SectionsTable";
      } else if (sectionType == "reusedSection") {
        return "SectionsReused";
      } else if (sectionType == "cardSection") {
        return "SectionsCards";
      } else if (sectionType == "sponsorsSection") {
        return "SectionsSponsors";
      } else if (sectionType == "menuSection") {
        return "SectionsMenu";
      } else if (sectionType == "rteSection") {
        return "SectionsRte";
      } else if (sectionType == "embedSection") {
        return "SectionsEmbed";
      } else if (sectionType == "fileSection") {
        return "SectionsFile";
      }
      return "SectionsDefault";
    }
  }
};
</script>

<style lang="scss" scoped></style>
