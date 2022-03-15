<template>
    <div class="container">
        <h2 class="text-center">Add User</h2>
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'Users' }" class="btn btn-primary btn-sm float-right mb-3">Back</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="user.name">
                        <span class="text-danger">{{ errors.name }}</span>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" v-model="user.email">
                        <span class="text-danger">{{ errors.email }}</span>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="user.password">
                        <span class="text-danger">{{ errors.password }}</span>
                    </div>

                    <button type="button" class="btn btn-primary btn-sm float-right mb-3" @click="addMoreAddress()">Add More</button>
                    <template v-for="(addressNo, index) in addresses">
                        <h5>Address ({{addressNo}}) </h5>
                        <div class="form-group">
                            <label>Address</label>
                            <textarea type="text" rows="5" class="form-control" v-model="user.addresses.address[index]"></textarea>
                            <span class="text-danger">{{ errors.address }}</span>
                        </div>
                        <div class="form-group">
                            <label>City</label>
                            <input type="text" class="form-control" v-model="user.addresses.cities[index]">
                            <span class="text-danger">{{ errors.cities }}</span>
                        </div>
                        <div class="form-group">
                            <label>State</label>
                            <input type="text" class="form-control" v-model="user.addresses.state[index]">
                            <span class="text-danger">{{ errors.state }}</span>
                        </div>
                        <div class="form-group">
                            <label>Country</label>
                            <input type="text" class="form-control" v-model="user.addresses.country[index]">
                            <span class="text-danger">{{ errors.country }}</span>
                        </div>
                        <div class="form-group">
                            <label>Zip Code</label>
                            <input type="text" class="form-control" v-model="user.addresses.zipcode[index]">
                            <span class="text-danger">{{ errors.zipcode }}</span>
                        </div>
                        <div class="form-group">
                            <label>Home Number</label>
                            <input type="text" class="form-control" v-model="user.addresses.home_number[index]">
                            <span class="text-danger">{{ errors.home_number }}</span>
                        </div>
                    </template>
                    <button type="button" class="btn btn-primary" @click="createUser()">Create</button>
                </form>
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
                    addresses: {
                        address: [],
                        cities: [],
                        state: [],
                        country: [],
                        zipcode: [],
                        home_number: []
                    }
                },
                errors: {},
                addresses: 1
            }
        },
        methods: {
            createUser() {
                let vm = this;
                axios.post('api/users', vm.user)
                    .then(({data}) => {
                        // vm.$router.push('/users');
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                        let errorsMessages = error.response.data;
                        console.log(errorsMessages);
                        const errors = {};
                        if (Object.keys(errorsMessages).length) {
                           Object.keys(errorsMessages.errors).forEach((key) => {
                             errors[key] = errorsMessages.errors[key][0];
                           });
                        }

                        vm.errors = errors;
                    });
            },
            addMoreAddress() {
                this.addresses++;
            }
        }
    }
</script>
