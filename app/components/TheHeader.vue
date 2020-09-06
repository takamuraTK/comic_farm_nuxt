<template>
  <v-app-bar app clipped-left>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>ComicFarm</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn to="/users/login">ログイン</v-btn>
      <v-btn to="/users/register">新規登録</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>
