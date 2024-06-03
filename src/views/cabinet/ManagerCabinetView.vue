<template>
  <div class="manager_page">

    <dashboard-layout>

      Manager template components will be here

    </dashboard-layout>

  </div>
</template>

<script setup>
import api from '../../api.js'
import { useUserStore } from "../../store/userStore";
import { useToast } from "vue-toastification";
import { onMounted, ref } from 'vue';
import {
  Input,
  Ripple,
  initTWE,
} from "tw-elements";
import router from "../../router";
import DashboardLayout from "../../components/DashboardLayout.vue";
const toast = useToast();
const userStore = useUserStore();

onMounted(() => {
  initTWE({ Input, Ripple });
});

const stateData = ref({

})


</script>

