<template>
  <div>
   <cpt v-for="(item,index) in moduleTemplate"
           :itemname="item.name"
           :key="index"
          >
    </cpt>
  </div>
</template>

<script>
  import cpt from './cpt'

  export default {
    name: "cptList",
    components: {cpt},
    props: {
      moduleTemplate: {
        type: Array,
        default(){
          return [{

          }]
        }
      }
    },
    data() {
      return {

      }
    },
    created() {
    },
    mounted() {

    },
    computed: {

    },
    methods: {

    },

  }
</script>


