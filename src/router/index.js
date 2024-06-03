import { createRouter, createWebHistory } from 'vue-router'
import beforeEach from "../router/beforeEach";
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ManagerCabinetView from "../views/cabinet/ManagerCabinetView.vue";
import UserCabinetView from "../views/cabinet/UserCabinetView.vue";
import ShowRequestView from "../views/cabinet/ShowRequestView.vue";
import Page403View from "../views/Page403View.vue";
import Page404View from "../views/Page404View.vue";


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
    },
  },
  {
    path: '/cabinet/user',
    name: 'cabinet-user',
    component: UserCabinetView,
    meta: {
      access: ['user'],
    },
  },
  {
    path: '/cabinet/manager',
    name: 'cabinet-manager',
    component: ManagerCabinetView,
    meta: {
      access: ['manager'],
    },
  },
  {
    path: '/cabinet/request/:id',
    name: 'cabinet-request',
    component: ShowRequestView,
    meta: {
      access: ['user', 'manager'],
    },
  },
  {
    path: '/403',
    name: 'Error403',
    component: Page403View,
    meta: {
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page404',
    component: Page404View,
    meta: {
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(beforeEach);

export default router
