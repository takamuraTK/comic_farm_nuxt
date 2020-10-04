import firebase from '~/plugins/firebase'

export const state = () => ({
  isLoggedIn: false,
  email: null,
  displayName: null,
})

export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  email: (state) => state.email,
  displayName: (state) => state.displayName
}

export const mutations = {
  setUser(state, user) {
    state.email = user.email
    state.displayName = user.displayName
    state.isLoggedIn = true
  },
  removeUser(state) {
    state.email = null
    state.displayName = null
    state.isLoggedIn = false
  }
}

export const actions = {
  login({ commit }, { email, password }) {
    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
      commit("setUser", result.user)
    })
  },
  logout({ commit }) {
    firebase.auth().signOut()
    commit("removeUser")
  },
}
