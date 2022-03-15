<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse">
                <div class="navbar-nav" v-if="loggedUser">
                    <router-link class="nav-item nav-link ml-3" to="/dashboard">Dashboard</router-link>
                    <router-link class="nav-item nav-link ml-3" to="/users">Users</router-link>
                    <a href="javascript:void(0)" @click="logout()" class="nav-item nav-link ml-3">Logout</a>
                </div>
                <div class="navbar-nav" v-else>
                    <router-link class="nav-item nav-link ml-3" to="/login">Login</router-link>
                    <router-link class="nav-item nav-link ml-3" to="/register">Register</router-link>
                </div>
            </div>
        </nav>
        <router-view> </router-view>
    </div>
</template>

<script>
    import Auth from './Auth.js';
    export default {
        data() {
            return {
                loggedUser: this.auth.user
            };
        },
        mounted() {
            let vm = this;
            vm.$root.$on('loggedInUser', (user) => {
                vm.loggedUser = user;
            })
        },
        methods: {
            logout() {
                let vm = this;
                vm.axios.post('http://127.0.0.1:8000/api/logout')
                .then(({data}) => {
                    vm.loggedUser = null;
                    Auth.logout(); //reset local storage
                    vm.$router.push('/login');
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>
