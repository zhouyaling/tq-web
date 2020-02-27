<template>
<li class="list-item"  >
  <span v-handle class="handle" v-if="showHandle" :style="handleStyle"></span>
  <slot/>
</li>
</template>
<script>
  import {ElementMixin,HandleDirective} from './vue-slicksort.cjs.js'
  export default {
    name: "dragListItem",
    mixins: [ElementMixin],
    props: ['item', 'showHandle','handleStyle'],
    directives: { handle: HandleDirective },
  }
</script>

<style scoped lang="less" type="text/less">
  .list-item{
    list-style: none;
    padding: 4px 0px;
   cursor: move;

  }
  .handle{
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 1px solid #ccc;
    cursor: move;

  }
</style>




