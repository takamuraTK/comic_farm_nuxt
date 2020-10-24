<template>
  <v-container>
    <h2>新規登録</h2>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="email" :rules="[required, emailRule]" label="メールアドレス"></v-text-field>
      <v-text-field v-model="username" :rules="[required]" label="ユーザー名"></v-text-field>
      <v-text-field v-model="password" :rules="[required, passwordRule]" label="パスワード" type="password"></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mt-4" @click="register">登録</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        this.$firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
      }
    },
    required: (value) => !!value || "必ず入力してください",
    emailRule: (value) =>
      /.+@.+\..+/.test(value) || "正しいメールアドレスを入力してください",
    passwordRule: (value) =>
      value.length >= 6 || "パスワードは6字以上で入力してください",
  },
};
</script>
