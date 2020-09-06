<template>
  <v-container>
    <h2>新規登録</h2>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="email" :rules="[required, emailRules]" label="メールアドレス"></v-text-field>
      <v-text-field v-model="username" :rules="[required, usernameRules]" label="ユーザー名"></v-text-field>
      <v-text-field v-model="password" :rules="[required, passwordRules]" label="パスワード"></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="register">登録</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  methods: {
    async register() {},
    required: (value) => !!value || "必ず入力してください",
  },
};
</script>
