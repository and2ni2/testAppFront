import { useUserStore } from "../store/userStore";
import api from "../api";

export default async function (to, from, next) {
  const userStore = useUserStore();

  if (to.meta.hasOwnProperty('access') || to.fullPath === '/cabinet') {

    await api.get('/api/get-user').then((r) => {
      if (r.data.success) {

        if (to.fullPath === '/cabinet') {
          next('/cabinet/'+r.data.data.roles[0].name);
        }

        if (to.meta.access && to.meta.access.includes(r.data.data.roles[0].name) ) {
          userStore.updateStore(r.data.data);
          next();
        }

        next('/403?redirect_to=' + to.fullPath);

      } else {
        next('/?redirect_to=' + to.fullPath);
      }

    }).catch((e) => {
      console.log('loginError',e);
      next('/403?redirect_to=' + to.fullPath);
    })

  } else {
    next();
  }


}
