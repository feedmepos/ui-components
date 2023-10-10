<script setup lang="ts">
type FmProgressIndicatorItem = {
  titleText: string;
  supportingText: string;
  status: 'completed' | 'active' | 'default' | 'error';
  orientation: 'horizontal' | 'vertical';
};

withDefaults(defineProps<FmProgressIndicatorItem>(), {});
</script>

<template>
  <div :class="`fm-pi-item-container fm-pi-item-container--${orientation}`">
    <div class="fm-pi-item-line-container">
      <div
        :class="`fm-pi-item-line fm-pi-item-line--${status} fm-pi-item-line--${orientation}`"
      ></div>
    </div>
    <div class="fm-pi-content-container">
      <div>icon</div>
      <div class="fm-pi-content-text-container">
        <span class="fm-pi-title-text">{{ titleText }}</span>
        <span class="fm-pi-supporting-text">{{ supportingText }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fm-pi-item-line-container {
  align-items: flex-start;
  align-self: stretch;
  &--horizontal {
    height: 18px;
    padding: var(--fm-spacing-system-spacing-8, 8px) var(--fm-spacing-system-spacing-none, 0px);
  }

  &--vertical {
    display: flex;
    padding: var(--fm-spacing-system-spacing-none, 0px) var(--fm-spacing-system-spacing-8, 8px);
    gap: 8px;
  }
}
.fm-pi-item-line {
  align-self: stretch;
  border-radius: 4px 0px 0px 4px;
  &--active {
    background: var(--primary-signature, #ff7823);
  }
  &--default {
    background: #aeaeb2;
  }
  &--vertical {
    width: 2px;
    height: 70px;
  }
  &--horizontal {
    height: 2px;
    flex-shrink: 0;
  }
}

.fm-pi-item-container {
  display: flex;

  gap: var(--fm-spacing-system-spacing-4, 4px);

  &--vertical {
    width: 200px;
    padding: var(--fm-spacing-system-spacing-none, 0px);
    align-items: center;
  }

  &--horizontal {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1 0 0;
  }
}

.fm-pi-content-container {
  display: flex;
  padding: var(--fm-spacing-system-spacing-none, 0px) var(--fm-spacing-system-spacing-16, 16px)
    var(--fm-spacing-system-spacing-none, 0px) var(--fm-spacing-system-spacing-4, 4px);
  align-items: flex-start;
  gap: var(--fm-spacing-system-spacing-12, 12px);
  align-self: stretch;
}

.fm-pi-content-text-container {
  display: flex;
  padding: var(--fm-spacing-system-spacing-none, 0px);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--fm-spacing-system-spacing-4, 4px);
  flex: 1 0 0;
}

.fm-pi-title-text {
  color: var(--fm-color-typo-primary, #1c1c1e);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.08px;
}

.fm-pi-supporting-text {
  overflow: hidden;
  color: var(--fm-color-typo-secondary, #6b6b6b);
  text-overflow: ellipsis;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.24px;
}
</style>
