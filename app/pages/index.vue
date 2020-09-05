<template>
  <v-container>
    <v-layout wrap justify-space-around>
      <v-col v-for="book in books.Items" :key="book.isbn">
        <v-card outlined>
          <v-img class="white--text align-end" height="300px" :src="book.Item.largeImageUrl"></v-img>
          <v-card-subtitle v-text="book.Item.publisherName" class="pb-0"></v-card-subtitle>
          <v-card-title v-text="book.Item.title"></v-card-title>

          <v-card-actions>
            <v-btn color="orange" text>Have</v-btn>
            <v-btn color="orange" text>Favorite</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  async asyncData({ app }) {
    const books = await app.$axios.$get("/", {
      params: {
        format: "json",
        title: "Dr.STONE",
        booksGenreId: "001001",
      },
    });
    console.log(app.$axios);
    return {
      books,
    };
  },
};
</script>
