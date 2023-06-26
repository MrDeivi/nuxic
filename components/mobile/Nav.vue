<script lang="ts" setup>

</script>

<template>
  <div
    fixed lg:hidden top-0 left-0 wfull h-16 bg-black:80 backdrop-blur z-100
    border-b border-solid border-white:10
  >
    <div hfull flex items-center lt-md-px-3 px-10>
      <NuxtLink to="/" flex items-center>
        <span i-akar-icons:music-album-fill text-4xl text-primary-300 rounded-2xl />
        <h2 class="mb-0 ml5 font-bold text-3xl">
          Nuxic
        </h2>
      </NuxtLink>

      <a href="https://github.com/MrDeivi/nuxic" target="__blank" ml-auto>
        <div bg-white:10 round hover:bg-white:20>
          <div p-2 flex items-center>
            <span i-akar-icons:github-fill inline-block text-2xl mr-4 />
            Star repo ✨
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style  scoped></style>
