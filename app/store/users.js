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
  },
  setIdToken(state, token) {
    state.idToken = token
  }
}

export const actions = {
  async login({ commit, dispatch }, formData) {
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
      })
      commit('setIdToken', {
        idToken: response.idToken
      })
      setTimeout(() => {
        dispatch('refreshIdToken', response.refreshToken)
      }, response.expiresIn * 1000)
    })
  },
  async refreshIdToken({ commit, dispatch }, refreshToken) {
    this.$secureaxios.$post("/token", {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }).then(response => {
      commit('setIdToken', response.id_token)
      setTimeout(() => {
        dispatch('refreshIdToken', response.refresh_token)
      }, response.expires_in * 1000)
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
