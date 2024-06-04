<template>
  <div class="flex items-start gap-2.5">
    <img class="w-8 h-8 rounded-full" src="https://cdn3.vectorstock.com/i/1000x1000/38/17/male-face-avatar-logo-template-pictograph-vector-11333817.jpg" alt="user avatar image">
    <div class="flex flex-col gap-1 w-full ">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <span class="text-sm font-semibold text-gray-900 dark:text-white">{{user}}</span>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{dateFormat}}</span>
      </div>
      <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <p class="text-sm font-normal text-gray-900 dark:text-white"> {{message}}</p>
      </div>
    </div>
  </div>
</template>



<script setup>
import {computed, onMounted} from "vue";
import moment from 'moment';

onMounted(() => {
});

const props = defineProps({
  message: String,
  user: String,
  time: String
});

const dateFormat = computed(() => {
  return moment(props.time).format('DD-MM-YYYY HH:ss')
});

</script>

<style>

</style>