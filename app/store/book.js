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
  addFavorite({ }, { isbn }) {
    // favoritesコレクションが存在している前提で動くので注意
    const uid = firebase.auth().currentUser.uid
    const userDoc = favoriteCol.doc(uid)

    userDoc.get().then(function (doc) {
      if (doc.exists) {
        favoriteCol.doc(uid).update({
          isbns: firebase.firestore.FieldValue.arrayUnion(isbn)
        })
      } else {
        favoriteCol.doc(uid).set({
          isbns: firebase.firestore.FieldValue.arrayUnion(isbn)
        })
      }
    }).catch(function (error) {
      // console.log("Error getting document:", error);
      console.log("Error")
    });
  }
}
