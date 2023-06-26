<script lang="ts" setup>
const props = defineProps<{
  title?: string
  gridClass?: string
  titleLink?: string
  backLink?: string
  titleClass?: string
  alwaysGrid?: boolean
  navigateBack?: boolean
}>()

const { width } = useWindowSize()
const { isDesktop } = useDevice()
const router = useRouter()
const navigate = () => !props.backLink && props.navigateBack && router.back()
</script>

<template>
  <div>
    <div inline-flex wfull>
      <ClientOnly>
        <div
          v-if="backLink || navigateBack" active:bg-white:10 w10 h10 min-w10 min-h10 hoverable
          rounded-full flex items-center justify-center cursor-pointer
        >
          <NuxtLink :to="backLink" @click="navigate">
            <span i-solar:alt-arrow-left-line-duotone flex />
          </NuxtLink>
        </div>
        <div
          v-else-if="title"
          bg-primary-400 w2 h8 rounded-xl ml1 lg:ml0 lt-lg:hidden inline-flex
          :class="titleClass"
        />
      </ClientOnly>
      <h1 v-if="title" text-2xl mt-.5 wfull ml3 flex="~ row">
        {{ title }}
      </h1>
      <NuxtLink v-if="titleLink" ml-auto whitespace-nowrap :to="titleLink ?? undefined">
        <Button
          hoverable p2 px5 round text-lg
          inline-flex hover:text-primary-300
          class="lt-lg:(mr1 !bg-transparent active:underline op60) no-touch"
        >
          See all
        </Button>
      </NuxtLink>
    </div>
    <MusicGrid v-if="alwaysGrid || (isDesktop && width > 1023)" :class="gridClass">
      <slot />
    </MusicGrid>
    <Slider v-else>
      <slot name="slider" />
    </Slider>
  </div>
</template>
