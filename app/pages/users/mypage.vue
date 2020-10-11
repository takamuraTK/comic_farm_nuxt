<template>
  <div>
    <p>{{ displayName }}</p>
    <p>{{ email }}</p>
    <p>{{ uid }}</p>
    <v-container>
      <v-btn @click="getFavorites">
        <v-icon left color="lime"> mdi-star </v-icon>お気に入りに登録した漫画
      </v-btn>
      <v-btn @click="getReads">
        <v-icon left color="teal"> mdi-book-open-variant </v-icon>読んだことのある漫画
      </v-btn>
      <v-layout v-if="favorites" wrap justify-space-around>
        <v-col v-for="book in favorites" :key="book.isbn">
          <BookCard :book="book"></BookCard>
        </v-col>
      </v-layout>
      <v-layout v-if="reads" wrap justify-space-around>
        <v-col v-for="book in reads" :key="book.isbn">
          <BookCard :book="book"></BookCard>
        </v-col>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
const db = firebase.firestore();
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      favorites: [],
      reads: [],
      isPushFavoriteBtn: false,
      isPushReadBtn: false
    };
  },
  computed: {
    ...mapGetters({
      displayName: "users/displayName",
      email: "users/email",
      uid: "users/uid",
    }),
  },
  methods: {
    async getFavorites() {
      if (this.isPushFavoriteBtn) {
        return;
      }
      this.reads = []
      this.isPushReadBtn = false
      const usersRef = await db.collection("users").doc(this.uid);
      const usersFavoritesRef = await usersRef
        .collection("favoriteBooks")
        .get();
      const favoriteIds = usersFavoritesRef.docs.map(
        (favoriteDoc) => favoriteDoc.id
      );
      favoriteIds.forEach(async (favoriteId) => {
        db.collection("books")
          .doc(favoriteId)
          .get()
          .then((book) => {
            this.favorites.push(book.data());
          });
      });
      this.isPushFavoriteBtn = true;
    },
    async getReads() {
      if (this.isPushReadBtn) {
        return;
      }
      this.favorites = []
      this.isPushFavoriteBtn = false
      const usersRef = await db.collection("users").doc(this.uid)
      const usersReadsRef = await usersRef.collection("readBooks").get();
      const readIds = usersReadsRef.docs.map(
        (readDoc) => readDoc.id
      );
      readIds.forEach(async (readId) => {
        db.collection("books").doc(readId).get().then((book) => {
          this.reads.push(book.data());
        });
      });
      this.isPushReadBtn = true
    }
  },
};
</script>
