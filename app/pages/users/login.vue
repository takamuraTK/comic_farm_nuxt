<template>
  <v-container>
    <h2>ログイン</h2>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="formData.email" :rules="[required, emailRule]" label="メールアドレス"></v-text-field>
      <v-text-field v-model="formData.password" :rules="[required, passwordRule]" label="パスワード" type="password"></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mt-4" @click="handleClickSubmit">ログイン</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleClickSubmit() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch("users/login", { ...this.formData });
        this.$router.push("/");
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
