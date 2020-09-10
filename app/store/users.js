export const state = () => ({
  idToken: null
})

export const getters = {
  idToken: (state) => state.idToken
}

export const mutations = {
  setIdToken(state, token) {
    state.idToken = token
  }
}

export const actions = {
  // ブラウザを再読み込みしたときにログインを維持するための関数
  async autoLogin({ commit, dispatch }) {
    const idToken = localStorage.getItem('idToken')
    if (!idToken) return
    const now = new Date()
    const expiryTimeMs = localStorage.getItem('expiryTimeMs')
    const isExpired = now.getTime() >= expiryTimeMs
    const refreshToken = localStorage.getItem('refreshToken')
    if (isExpired) {
      dispatch('refreshIdToken', refreshToken)
    } else {
      // expiresInMs: Tokenが無効になるまでの時間
      const expiresInMs = expiryTimeMs - now.getTime()
      setTimeout(() => {
        dispatch('refreshIdToken', refreshToken)
      }, expiresInMs)
      commit('setIdToken', idToken)
    }
  },
  async login({ dispatch }, formData) {
    await this.$authaxios.$post(
      "/accounts:signInWithPassword",
      {
        email: formData.email,
        password: formData.password,
        returnSecureToken: true,
      }
    ).then(response => {
      dispatch('setAuthData', {
        idToken: response.idToken,
        expiresIn: response.expiresIn,
        refresh: response.refreshToken
      })
    })
  },
  async refreshIdToken({ dispatch }, refreshToken) {
    this.$secureaxios.$post("/token", {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }).then(response => {
      dispatch('setAuthData', {
        idToken: response.id_token,
        expiresIn: response.expires_in,
        refresh: response.refresh_token
      })
    })
  },
  async logout({ commit }) {
    commit('setIdToken', null)
    localStorage.removeItem('idToken')
    localStorage.removeItem('expiryTimeMs')
    localStorage.removeItem('refreshToken')
  },
  async setAuthData({ commit, dispatch }, authData) {
    const now = new Date()
    // expiryTimeMs: Tokenの有効期限が切れる時間
    const expiryTimeMs = now.getTime() + authData.expiresIn * 1000
    commit('setIdToken', {
      idToken: authData.idToken
    })
    localStorage.setItem('idToken', authData.idToken)
    localStorage.setItem('expiryTimeMs', expiryTimeMs)
    localStorage.setItem('refreshToken', authData.refreshToken)
    setTimeout(() => {
      dispatch('refreshIdToken', authData.refreshToken)
    }, authData.expiresIn * 1000)
  }
}
