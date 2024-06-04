<template>
  <div class="request_page">

    <dashboard-layout>
      <template v-if="requestData">

        <div style="display: flex">
          <h1 class="mb-4 text-3xl mr-5 font-extrabold text-gray-900 dark:text-white">Заявка <span
              class="text-blue-600 dark:text-blue-500"># {{ requestData.id }} </span></h1>
          <div v-if="requestData.closed_at" class="max-w-[200px]">
            <fwb-alert type="danger">
              Закрыта
            </fwb-alert>
          </div>
          <div v-else class="max-w-[200px]">
            <fwb-alert type="success">
              В работе
            </fwb-alert>
          </div>
        </div>


        <p class="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">
          Тема: {{ requestData.theme }}
        </p>
        <p class="mb-3 text-xl font-extrabold text-gray-800 dark:text-white" v-if="requestData.file_path">
          Файл: <a class="text-blue-600 underline" :href="baseUrl+ '/' +requestData.file_path"> Скачать </a>
        </p>

        <div v-if="!requestData.closed_at">
          <fwb-button @click="closeRequest" color="red" >
            Закрыть заявку
          </fwb-button>
        </div>

        <div
            class="chat_area mt-[40px] mb-[60px] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <template v-for="message in requestData.messages">
            <chat-message class="mt-5 mb-5" :user="getFullName(message.user)" :message="message.message"
                          :time="message.created_at"></chat-message>
          </template>
        </div>

        <fwb-textarea
            class="pb-4"
            v-model="form.message"
            :rows="5"
            label="Новое сообщение"
            placeholder="Напишите сообщение"
        />

        <fwb-button @click="sendMessage" color="green" :disabled="!form.message.length">
          Отправить
        </fwb-button>

      </template>

    </dashboard-layout>

  </div>
</template>

<script setup>
import api from '../../api.js';
import {useUserStore} from "../../store/userStore";
import {useToast} from "vue-toastification";
import {computed, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router'

import router from "../../router";
import DashboardLayout from "../../components/DashboardLayout.vue";
import ChatMessage from "../../components/molecules/ChatMessage.vue";
import {FwbAlert, FwbButton, FwbTextarea} from "flowbite-vue";

const toast = useToast();
const userStore = useUserStore();
const route = useRoute()


const form = ref({
  message: '',
})

onMounted(() => {
  getRequestData();
});

const requestData = ref(null);
const baseUrl = computed(() => {
  return import.meta.env.VITE_API_ENDPOINT;
});

const getRequestData = async () => {
  await api.get(`/api/request/show/${route.params.id}`).then((r) => {
    requestData.value = r.data.data;
  }).catch((e) => {
    console.log(e)
  })
}

const sendMessage = async () => {
  let data = {
    request_id: requestData.value.id,
    message: form.value.message
  }
  await api.post(`/api/request/message/send`, data).then((r) => {
    toast.success(r.data.messages[0], {
      timeout: 2000
    });
    getRequestData();
  }).catch((e) => {
    toast.error(e.data.messages[0], {
      timeout: 3000
    });
  })
}

const closeRequest = async () => {
  await api.put(`/api/request/close/${requestData.value.id}`).then((r) => {
    toast.success('Заявка успешно закрыта!', {
      timeout: 2000
    });
    getRequestData();
  }).catch((e) => {
    toast.error(e.data.messages[0], {
      timeout: 3000
    });
  })
}

const getFullName = (user) => {
  return user.first_name + ' ' + user.last_name;
}

</script>

