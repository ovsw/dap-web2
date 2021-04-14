<template>
  <div>
    <client-only>
      <button
        class="refreshPreview"
        v-if="$store.state.showDrafPreviewBanner"
        @click="$nuxt.refresh()"
      >
        Draft Preview. Click here to refresh
      </button>
    </client-only>
    <div class="site-wrap">
      <SiteHeader />
      <Nuxt />
      <SiteFooter />
    </div>
  </div>
</template>

<style>
:focus {
  outline: 2px dashed #2d8262 !important;
  outline-offset: 0.5em !important;
}
</style>
