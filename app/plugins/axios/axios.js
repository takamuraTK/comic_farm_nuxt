import Vue from 'vue'

export default ({ $axios }, inject) => {
  const bookaxiosConfig = {
    baseURL: "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404",
    params: {
      'applicationId': process.env.BOOKS_APP_ID,
      'format': "json"
    }
  }
  Vue.prototype.$bookaxios = $axios.create(bookaxiosConfig)

  const authaxiosConfig = {
    baseURL: "https://identitytoolkit.googleapis.com/v1",
    params: {
      'key': process.env.AUTH_API_KEY,
    }
  }
  inject('authaxios', $axios.create(authaxiosConfig))

  const secureaxiosConfig = {
    baseURL: "https://securetoken.googleapis.com/v1",
    params: {
      'key': process.env.AUTH_API_KEY,
    }
  }
  inject('secureaxios', $axios.create(secureaxiosConfig))
}
