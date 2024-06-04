<template>
  <div class="user_page">

    <dashboard-layout>

      <div class="mb-3">
        Здравствуйте {{ userStore.getFullName }}!
      </div>

      <button
          @click="showModal"
          type="button"
          data-twe-ripple-init
          data-twe-ripple-color="light"
          class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
        Создать заявку
      </button>

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
                  <th scope="col" class=" px-6 py-4">Статус</th>
                </tr>
                </thead>
                <tbody>

                <template v-for="(item, index) in requestsData.data">
                  <tr class="border-b border-neutral-200 dark:border-white/10">
                    <td class="whitespace-nowrap  px-6 py-4 font-medium"> {{ item.id }}</td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      <fwb-button @click="openRequest(item.id)" color="alternative">Открыть</fwb-button>
                    </td>
                    <td class="whitespace-nowrap  px-6 py-4"> {{ getCategoryName(item.category_id) }}</td>
                    <td class="whitespace-nowrap  px-6 py-4"> {{ item.theme }}</td>
                    <td class="whitespace-nowrap  px-6 py-4">
                    <span v-if="item.closed_at">
                      <fwb-alert type="danger">
                        Закрыта
                      </fwb-alert>
                    </span>
                      <span v-else>
                      <fwb-alert type="success">
                            В работе
                      </fwb-alert>
                    </span>
                    </td>
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
          У Вас еще нет заявок, создайте новую заявку...
        </div>
      </div>


      <fwb-modal v-if="isShowModal" @close="closeModal">
        <template #header>
          <div class="flex items-center text-lg">
            Создать новую заявку
          </div>
        </template>
        <template #body>

          <form>

            <fwb-select class="pb-5"
                        v-model="selectedParentCategory"
                        :options="categoriesTree"
                        label="Выберите категорию"
            />

            <fwb-select v-if="selectedParentCategory"
                        class="pb-5"
                        v-model="selectedCategory"
                        :options="childrenCategories"
                        label="Выберите подкатегорию"
            />

            <fwb-input
                class="pb-5"
                v-model="form.theme"
                placeholder="Тема заявки"
                label="Тема"
            />

            <fwb-textarea
                class="pb-5"
                v-model="form.message"
                :rows="4"
                label="Сообщение"
                placeholder=""
            />

            <fwb-file-input class="mt-5" v-model="form.file" label="Файл при необходимости"/>

          </form>

        </template>
        <template #footer>
          <div class="flex justify-between">
            <fwb-button @click="createRequest" color="green" :disabled="!selectedCategory">
              Создать
            </fwb-button>
          </div>
        </template>
      </fwb-modal>


    </dashboard-layout>

  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import DashboardLayout from "../../components/DashboardLayout.vue";
import {TailwindPagination} from 'laravel-vue-pagination';
import {FwbAlert, FwbButton, FwbModal, FwbInput, FwbFileInput, FwbSelect, FwbTextarea} from 'flowbite-vue'
import api from "../../api.js";
import {useUserStore} from "../../store/userStore.js";
import router from "../../router/index.js";
import {useToast} from "vue-toastification";

const userStore = useUserStore();
const toast = useToast();

onMounted(() => {
  requestsFetch();
  getCategories();
  getCategoriesTree();
});

const requestsData = ref({});
const categories = ref([]);
const categoriesTree = ref([]);

const selectedParentCategory = ref(null);
const selectedCategory = ref(null);

const childrenCategories = computed(() => {
  return getCategoryChildren();
});

const isShowModal = ref(false);

const form = ref({
  theme: '',
  message: '',
  category_id: selectedCategory,
  file: null,
});

const requestsFetch = async (page = 1) => {
  await api.get(`/api/request/list?page=${page}`).then((r) => {
    requestsData.value = r.data.data
  }).catch((e) => {
    console.log(e);
  })
}

const getCategories = async () => {
  await api.get(`/api/request/category/list?inline=true`).then((r) => {
    categories.value = r.data.data
  }).catch((e) => {
    console.log(e);
  })
}

const getCategoriesTree = async () => {
  await api.get(`/api/request/category/list`).then((r) => {
    categoriesTree.value = r.data.data
    // Из-за того что компонент селекта не воспринимает айди а берет value
    categoriesTree.value.map((item) => item.value = item.id);
  }).catch((e) => {
    console.log(e);
  })
}

const getCategoryName = (id) => {
  let category = categories.value.find((category) => category.id === id);
  return category ? category.name : '';
}

const getCategoryChildren = () => {
  let category = categoriesTree.value.find((category) => category.id === selectedParentCategory.value);
  let children = category?.children;
  if (children) {
    // Из-за того что компонент селекта не воспринимает айди а берет value
    children.map((item) => item.value = item.id);
  }
  return children ?? null;
}

const openRequest = (id) => {
  router.push({name: 'cabinet-request', params: {id: id}})
}

const createRequest = async () => {
  let config = {}
  let formData = new FormData();
  formData.append('theme', form.value.theme);
  formData.append('message', form.value.message);
  formData.append('category_id', form.value.category_id);

  if (form.value.file) {
    formData.append('file', form.value.file);
    config = {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    }
  }

  await api.post(`/api/request/create`, formData, config).then((r) => {
    toast.success(r.data.messages[0], {
      timeout: 3000
    });
    closeModal();
    requestsFetch();
  }).catch((e) => {
    toast.error(e.data.messages[0], {
      timeout: 3000
    });
  })
}

function closeModal() {
  isShowModal.value = false
}

function showModal() {
  isShowModal.value = true
}


</script>

<style lang="scss">
.sr-only {
  display: none;
}

nav.paginator {
  display: flex;
  justify-content: center;
}

// tailwind colors not working 0_o for paginator temporary
.bg-blue-50 {
  background-color: royalblue;
}

.border-blue-500 {
  border-color: darkblue;
}
</style>
