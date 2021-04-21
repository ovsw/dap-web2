import Vue from "vue";

Vue.filter("formatDate", value => {
  const date = new Date(value);
  return date.toLocaleString(["en-US"], {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
});

Vue.filter("formatDateShort", value => {
  const date = new Date(value);
  return date.toLocaleString(["en-US"], {
    month: "short",
    day: "2-digit"
  });
});

Vue.filter("slugify", value => {
  return value
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
});
