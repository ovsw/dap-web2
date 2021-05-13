export const state = () => ({
  showDrafPreviewBanner: false,
  alertText: [],
  alertActive: false,
  newsSlugs: [],
  pagesSlugs: [],
  ridesSlugs: [],
  waterAttractionsSlugs: [],
  eventsSlugs: []
});

export const mutations = {
  showBanner(state) {
    state.showDrafPreviewBanner = true;
  },
  setAlertText(state, alertText) {
    state.alertText = alertText;
  },
  setAlertActive(state, alertActive) {
    state.alertActive = alertActive;
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
  },
  setEventsSlugs(state, slugs) {
    state.eventsSlugs = slugs;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { $sanity }) {
    // alert state
    const alertText = await $sanity
      .fetch(/* groq */ `*[ _id == "siteSettings"].content.alertMessage[0]`)
      .catch(e => console.error(e));
    commit("setAlertText", alertText);

    const alertActive = await $sanity
      .fetch(/* groq */ `*[ _id == "siteSettings"].content.alertIsActive[0]`)
      .catch(e => console.error(e));
    commit("setAlertActive", alertActive);

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

    const eventsSlugs = await $sanity
      .fetch('*[ _type == "event"].content.slug.current')
      .catch(e => console.error(e));
    // console.log(ridesSlugs);
    commit("setEventsSlugs", eventsSlugs);
  }
};
