import Vue from 'vue'
import formUtil from '@tq/ta404-ui/es/utils/js/form.util'
import urlUtil from '@tq/ta404-ui/es/utils/js/url.util'
import cookieUtil from '@tq/ta404-ui/es/utils/js/cookie.util'
import windowUtil from '@tq/ta404-ui/es/utils/js/window.util'
import {
    button,
    form,
    input,
    modal,
    containerMask,
    message,
    spin,
    icon,
    select
} from '@tq/ta404-ui'
Vue.use(button)
Vue.use(form)
Vue.use(input)
Vue.use(modal)
Vue.use(icon)
Vue.use(spin)
Vue.use(containerMask)
Vue.use(message)
Vue.use(select)
const util = {
    ...cookieUtil,
    ...formUtil,
    ...urlUtil,
    ...windowUtil
}
Vue.prototype.Base = {
    ...util,
    ...containerMask.$mask
}
Vue.prototype.$message = message
Vue.prototype.$info = modal.info
Vue.prototype.$success = modal.success
Vue.prototype.$error = modal.error
Vue.prototype.$warning = modal.warning
Vue.prototype.$confirm = modal.confirm
window.Base = Vue.prototype.Base
window.message = message