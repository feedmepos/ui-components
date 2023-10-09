<script lang="ts" setup>
import { computed } from 'vue';

type FmButtonProp = {
  /**
   * The label of the button
   */
  label: string;
  /**
   * primary or secondary button
   */
  primary?: boolean;
  /**
   * size of the button
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * background color of the button
   */
  backgroundColor?: string;
};

const props = withDefaults(defineProps<FmButtonProp>(), { primary: false });

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const style = computed(() => ({
  backgroundColor: props.backgroundColor,
}));

const onClick = () => {
  emit('click', 1);
};
</script>

<template>
  <button
    type="button"
    class="fm font-bold text-3xl text-fm-color-oatmeal underline"
    :style="style"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>
