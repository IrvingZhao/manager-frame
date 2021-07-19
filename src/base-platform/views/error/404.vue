<template>
  <div class="container">
    <img :src="img404" alt="" />
  </div>
</template>

<script lang="ts">
import { Img404 } from '../../assets'

export default {
  name: 'error404',
  data() {
    return { img404: Img404 }
  }
}
</script>

<style scoped>
img {
  display: block;
  margin: 0 auto;
  min-height: 500px;
}
</style>
