export let axios;

export default ({ $axios }) => {

  $axios.defaults.baseURL = "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404"

  $axios.onRequest(config => {
    config.params['applicationId'] = process.env.BOOKS_APP_ID
    config.params['format'] = "json"
  });

  $axios.onResponse(response => {
    return Promise.resolve(response);
  })

  $axios.onError(error => {
    return Promise.reject(error.response);
  });

  axios = $axios;
}
