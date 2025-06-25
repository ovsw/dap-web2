import externalLink from "@/components/serializers/externalLink";
import iframe from "@/components/serializers/iframe";
import block from "@/components/serializers/block";

// Centralized Sanity serializers configuration
// Fixes portable text rendering issues where blocks without 'style' property
// don't render as separate paragraphs
export const defaultSerializers = {
  marks: {
    link: externalLink
  },
  types: {
    iframeEmbed: iframe,
    link: externalLink,
    block: block
  }
};