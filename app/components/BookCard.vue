<template>
  <v-card outlined width="190px">
    <v-hover v-slot:default="{ hover }">
      <v-img class="white--text align-end" height="300px" :src="book.largeImageUrl">
        <transition name="fade">
          <div :class="{ 'img-on-hover': hover }" v-show="hover">
            <v-card-subtitle v-text="book.publisherName" class="pb-0"></v-card-subtitle>
            <v-card-title v-text="book.title"></v-card-title>
          </div>
        </transition>
      </v-img>
    </v-hover>

    <v-card-actions>
      <div class="container btn-area">
        <v-btn @click="removeRead(book)" icon color="teal" v-if="isread">
          <v-icon>mdi-book-open-variant</v-icon>
        </v-btn>
        <v-btn @click="addRead(book)" icon color="grey" v-else>
          <v-icon>mdi-book-open-variant</v-icon>
        </v-btn>
        <v-btn @click="removeFavorite(book)" icon color="lime" v-if="isfavorite">
          <v-icon>mdi-star</v-icon>
        </v-btn>
        <v-btn @click="addFavorite(book)" icon color="grey" v-else>
          <v-icon>mdi-star</v-icon>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "~/plugins/firebase";
const db = firebase.firestore();
export default {
  props: ["book"],
  data() {
    return {
      isfavorite: false,
      isread: false
    };
  },
  async created() {
    const uid = firebase.auth().currentUser.uid;
    const booksRef = await db.collection("books").doc(this.book.isbn);
    const favoritesDoc = await booksRef
      .collection("favoriteUsers")
      .doc(uid)
      .get();
    const readDoc = await booksRef.collection("readUsers").doc(uid).get();
    this.isfavorite = favoritesDoc.exists;
    this.isread = readDoc.exists;
  },
  methods: {
    addFavorite(book) {
      this.$store.dispatch("book/addBook", book);
      this.$store.dispatch("book/addFavorite", book);
      this.isfavorite = true;
    },
    removeFavorite(book) {
      this.$store.dispatch("book/removeFavorite", book);
      this.isfavorite = false;
    },
    addRead(book) {
      this.$store.dispatch("book/addBook", book);
      this.$store.dispatch("book/addRead", book);
      this.isread = true;
    },
    removeRead(book) {
      this.$store.dispatch("book/removeRead", book);
      this.isread = false;
    }
  },
};
</script>

<style scoped>
.img-on-hover {
  background: rgba(0, 0, 0, 0.7);
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s;
}
.fade-enter-to {
  opacity: 1;
}

.container .btn-area {
  padding: 0;
  display: flex;
  justify-content: space-around;
}
</style>
