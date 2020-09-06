import { axios } from '../book.js';

export default {
  getBooks(title) {
    return axios.$get('', {
      params: {
        title: title,
        booksGenreId: "001001",
      }
    })
  },
}
