import Vue from 'vue'

export default ({ $axios }) => {
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
  Vue.prototype.$authaxios = $axios.create(authaxiosConfig)
}
