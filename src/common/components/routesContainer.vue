<script type="text/jsx">
import zhCN from '@tq/ta404-ui/es/locale-provider/zh_CN'
// import enUS from '@tq/ta404-ui/es/locale-provider/default'
export default {
  name: 'routesContainer',
  props: {
    routesList: Array
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  created () {
    this.$bus.on('refresh', this.reload)
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
  render () {
    const locale = zhCN
    return (
      <div class="page-wrapper">
        <ta-config-provider getPopupContainer={() => document.querySelector('.page-wrapper')}>
          <ta-locale-provider locale={locale}>
            {this.isRouterAlive
              ? <keep-alive>
                <router-view></router-view>
              </keep-alive>
              : ''}
          </ta-locale-provider>
        </ta-config-provider>
      </div>
    )
  },
  beforeDestroy () {
    this.$bus.off('refresh', this.reload)
  }
}
</script>

<style scoped type="text/less">
  .page-wrapper {
    height: 100%;
  }
</style>
