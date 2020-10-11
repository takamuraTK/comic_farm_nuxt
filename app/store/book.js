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
      publisherName: book.publisherName,
      seriesName: book.seriesName,
      largeImageUrl: book.largeImageUrl.split('?_ex')[0],
      salesDate: book.salesDate,
      itemPrice: book.itemPrice,
      itemUrl: book.itemUrl,
      isbn: book.isbn
    })
  },
  addFavorite({ }, book) {
    const uid = firebase.auth().currentUser.uid
    const batch = db.batch()
    const booksRef = db.collection('books').doc(book.isbn)
    const booksFavoritesRef = booksRef.collection('favoriteUsers').doc(uid)
    const usersRef = db.collection('users').doc(uid)
    const usersFavoritesRef = usersRef.collection('favoriteBooks').doc(book.isbn)

    booksRef.get().then(function (doc) {
      if (!doc.exists) {
        booksRef.set({
          title: book.title,
          author: book.author,
          publisherName: book.publisherName,
          seriesName: book.seriesName,
          largeImageUrl: book.largeImageUrl.split('?_ex')[0],
          salesDate: book.salesDate,
          itemPrice: book.itemPrice,
          itemUrl: book.itemUrl,
          isbn: book.isbn
        })
      }
    })
    batch.set(booksFavoritesRef, {
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    })
    batch.set(usersFavoritesRef, {
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      bookRef: booksRef
    })
    batch.commit()
  },
  removeFavorite({ }, book) {
    const uid = firebase.auth().currentUser.uid
    const batch = db.batch()
    const booksRef = db.collection('books').doc(book.isbn)
    const booksFavoritesRef = booksRef.collection('favoriteUsers').doc(uid)
    const usersRef = db.collection('users').doc(uid)
    const usersFavoritesRef = usersRef.collection('favoriteBooks').doc(book.isbn)
    batch.delete(booksFavoritesRef)
    batch.delete(usersFavoritesRef)
    batch.commit()
  }
}
