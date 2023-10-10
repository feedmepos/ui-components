<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

type FmBreadcrumbProp = {
  /**
   * The breadcrumb items array that consists of label, route, and disabled property
   */
  items: Array<{
    label: string;
    route: string;
    disabled?: boolean;
  }>;
};

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await router.isReady();
  const itemIndex = props.items.findIndex((x) => {
    return x.route == route.path;
  });
  if (itemIndex != -1 && !props.items[itemIndex].disabled) {
    selectedItemIndex.value = itemIndex;
  }
});

const props = withDefaults(defineProps<FmBreadcrumbProp>(), {});

const selectedItemIndex = ref(-1);
const hoveredItemIndex = ref(-1);

const separatorText = ref(' / ');
const ellipsisText = ref('... /');
const ellipsisVisible = ref(false);

const getStateClass = (index: number) => {
  if (selectedItemIndex.value === index) {
    return 'selected';
  } else if (hoveredItemIndex.value === index) {
    return 'hovered';
  } else if (props.items[index].disabled) {
    return 'disabled';
  } else {
    return 'default';
  }
};

const navigate = (index: number) => {
  if (!props.items[index].disabled) {
    selectedItemIndex.value = index;
  }
};

const displaySeparator = (index: number) => {
  return index != props.items.length - 1;
};

const shouldTruncate = (index: number) => {
  return (
    !ellipsisVisible.value && props.items.length > 5 && index >= 2 && index < props.items.length - 2
  );
};

const toggleEllipsis = () => {
  ellipsisVisible.value = !ellipsisVisible.value;
};
</script>

<template>
  <nav>
    <ul class="content-start flex flex-wrap gap-0 items-start max-w-full p-0">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="empty:hidden flex gap-2 items-center justify-center pl-2 pr-0 py-1"
        @mouseenter="hoveredItemIndex = index"
        @mouseleave="hoveredItemIndex = -1"
      >
        <RouterLink
          v-if="!shouldTruncate(index)"
          :class="getStateClass(index)"
          :to="item.disabled ? '' : item.route"
          @click="navigate(index)"
        >
          <span>{{ item.label }}</span>
          <span v-if="displaySeparator(index)">
            {{ separatorText }}
          </span>
        </RouterLink>

        <a
          v-else-if="index === 3 && !ellipsisVisible"
          @click="toggleEllipsis"
        >
          {{ ellipsisText }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style>
.hovered {
  border-radius: 4px;
  background: rgba(28, 28, 30, 0.08);
}

.selected {
  color: #ff7823;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.08px;
}

.disabled {
  color: #c7c7cc;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.08px;
}
</style>
