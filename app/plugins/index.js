import firebase from 'firebase'

// ログアウト時でもログイン画面に強制遷移されないページ一覧の配列
const ignorePath = [
  "/users/register",
]

export default ({ app, store, route }) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit("users/setUser", user)
    } else {
      if (ignorePath.includes(route.path)) return
      app.router.push('/users/login')
    }
  })
}
