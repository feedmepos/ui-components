<script setup lang="ts">
type FmProgressIndicatorProp = {
  orientation: 'horizontal' | 'vertical';
};

withDefaults(defineProps<FmProgressIndicatorProp>(), {});
</script>

<template>
  <div :class="`fm-pi-container fm-pi-container--${orientation}`">
    <slot class="fm-pi-slot-container" />
  </div>
</template>

<style lang="scss">
.fm-pi-container {
  display: flex;
  width: 100%;
  align-items: flex-start;

  &--vertical {
    padding: var(--fm-spacing-system-spacing-none, 0px) var(--fm-spacing-system-spacing-24, 24px);
    flex-direction: column;
    gap: var(--fm-spacing-system-spacing-none, 0px);
  }

  &--horizontal {
    padding: var(--fm-spacing-system-spacing-12, 12px) var(--fm-spacing-system-spacing-24, 24px)
      var(--fm-spacing-system-spacing-24, 24px) var(--fm-spacing-system-spacing-24, 24px);
  }
}

.fm-pi-slot-container {
  display: flex;
  padding: var(--fm-spacing-system-spacing-none, 0px);
  align-items: flex-start;
  gap: var(--fm-spacing-system-spacing-none, 0px);
  align-self: stretch;
}
</style>
