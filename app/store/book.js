import firebase from '~/plugins/firebase'
const db = firebase.firestore();
const favoriteCol = db.collection('favorites')

export const state = () => ({
  favorites: [],
})

export const actions = {
  addBook({ }, book) {
    const booksRef = db.collection('books').doc(book.isbn)

    booksRef.set({
      title: book.title,
      author: book.author,
      publisher: book.publisherName,
      series: book.seriesName,
      image: book.largeImageUrl.split('?_ex')[0],
      sales_date: book.salesDate,
      price: book.itemPrice,
      rakuten_url: book.itemUrl,
    })
  },
  addFavorite({ }, book) {
    const uid = firebase.auth().currentUser.uid
    const booksRef = db.collection('books').doc(book.isbn)
    const favoritesRef = booksRef.collection('favorites').doc(uid)

    booksRef.get().then(function (doc) {
      if (!doc.exists) {
        booksRef.set({
          title: book.title,
          author: book.author,
          publisher: book.publisherName,
          series: book.seriesName,
          image: book.largeImageUrl.split('?_ex')[0],
          sales_date: book.salesDate,
          price: book.itemPrice,
          rakuten_url: book.itemUrl,
        })
      }
      favoritesRef.set({
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      })
    })
  }
}
