import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        id: 0,
        firstName: '',
        lastName: '',
        middleName: '',
        gender: 1,
        email: '',
        mobile: null,
        roles: [],
    }),
    getters: {
        getFullName:(state) => {
            return state.lastName + ' ' + state.firstName + ' ' + state.middleName;
        },
    },
    actions: {
        updateStore(params) {
            this.id = params.id;
            this.firstName = params.first_name;
            this.lastName = params.last_name;
            this.middleName = params.middle_name;
            this.gender = params.gender;
            this.email = params.email;
            this.mobile = params.mobile;
            this.roles = params.roles;
        }
    }
});
