<template>
  <v-container>
    <v-form>
      <v-text-field label="タイトル" v-model="formData.title" autocomplete="off"></v-text-field>
      <v-btn @click="getBooks">submit</v-btn>
    </v-form>
    <v-layout wrap justify-space-around>
      <v-col v-for="book in books" :key="book.isbn">
        <v-card outlined>
          <v-hover v-slot:default="{ hover }">
            <v-img class="white--text align-end" height="300px" :src="book.Item.largeImageUrl">
              <transition name="fade">
                <div :class="{ 'img-on-hover': hover }" v-show="hover">
                  <v-card-subtitle v-text="book.Item.publisherName" class="pb-0"></v-card-subtitle>
                  <v-card-title v-text="book.Item.title"></v-card-title>
                </div>
              </transition>
            </v-img>
          </v-hover>

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
  data() {
    return {
      books: {},
      formData: {
        title: "",
      },
    };
  },
  methods: {
    async getBooks() {
      const books = await this.$axios.$get("/", {
        params: {
          title: this.formData.title,
          booksGenreId: "001001",
        },
      });
      this.books = books.Items;
    },
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
</style>
