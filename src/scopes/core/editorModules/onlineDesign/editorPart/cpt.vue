<template>
  <component :is="cpt"  v-if="cpt" />
</template>

<script>
  export default {
    name: "cpt",
    components: {},
    props: {
      item: {
        type: Object,
        default:function () {
          return{
            name:`default`
          }
        }
      },
    },
    data() {
      return {
        cpt:null
      }
    },
    created() {
    },
    mounted() {
      this.loaderFn()
    },
    computed: {
      loader() {
        console.log(`进入loader`)
        if (!this.item || !this.item.name) {
          return null
        }
        return () => import(`./part/${this.item.name}`)
      },
    },
    methods: {
      loaderFn(){
        this.loader()
          .then(() => {
            this.cpt = () => this.loader()
          })
          .catch(() => {
            this.cpt = () => import('./part/default')
          })
      }
    },

  }
</script>

