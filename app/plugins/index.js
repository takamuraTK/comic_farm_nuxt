import firebase from 'firebase'

export default async ({ app, store }) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit("users/setUser", user)
    }
  })
  // app.router.afterEach((to, from) => {
  //   let page_name
  //   page_name = to.name
  //   if (to.name == 'users-mypage') {
  //     store.dispatch('users/getUserData')
  //   }
  // })
}
