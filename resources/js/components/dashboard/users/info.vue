<template>
    <div class="container">
        <h1 class="text-center">Users Info</h1>
        <div class="user-info">
            <div class="col-md-12">
                <router-link :to="{ name: 'Users' }" class="btn btn-primary btn-sm float-right mb-3">Back</router-link>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Zipcode</th>
                        <th>Home Number</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-if="user.user_info.length" v-for="(userInfo, key) of user.user_info">
                            <td>{{ userInfo.address }}</td>
                            <td>{{ userInfo.city }}</td>
                            <td>{{ userInfo.state }}</td>
                            <td>{{ userInfo.country }}</td>
                            <td>{{ userInfo.zipcode }}</td>
                            <td>{{ userInfo.home_number }}</td>
                        </tr>
                        <tr v-else>
                            <p class="text-center">No Record Found</p>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                user: {}
            }
        },
        created() {
            this.userInfo(this.$route.params.id);
        },
        methods: {
            userInfo(userId) {
                axios.get(`http://127.0.0.1:8000/api/users/${userId}/info`)
                   .then((res) => {
                       this.user = res.data.user;
                   });
            }
        }
    }
</script>
