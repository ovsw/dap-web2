export const state = () => ({
  showDrafPreviewBanner: false,
  newsSlugs: [],
  pagesSlugs: [],
  ridesSlugs: [],
  waterAttractionsSlugs: []
});

export const mutations = {
  showBanner(state) {
    state.showDrafPreviewBanner = true;
  },
  setNewsSlugs(state, slugs) {
    state.newsSlugs = slugs;
  },
  setPagesSlugs(state, slugs) {
    state.pagesSlugs = slugs;
  },
  setRidesSlugs(state, slugs) {
    state.ridesSlugs = slugs;
  },
  setWaterParkAttractionSlugs(state, slugs) {
    state.waterAttractionsSlugs = slugs;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { $sanity }) {
    const newsSlugs = await $sanity
      .fetch('*[_type == "newsItem"].content.slug.current')
      .catch(e => console.error(e));
    commit("setNewsSlugs", newsSlugs);

    const pagesSlugs = await $sanity
      .fetch('*[_type == "page" || _type == "simplePage"].content.slug.current')
      .catch(e => console.error(e));
    //console.log('pagesSlugs')
    commit("setPagesSlugs", pagesSlugs);

    const ridesSlugs = await $sanity
      .fetch(
        '*[ _type == "attraction" && content.category match "Amusement"].content.slug.current'
      )
      .catch(e => console.error(e));
    // console.log(ridesSlugs);
    commit("setRidesSlugs", ridesSlugs);

    const waterParkAttractionSlugs = await $sanity
      .fetch(
        '*[ _type == "attraction" && content.category match "Water"].content.slug.current'
      )
      .catch(e => console.error(e));
    // console.log(ridesSlugs);
    commit("setWaterParkAttractionSlugs", waterParkAttractionSlugs);
  }
};
