<template>
  <v-container>
    <v-text-field label="タイトル" @keyup.enter="getBooks" v-model="formData.title" autocomplete="off"></v-text-field>
    <v-alert type="warning" v-if="errorMessage">{{ errorMessage }}</v-alert>
    <span></span>
    <v-layout v-if="success" wrap justify-space-around>
      <v-col v-for="book in books" :key="book.isbn">
        <BookCard :book="book.Item"></BookCard>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      books: {},
      formData: {
        title: "",
      },
      success: false,
      errorMessage: "",
    };
  },
  methods: {
    async getBooks() {
      if (!this.formData.title) {
        this.success = false;
        this.errorMessage = "タイトルを入力してください。";
      } else {
        const books = await this.$bookaxios.$get("/", {
          params: {
            title: this.formData.title,
            booksGenreId: "001001",
          },
        });
        this.errorMessage = "";
        this.books = books.Items;
        this.success = true;
      }
    },
  },
};
</script>
