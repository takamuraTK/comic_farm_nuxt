<template>
  <v-app-bar app clipped-left>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>ComicFarm</v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down ml-5">
      <v-btn to="/">Search</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down" v-if="idToken">
      <v-btn>userpage</v-btn>
      <v-btn @click="logout">ログアウト</v-btn>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-sm-and-down" v-else>
      <v-btn to="/users/login">ログイン</v-btn>
      <v-btn to="/users/register">新規登録</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("users", ["idToken"]),
  },
  methods: {
    ...mapActions("users", ["logout"]),
  },
};
</script>
