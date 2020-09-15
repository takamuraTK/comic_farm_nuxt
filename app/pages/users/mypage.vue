<template>
  <div>
    <p>{{displayName}}</p>
    <p>{{email}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      displayName: "users/displayName",
      email: "users/email",
    }),
  },
};
</script>
