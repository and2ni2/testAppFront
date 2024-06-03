<template>
  <div class="request_page container">


  </div>
</template>

<script setup>
import api from '../../api.js';
import { useUserStore } from "../../store/userStore";
import { useToast } from "vue-toastification";
import { onMounted, ref } from 'vue';

import router from "../../router";
const toast = useToast();
const userStore = useUserStore();

onMounted(() => {

});

const storeData = ref({

})


</script>

