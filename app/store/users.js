export const state = () => ({
  isLoggedIn: false,
  user: null,
})

export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user
}

export const mutations = {
  setUser(state, user) {
    state.user = user
    state.isLoggedIn = true
  }
}

export const actions = {
  async login({ commit }, formData) {
    await this.$authaxios.$post(
      "/accounts:signInWithPassword",
      {
        email: formData.email,
        password: formData.password,
        returnSecureToken: true,
      }
    ).then(response => {
      commit('setUser', {
        displayName: response.displayName,
        email: response.email,
        idToken: response.idToken
      })
    })
  },
  async logout({ commit }) {
    commit('setUser', {
      displayName: null,
      email: null,
      idToken: null
    })
  }
}
