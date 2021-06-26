<script lang="ts">
import { defineComponent, ref } from 'vue';
import MainNavigationLink from './MainNavigationLink.vue';
import { useBreakpoints } from '/@/composables';

export default defineComponent({
  components: { MainNavigationLink },
  name: 'MainNavigation',
  setup() {
    const { isMobile } = useBreakpoints();

    const isMobileDrawerOpen = ref(false);

    const menu = ref([
      {
        url: '/home',
        label: 'Home',
      },
      {
        url: '/blog',
        label: 'Blog',
      },
      {
        url: '/about',
        label: 'About',
      },
      {
        url: '/subitems',
        label: 'Subitems',
        items: [
          {
            url: '/subitem-1',
            label: 'SubItem 1',
          },
          {
            url: '/sub-item-2',
            label: 'SubItem 2',
          },
          {
            url: '/sub-item-3',
            label: 'SubItem 3',
          },
          {
            url: '/sub-item-4',
            label: 'SubItem 4',
          },
        ],
      },
    ]);

    return {
      isMobileDrawerOpen,
      menu,
      isMobile,
    };
  },
});
</script>
<template>
  <nav class="w-full h-14 shadow-lg ">
    <div
      class="container mx-auto flex py-2 justify-between"
      :class="{ 'px-4': isMobile }"
    >
      <img alt="Vitesome logo" class="w-12" src="imagotype.svg" />

      <ul
        :class="
          isMobile
            ? 'flex flex-col fixed inset-0 z-10 px-8 py-16 bg-white shadow-lg'
            : 'flex items-center'
        "
        v-show="isMobileDrawerOpen || !isMobile"
        role="menubar"
      >
        <main-navigation-link
          v-for="(item, $index) of menu"
          :url="item.url"
          :label="item.label"
          :items="item.items"
          :key="$index"
          @close-mobile-drawer="isMobileDrawerOpen = false"
        />
        <button
          class="absolute right-4 top-4 p-4 text-xl z-10"
          v-show="isMobile"
          @click="isMobileDrawerOpen = false"
        >
          <i class="iconify" data-icon="mdi:close" />
        </button>
      </ul>
      <button
        class="p-2 text-xl"
        v-show="isMobile"
        @click="isMobileDrawerOpen = !isMobileDrawerOpen"
      >
        <i
          class="iconify"
          :data-icon="isMobileDrawerOpen ? 'mdi:close' : 'mdi:menu'"
        />
      </button>
    </div>
  </nav>
</template>

<style></style>
