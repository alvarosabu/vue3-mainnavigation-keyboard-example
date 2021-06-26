<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from 'vue-demi';
import { useBreakpoints } from '/@/composables';

const props = {
  url: String,
  label: String,
  items: {
    type: Array,
    default: () => [],
  },
};

export default defineComponent({
  name: 'MainNavigationLink',
  props,
  setup(props, { emit }) {
    const { isMobile } = useBreakpoints();

    const isDropdownOpen = ref(false);

    function toggleDropdown(value: boolean) {
      isDropdownOpen.value = value || !isDropdownOpen.value;
    }

    function closeMobileDrawer($event) {
      emit('closeMobileDrawer', $event);
    }

    return {
      isDropdownOpen,
      isMobile,
      toggleDropdown,
      closeMobileDrawer,
    };
  },
});
</script>
<template>
  <li
    role="presentation"
    class="relative"
    @mouseenter="isMobile ? '' : toggleDropdown(true)"
  >
    <template v-if="items.length > 0">
      <button
        class="navigation-link flex items-center justify-between"
        :class="{ active: isDropdownOpen }"
        aria-haspopup="true"
        :aria-expanded="isDropdownOpen"
        @click="toggleDropdown()"
      >
        {{ label }}

        <i v-show="isMobile" class="iconify" data-icon="mdi:chevron-right" />
      </button>
      <div
        class="dropdown  bg-white shadow-xl p-4 flex flex-col z-20"
        :class="
          isMobile
            ? 'flex flex-col fixed inset-0 z-20 px-8 py-24 shadow-lg'
            : 'absolute w-50 -left-15 rounded-md mt-4 '
        "
        role="menu"
        @mouseleave="isMobile ? '' : toggleDropdown(false)"
        v-show="isDropdownOpen"
      >
        <main-navigation-link
          v-for="(item, $index) of items"
          :url="item.url"
          :label="item.label"
          :items="item.items"
          :key="$index"
        />
        <button
          class="absolute left-4 top-4  p-4 text-xl"
          v-show="isMobile"
          @click="isDropdownOpen = false"
        >
          <i class="iconify" data-icon="mdi:chevron-left" />
        </button>
        <button
          class="absolute right-4 top-4  p-4 text-xl"
          v-show="isMobile"
          @click="closeMobileDrawer"
        >
          <i class="iconify" data-icon="mdi:close" />
        </button>
      </div>
    </template>
    <router-link class="navigation-link" role="menuitem" v-else :to="url">{{
      label
    }}</router-link>
  </li>
</template>

<style>
.navigation-link {
  @apply w-full text-left px-4 py-2 inline-block border-b-2 border-transparent hover:border-blue-400 focus:border-blue-400;
}

.navigation-link.active {
  @apply border-blue-400;
}
</style>
