<template>
  <div class="home">
    <LoginView/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginView from '@/components/LoginView.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    LoginView,
  },
});
</script>
