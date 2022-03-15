<template>
    <div class="pagination_block">
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{disabled : pagination.prev_page_url == null}">
                    <button type="button" class="page-link" @click="pageURL(pagination.first_page_url)">&laquo;</button>
                </li>
                <li class="page-item" :class="{disabled : pagination.prev_page_url == null}">
                    <button type="button" class="page-link" @click="pageURL(pagination.prev_page_url)">Previous</button>
                </li>
                <li class="page-item" v-if="current_page -2 > 0 " >
                    <button type="button" class="page-link" @click="pageURL(pagination.path + '?page=' + (current_page - 2 ) )">{{ current_page - 2}}</button>
                </li>
                <li class="page-item" v-if="pagination.prev_page_url" >
                    <button type="button" class="page-link" @click="pageURL(pagination.prev_page_url)">{{ current_page - 1}}</button>
                </li>
                <li class="page-item">
                    <button type="button" class="page-link" :class="{current : pagination.current_page == current_page}">{{ current_page}}</button>
                </li>
                <li class="page-item" v-if="pagination.next_page_url" >
                    <button type="button" class="page-link" @click="pageURL(pagination.next_page_url)">{{ current_page + 1}}</button>
                </li>
                <li class="page-item" v-if="current_page + 2 <= last_page" >
                    <button type="button" class="page-link" @click="pageURL(pagination.path + '?page=' + (current_page + 2 ) )">{{ current_page + 2 }}</button>
                </li>
                <li class="page-item" :class="{disabled : pagination.next_page_url == null}">
                    <button type="button" class="page-link" @click="pageURL(pagination.next_page_url)">Next</button>
                </li>
                <li class="page-item" :class="{disabled : pagination.next_page_url == null}">
                    <button type="button" class="page-link" @click="pageURL(pagination.last_page_url)">&raquo;</button>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
    export default {
        props: ['pagination', 'current_page', 'last_page'],
        methods: {
            pageURL(url) {
                this.$parent.pageURL(url);
            }
        }
    }
</script>
