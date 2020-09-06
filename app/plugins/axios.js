
export default function ({ $axios }) {
  $axios.onRequest((config) => {
    if (process.env.BOOKS_APP_ID) {
      config.params['applicationId'] = process.env.BOOKS_APP_ID
      config.params['format'] = "json"
    }
    return config
  })
}
