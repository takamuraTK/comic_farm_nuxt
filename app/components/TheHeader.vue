<template>
  <v-app-bar app clipped-left>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>ComicFarm</v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down ml-5">
      <v-btn to="/">Search</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-if="user">{{ user.displayName }}</v-btn>
      <v-btn @click="logout" v-if="user">ログアウト</v-btn>
      <v-btn to="/users/login" v-if="!user">ログイン</v-btn>
      <v-btn to="/users/register" v-if="!user">新規登録</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("users", ["user"]),
  },
  methods: {
    ...mapActions("users", ["logout"]),
  },
};
</script>
