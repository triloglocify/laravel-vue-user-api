<template>
    <div class="container">
        <h1 class="text-center">Users</h1>
        <div class="row" v-if="loading">
            <div class="loader"></div>
        </div>
        <div class="row" v-else>
            <div class="col-md-12">
                <router-link class="btn btn-sm btn-primary float-right mb-2" to="/users-create">Create User</router-link>
            </div>
            <div class="col-md-12">
                <table class="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, key) of users.data">
                            <td>{{ key+1 }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.created_at | moment("ll") }}</td>
                            <td>
                                 <router-link class="btn btn-success btn-sm" :to="{ name: 'UserInfo', params: { id: user.id }}">View Info</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <pagination
                    :pagination="users"
                    :current_page="users.current_page"
                    :last_page="users.last_page"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                users: {},
                loading: false
            }
        },
        created () {
            this.pageURL('api/users');
        },
        methods: {
            pageURL (url) {
                let vm = this;
                vm.loading = true;
                axios.get(url).then(({ data }) => {
                    vm.users = data;
                    vm.loading = false;
                })
                .catch((error) => {
                    vm.loading = false;
                    console.log(error);
                });
            }
        }
    }
</script>
