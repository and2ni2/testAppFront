<template>
  <div class="manager_page">

    <dashboard-layout>

      <div class="mb-3">
        Здравствуйте {{ userStore.getFullName }}!
      </div>

      <div class="flex flex-col mt-5 mb-3" v-if="requestsData.hasOwnProperty('data') && requestsData.data.length">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table
                  class="min-w-full text-center text-sm font-light text-surface dark:text-white">
                <thead
                    class="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                <tr>
                  <th scope="col" class=" px-6 py-4">ID</th>
                  <th scope="col" class=" px-6 py-4">Действия</th>
                  <th scope="col" class=" px-6 py-4">Категория</th>
                  <th scope="col" class=" px-6 py-4">Тема</th>
                  <th scope="col" class=" px-6 py-4">Сообщение</th>
                  <th scope="col" class=" px-6 py-4">Клиент</th>
                  <th scope="col" class=" px-6 py-4">Email</th>
                  <th scope="col" class=" px-6 py-4">Телефон</th>
                </tr>
                </thead>
                <tbody>

                <template v-for="(item, index) in requestsData.data">
                  <tr class="border-b border-neutral-200 dark:border-white/10">
                    <td class="whitespace-nowrap  px-6 py-4 font-medium"> {{ item.id }}</td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      <fwb-button @click="openRequest(item.id)" color="alternative">Открыть</fwb-button>
                    </td>
                    <td class="whitespace-nowrap  px-6 py-4"> {{ item.category.name }}</td>
                    <td class="whitespace-nowrap  px-6 py-4"> {{ item.theme }}</td>
                    <td class="whitespace-nowrap elipsis px-6 py-4"> {{ item.message }}</td>
                    <td class="whitespace-nowrap px-6 py-4"> {{ item.user.full_name }}</td>
                    <td class="whitespace-nowrap px-6 py-4"> {{ item.user.email }}</td>
                    <td class="whitespace-nowrap px-6 py-4"> {{ item.user.mobile }}</td>
                  </tr>
                </template>

                </tbody>
              </table>
            </div>
          </div>
        </div>

        <TailwindPagination
            :data="requestsData"
            class="paginator pb-5 mt-3"
            @pagination-change-page="requestsFetch"
        />
      </div>

      <div v-else>
        <div
            class="mt-5 w-full items-center rounded-lg bg-info-100 px-6 py-5 text-base text-info-800 dark:bg-[#11242a] dark:text-info-500"
            role="alert" id="alert-static-info" data-twe-alert-init="">
          Активных заявок на данный момент не имеется...
        </div>
      </div>

    </dashboard-layout>

  </div>
</template>

<script setup>
import api from '../../api.js'
import {useUserStore} from "../../store/userStore";
import {useToast} from "vue-toastification";
import {onMounted, ref} from 'vue';
import {
  Input,
  Ripple,
  initTWE,
} from "tw-elements";
import router from "../../router";
import DashboardLayout from "../../components/DashboardLayout.vue";
import {FwbAlert, FwbButton} from "flowbite-vue";
import {TailwindPagination} from "laravel-vue-pagination";

const toast = useToast();
const userStore = useUserStore();

onMounted(() => {
  initTWE({Input, Ripple});
});

const requestsData = ref({});

onMounted(() => {
  requestsFetch();
});

const requestsFetch = async (page = 1) => {
  await api.get(`/api/request/list?page=${page}`).then((r) => {
    requestsData.value = r.data.data
  }).catch((e) => {
    console.log(e);
  })
}

const openRequest = (id) => {
  router.push({name: 'cabinet-request', params: {id: id}})
}

</script>

<style lang="scss">
.elipsis {
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
</style>
