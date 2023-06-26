<script lang="ts" setup>

</script>

<template>
  <HeadlessMenu as="div" class="relative inline-block text-left">
    <div>
      <HeadlessMenuButton
        class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Options
      </HeadlessMenuButton>
    </div>

    <Transition

      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <HeadlessMenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <HeadlessMenuItem v-slot="{ active }">
            <button
              class="group flex w-full items-center rounded-md px-2 py-2 text-sm" :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
              ]"
            >
              Edit
            </button>
          </HeadlessMenuItem>
          <HeadlessMenuItem v-slot="{ active }">
            <button
              class="group flex w-full items-center rounded-md px-2 py-2 text-sm" :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
              ]"
            >
              Duplicate
            </button>
          </HeadlessMenuItem>
        </div>
        <div class="px-1 py-1">
          <HeadlessMenuItem v-slot="{ active }">
            <button
              class="group flex w-full items-center rounded-md px-2 py-2 text-sm" :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
              ]"
            >
              Archive
            </button>
          </HeadlessMenuItem>
          <HeadlessMenuItem v-slot="{ active }">
            <button
              class="group flex w-full items-center rounded-md px-2 py-2 text-sm" :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
              ]"
            >
              Move
            </button>
          </HeadlessMenuItem>
        </div>

        <div class="px-1 py-1">
          <HeadlessMenuItem v-slot="{ active }">
            <button
              class="group flex w-full items-center rounded-md px-2 py-2 text-sm" :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
              ]"
            >
              Delete
            </button>
          </HeadlessMenuItem>
        </div>
      </HeadlessMenuItems>
    </Transition>
  </HeadlessMenu>
</template>

<style lang="scss" scoped></style>
