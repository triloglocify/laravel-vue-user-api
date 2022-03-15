<template>
    <div class="container">
        <h1 class="text-center">Dashboard</h1>
        <div class="row">
            <div class="col-md-12">
                <h4>Here is the logged in user details:</h4><br>
                <p><strong>Name: </strong> {{user.name}}</p>
                <p><strong>Email: </strong> {{user.email}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                user: this.auth.user
            }
        },
        created () {
            // console.log(this.auth.user);
        }
    }
</script>
