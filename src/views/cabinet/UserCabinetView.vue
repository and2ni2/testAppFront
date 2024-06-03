<template>
  <div class="user_page container">



  </div>
</template>

<script setup>
import api from '../api.js';
import { useUserStore } from "../store/userStore";
import { useToast } from "vue-toastification";
import { onMounted, ref } from 'vue';
import {
  Input,
  Ripple,
  initTWE,
} from "tw-elements";
import router from "../router";
const toast = useToast();
const userStore = useUserStore();

onMounted(() => {
  initTWE({ Input, Ripple });
});

const storeData = ref({

})


</script>

