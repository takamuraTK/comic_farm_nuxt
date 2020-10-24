<template>
  <v-footer padless class="font-weight-medium">
      <v-row justify="center" no-gutters>
      <v-btn text rounded class="my-2" to="/"><v-icon class="mr-2">mdi-home</v-icon>Home</v-btn>
      <v-btn text rounded class="my-2" to="#"><v-icon class="mr-2">mdi-twitter</v-icon>Twitter</v-btn>
      <v-btn text rounded class="my-2" to="#"><v-icon class="mr-2">mdi-account-voice</v-icon>Contact us</v-btn>
      <v-col class="py-4 text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>ComicFarm</strong>
      </v-col>
    </v-row>
    </v-footer>
</template>
