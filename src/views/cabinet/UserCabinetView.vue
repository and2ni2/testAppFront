<template>
  <div class="user_page">

    <dashboard-layout>

      User template components will be here

    </dashboard-layout>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DashboardLayout from "../../components/DashboardLayout.vue";
import api from "../../api.js";

onMounted(() => {
  requestsFetch();
});

const requests = ref(null);

const requestsFetch = () =>
{
  api.get('/api/request/list').then((r) => {
    requests.value = r.data.data
  }).catch((e) => {
    console.log(e);
  })
}

</script>

