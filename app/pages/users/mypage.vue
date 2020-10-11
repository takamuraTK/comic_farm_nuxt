<template>
  <div>
    <p>{{ displayName }}</p>
    <p>{{ email }}</p>
    <p>{{ uid }}</p>
    <v-container>
      <v-btn @click="getFavorites">
        <v-icon left color="lime"> mdi-star </v-icon>お気に入りに登録した漫画
      </v-btn>
      <v-layout v-if="favorites" wrap justify-space-around>
        <v-col v-for="book in favorites" :key="book.isbn">
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
      isPushFavoriteBtn: false,
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
  },
};
</script>
