export default function ({ $axios }) {
  $axios.onRequest((config) => {
    console.log(config)
    console.log(process.env.BOOKS_APP_ID)
    if (process.env.BOOKS_APP_ID) {
      config.params['applicationId'] = process.env.BOOKS_APP_ID
    }
    return config
  })
}
