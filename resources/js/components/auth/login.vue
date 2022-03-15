<template>
    <div class="container m-auto w-75">
        <h1 class="text-center login-title">Login</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input class="form-control" type="email" v-model="user.email">
                    <span class="text-danger">{{ errors.email }}</span>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input class="form-control" type="password" v-model="user.password">
                    <span class="text-danger">{{ errors.password }}</span>
                </div>
                <button class="btn btn-primary mt-2" @click="login">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Auth from '../../Auth.js';

    export default {
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                },
                errors: {}
            };
        },
        methods: {
            login() {
                let vm = this;
                axios.post('api/login', vm.user)
                    .then(({data}) => {
                        vm.$root.$emit('loggedInUser', data.user)
                        Auth.login(data.access_token, data.user); //set local storage
                        vm.$router.push('/dashboard');
                    })
                    .catch((error) => {
                        if (error.response.status == 401) {
                             vm.$swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: error.response.data.message,
                            })
                        } else {
                            let errorsMessages = error.response.data;
                            const errors = {};

                            if (Object.keys(errorsMessages).length) {
                                Object.keys(errorsMessages.errors).forEach((key) => {
                                    errors[key] = errorsMessages.errors[key][0];
                                });
                            }

                            vm.errors = errors;
                        }
                    });
            }
        }
    }
</script>
