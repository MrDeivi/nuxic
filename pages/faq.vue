<script lang="ts" setup>
const { data } = await useFetch('/api/faq')

useSeoMeta({
  title: 'Frequently asked questions',
})
</script>

<template>
  <div inline-flex wfull>
    <div
      bg-primary-400 w2 h8 rounded-xl ml1 lg:ml0 lt-lg:hidden inline-flex
    />
    <h1 text-2xl mt-.5 wfull ml3 flex="~ row">
      FAQ
    </h1>
  </div>

  <div class="wfull max-w-3xl mx-auto">
    <Collapsable v-if="data" :panels="data" />
  </div>
</template>

<style lang="scss" scoped></style>
