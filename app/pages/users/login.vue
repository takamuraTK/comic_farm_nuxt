<template>
  <v-container>
    <h2>ログイン</h2>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="email" :rules="emailRules" label="メールアドレス" required></v-text-field>
      <v-text-field v-model="password" :rules="passwordRules" label="パスワード" required></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">ログイン</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  methods: {
    async login() {},
  },
};
</script>
