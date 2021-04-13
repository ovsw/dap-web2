<template>
  <section class="tableSection">
    <div class="[ wrapper ]">
      <div role="region" :aria-labelledby="section._key" tabindex="0">
        <table
          class="border-collapse border border-green-800 table-fixed  w-full"
        >
          <caption
            :id="section._key"
            class="border p-4 text-lg font-semibold bg-green-dark text-light tracking-wide"
          >
            {{
              section.title
            }}
          </caption>

          <thead>
            <tr>
              <th
                class="first:w-2/12 p-6 bg-green text-light"
                v-for="cell in section.sectionTable.rows[0].cells"
                :key="cell"
              >
                {{ cell }}
              </th>
            </tr>
          </thead>

          <tbody>
            <template v-for="(row, index) in section.sectionTable.rows">
              <tr v-if="index != 0" :key="index" class=" even:bg-gray-100">
                <td
                  v-for="cell in row.cells"
                  :key="cell"
                  :inner-html.prop="cell"
                  class="p-6 text-center"
                >
                  <!-- {{ cell | sanitizedToHtml }} -->
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
