import firebase from '~/plugins/firebase'
const db = firebase.firestore();
const favoriteCol = db.collection('favorites')

export const state = () => ({
  favorites: [],
})

export const actions = {
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
