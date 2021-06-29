<script lang="ts">
import { ref, nextTick, watch } from 'vue';
import { defineComponent } from 'vue-demi';
import { useBreakpoints } from '/@/composables';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const props = {
  url: String,
  label: String,
  items: {
    type: Array,
    default: () => [],
  },
  isLast: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'MainNavigationLink',
  props,
  setup(props, { emit }) {
    const { isMobile } = useBreakpoints();

    const isDropdownOpen = ref(false);
    const navBackBtn = ref(null);
    const navDropdown = ref(null);

    const { activate, deactivate } = useFocusTrap(navDropdown);

    function toggleDropdown(value: boolean) {
      isDropdownOpen.value = value || !isDropdownOpen.value;
    }

    function closeMobileDrawer($event) {
      emit('closeMobileDrawer', $event);
    }

    watch(isDropdownOpen, async isOpen => {
      await nextTick();

      if (isOpen && isMobile) {
        navBackBtn?.value?.focus();
        activate();
      } else {
        deactivate();
      }
    });

    function onTab($event) {
      if (props.isLast) {
        emit('closeDropdown');
      }
    }

    function onCloseDropdown() {
      if (!isMobile) {
        toggleDropdown(false);
      }
    }

    return {
      isDropdownOpen,
      isMobile,
      toggleDropdown,
      closeMobileDrawer,
      onTab,
      navBackBtn,
      navDropdown,
    };
  },
});
</script>
<template>
  <li
    role="presentation"
    @keydown.tab="onTab"
    @mouseenter="isMobile ? '' : toggleDropdown(true)"
    @mouseleave="isMobile ? '' : toggleDropdown(false)"
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
        ref="navDropdown"
        class="dropdown bg-white shadow-xl p-4 flex flex-col z-20"
        :class="
          isMobile
            ? 'flex flex-col fixed inset-0 z-20 px-8 py-24 shadow-lg'
            : 'relative w-50 -left-10 rounded-md mt-4 '
        "
        role="menu"
        v-show="isDropdownOpen"
      >
        <button
          class="absolute left-4 top-4  p-4 text-xl"
          v-show="isMobile"
          ref="navBackBtn"
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
        <main-navigation-link
          v-for="(item, $index) of items"
          :url="item.url"
          :label="item.label"
          :items="item.items"
          :isLast="$index === items.length - 1"
          :key="$index"
          @close-dropdown="onCloseDropdown"
        />
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
