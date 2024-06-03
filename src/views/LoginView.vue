<template>
  <div class="login_page container">

    <section class="h-screen">
      <div class="h-full">
        <!-- Left column container with background-->
        <div
            class="flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div
              class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="w-full"
                alt="Sample image"/>
          </div>

          <!-- Right column container -->
          <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
              <!-- Separator between social media sign in and email/password sign in -->
              <div
                  class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                <p
                    class="mx-4 mb-0 text-center font-semibold dark:text-white">
                  Авторизация
                </p>
              </div>

              <!-- Email input -->
              <div class="relative mb-6" data-twe-input-wrapper-init>
                <input
                    v-model="form.email"
                    type="text"
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput2"
                    placeholder="Email address"/>
                <label
                    for="exampleFormControlInput2"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                >Email
                </label>
              </div>

              <!-- Password input -->
              <div class="relative mb-6" data-twe-input-wrapper-init>
                <input
                    v-model="form.password"
                    type="password"
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput22"
                    placeholder="Password"/>
                <label
                    for="exampleFormControlInput22"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                >Пароль
                </label>
              </div>


              <!-- Login button -->
              <div class="text-center lg:text-left">
                <button
                    @click="login"
                    type="button"
                    class="inline-block w-full rounded bg-primary px-7 pb-2 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    data-twe-ripple-init
                    data-twe-ripple-color="light">
                  Войти
                </button>

                <!-- Register link -->
                <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Нет аккаунта?
                  <a
                      href="/register"
                      class="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >Загерестрироваться</a
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

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

const form = ref({
  'email': '',
  'password': '',
})

const login = () => {
  api.post('/api/user/login', form.value).then((r) => {
    localStorage.setItem('token', r.data.data.token);
    router.push({path:'/cabinet'});
  }).catch((e) => {
    toast.error(e.data.message, {
      timeout: 3000
    });
  })
}


</script>

