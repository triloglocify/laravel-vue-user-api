<template>
    <div class="container m-auto w-75">
        <h1 class="text-center">Register</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input class="form-control" type="text" v-model="user.name">
                    <span class="text-danger">{{ errors.name }}</span>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input class="form-control" type="text" v-model="user.email">
                    <span class="text-danger">{{ errors.email }}</span>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input class="form-control" type="password" v-model="user.password">
                    <span class="text-danger">{{ errors.password }}</span>
                </div>
                <div class="form-group">
                    <label for="password_confirmation">Confirm Password</label>
                    <input class="form-control" type="password" v-model="user.password_confirmation">
                    <span class="text-danger">{{ errors.password_confirmation }}</span>
                </div>
                <button class="btn btn-primary mt-2" @click="register()">Register</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                errors: {}
            };
        },
        methods: {
            register() {
                let vm = this;
                axios.post('api/register', vm.user)
                    .then(({data}) => {
                        vm.$router.push('/login');
                    })
                    .catch((error) => {
                        let errorsMessages = error.response.data;
                        const errors = {};
                        if (Object.keys(errorsMessages).length) {
                           Object.keys(errorsMessages.errors).forEach((key) => {
                             errors[key] = errorsMessages.errors[key][0];
                           });
                        }

                        vm.errors = errors;
                    });
            }
        }
    }
</script>
