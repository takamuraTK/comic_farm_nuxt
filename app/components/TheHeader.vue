<template>
  <v-app-bar app clipped-left>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>ComicFarm</v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down ml-5">
      <v-btn to="/">Search</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down" v-if="isLoggedIn">
      <v-btn to="/users/mypage">mypage</v-btn>
      <v-btn @click="logout">ログアウト</v-btn>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-sm-and-down" v-else>
      <v-btn to="/users/login">ログイン</v-btn>
      <v-btn to="/users/register">新規登録</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      isLoggedIn: "users/isLoggedIn",
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch("users/logout");
      this.$router.push("/users/login");
    },
  },
};
</script>
