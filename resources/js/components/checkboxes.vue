<template>
    <div class="container m-auto w-75">
        <h1 class="text-center">Checkbox </h1>
        <div class="row">
            <div class="col-md-12">
              <div class="form-check" v-for="product in products">
                <input class="form-check-input" type="checkbox" :id="product.name" :value="product.name" v-model="selectedProducts[product.id]">
                <label class="form-check-label" :for="product.name">
                  {{ product.name }}
                </label>

                <div class="form-check" v-for="varient in product.varient">
                  <input class="form-check-input" type="checkbox" :id="varient.color" :value="varient.color" >
                  <label class="form-check-label" :for="varient.color">
                    {{ varient.color }}
                  </label>

                </div>
              </div>
                <button class="btn btn-primary mt-2" @click="update()">Update</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              selectedProducts: {},
              products: [
                {
                  id: 1,
                  name: 'test 1',
                  varient: []
                },
                {
                  id: 2,
                  name: 'test 2',
                  varient: []
                },
                {
                  id: 3,
                  name: 'test 3',
                  varient: [
                    {
                      id: 1,
                      color: 'black'
                    },
                    {
                      id: 2,
                      color: 'white'
                    },
                    {
                      id: 3,
                      color: 'blue'
                    }
                  ]
                },
              ]
            };
        },
        methods: {
          update() {
            console.log(this.selectedProducts);
          }
        }
    }
</script>
