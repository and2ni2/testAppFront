import { useUserStore } from "../store/userStore";
import api from "../api";

export default async function (to, from, next) {
  const userStore = useUserStore();

  if (to.meta.hasOwnProperty('access')) {

    await api.get('/api/get-user').then((r) => {
      if (r.data.success) {

        if (r.data.data.roles[0].name === to.meta.access) {
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
