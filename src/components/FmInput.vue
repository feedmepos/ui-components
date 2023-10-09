<script lang="ts" setup>
type FmButtonProp = {
  /**
   * The label of the button
   */
  label: string;
};

defineProps<FmButtonProp>();
</script>

<template>
  <div>{{ label }}</div>
  <input class="text-fm-color-secondary-macaron" />
</template>
