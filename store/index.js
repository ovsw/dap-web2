// Share the in-flight request across routes in one production generation run.
let generatedAlerts;

export const state = () => ({
  showDrafPreviewBanner: false,
  alertActive: false,
  alertItems: []
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
  setAlertItems(state, alertItems) {
    state.alertItems = alertItems;
  },
  hideAlert(state) {
    state.alertActive = false;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { $sanity }) {
    const cacheForGeneration = process.server && process.static && !process.dev;
    const query = /* groq */ `*[ _id == "siteSettings"].content.alertItems`;
    let request;

    if (cacheForGeneration) {
      if (!generatedAlerts) {
        generatedAlerts = $sanity.fetch(query).catch(error => {
          generatedAlerts = undefined;
          throw error;
        });
      }
      request = generatedAlerts;
    } else {
      request = $sanity.fetch(query);
    }

    const result = await request;
    // Each page store owns its data; do not share mutable alert objects.
    const alertItems = JSON.parse(JSON.stringify(result[0] || []));
    commit("setAlertItems", alertItems);
    commit("setAlertActive", alertItems.some(item => item.alertIsActive));
  }
};
