export const state = () => ({
  idToken: null,
})

export const mutations = {
  updateIdToken(state, idToken) {
    state.idToken = idToken
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
      console.log(response)
      commit('updateIdToken', response.idToken)
    })
  },
}
