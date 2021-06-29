<script lang="ts">
import { defineComponent, ref, watch, nextTick } from 'vue';
import MainNavigationLink from './MainNavigationLink.vue';
import { useBreakpoints } from '/@/composables';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

export default defineComponent({
  components: { MainNavigationLink },
  name: 'MainNavigation',
  setup() {
    const { isMobile } = useBreakpoints();

    const isMobileDrawerOpen = ref(false);
    const navCloseBtn = ref(null);
    const navMenu = ref(null);

    const { activate, deactivate } = useFocusTrap(navMenu);
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
      {
        url: '/about',
        label: 'About',
      },
    ]);

    watch(isMobileDrawerOpen, async isOpen => {
      await nextTick();

      if (isOpen && isMobile) {
        navCloseBtn?.value?.focus();
        activate();
      } else {
        deactivate();
      }
    });
    return {
      isMobileDrawerOpen,
      menu,
      isMobile,
      navCloseBtn,
      navMenu,
    };
  },
});
</script>
<template>
  <nav class="w-full h-14 shadow-lg ">
    <div
      class="container mx-auto flex py-2 items-start justify-between"
      :class="{ 'px-4': isMobile }"
    >
      <img alt="Vitesome logo" class="w-12" src="imagotype.svg" />

      <ul
        class="navigation-menu"
        ref="navMenu"
        :class="
          isMobile
            ? 'flex flex-col fixed inset-0 z-10 px-8 py-16 bg-white shadow-lg'
            : 'flex items-start'
        "
        v-show="isMobileDrawerOpen || !isMobile"
        role="menubar"
      >
        <button
          class="absolute right-4 top-4 p-4 text-xl z-10"
          ref="navCloseBtn"
          v-show="isMobile"
          @click="isMobileDrawerOpen = false"
        >
          <i class="iconify" data-icon="mdi:close" />
        </button>
        <main-navigation-link
          v-for="(item, $index) of menu"
          :url="item.url"
          :label="item.label"
          :items="item.items"
          :key="$index"
          @close-mobile-drawer="isMobileDrawerOpen = false"
        />
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

<style>
.navigation-menu > li {
  @media (min-width: 1024px) {
    max-width: 100px;
  }
}
</style>
