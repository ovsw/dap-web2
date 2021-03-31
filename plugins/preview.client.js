export default ({ query, enablePreview, store, $sanity }) => {
  if (query.preview) {
    // if (query.token && query.token != "") {
    //   $sanity.setToken(query.token)
    // }
    // console.log('preview mode enabled, token: ', query.token)
    enablePreview()
    console.log('preview mode enabled!')
    store.commit('showBanner')
  }
}
