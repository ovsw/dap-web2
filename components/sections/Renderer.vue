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
      default: []
    }
  },
  methods: {
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
      }else if (sectionType == "reusedSection") {
        return "SectionsReused";
      }
      return "SectionsDefault";
    }
  }
};
</script>

<style lang="scss" scoped></style>
