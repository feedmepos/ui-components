<!-- eslint-disable @typescript-eslint/no-duplicate-enum-values -->
<script setup lang="ts">
import { type Ref, onBeforeMount, ref } from 'vue';

enum Color {
  'primary' = '#FFFFFF',
  'secondary' = '#1C1C1E',
  'tertiary' = '#FF7823',
  'destructive' = '#FFFFFF',
  'fab' = '#FFFFFF',
}

export interface Props {
  label?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'fab';
  size?: 'lg' | 'md';
  disabled?: boolean;
  autofocus?: boolean;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  variant: 'tertiary',
  size: 'lg',
  disabled: false,
  autofocus: false,
  icon: '',
});

const activeIcon: Ref<string> = ref(props.icon);
const filledIcon: Ref<string> = ref('');
let buttonEl: HTMLElement;

const mouseDown = (event: MouseEvent) => {
  if (filledIcon.value) activeIcon.value = filledIcon.value;

  // const button = event.composedPath()[0].classList.value.includes("fm-btn")
  //   ? event.composedPath()[0]
  //   : event.composedPath()[1];
  // const buttonClient = button.getBoundingClientRect();
  const buttonClient = buttonEl.getBoundingClientRect();
  const circle = document.createElement('span');
  const diameter = Math.max(buttonClient.width, buttonClient.height);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - buttonClient.x - radius}px`;
  circle.style.top = `${event.clientY - buttonClient.y - radius}px`;
  circle.classList.add('ripple');
  // button.appendChild(circle);

  const ripple = buttonEl.getElementsByClassName('ripple')[0];
  if (ripple) {
    ripple.remove();
  }
  buttonEl.appendChild(circle);
};

const mouseUp = () => {
  if (filledIcon.value) {
    activeIcon.value = filledIcon.value.replace('-filled-', '-outlined-');
  }
};

const getFilledIcon = (iconName: string) => {
  filledIcon.value = iconName.replace('-outlined-', '-filled-');
};

onBeforeMount(() => {
  if (props.icon && props.icon.includes('-outlined-')) {
    getFilledIcon(props.icon);
  }
});
</script>

<template>
  <button
    ref="buttonEl"
    :class="`
      fm-btn rounded-2xl
      fm-btn--${size}
      ${!label ? `fm-btn--${size}--just-icon` : ''}
      fm-btn--${variant}
    `"
    :disabled="disabled"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
  >
    <fm-icon
      v-if="icon"
      :name="icon"
      size="md"
      :color="disabled ? '#C7C7CC' : Color[variant]"
    ></fm-icon>
    <span
      v-if="label"
      class="fm-typo-body-lg-700"
      >{{ label }}</span
    >
  </button>
</template>

<style lang="scss" scoped>
.fm-btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;

  // span won't align nicely without these
  & > span {
    height: 24px;
  }

  &--primary {
    @apply text-fm-color-typo-white;
    @apply bg-fm-color-primary;

    &:disabled {
      @extend .fm-btn--disabled;
    }
  }

  &--secondary {
    @apply text-fm-color-typo-primary;
    background-color: transparent;
    @apply border-fm-color-neutral-black;
    border: 1px solid;

    &:disabled {
      cursor: not-allowed;
      @apply text-fm-color-neutral-gray-200;
      @apply border-fm-color-neutral-gray-200;
      @apply bg-fm-color-neutral-white;
    }
  }

  &--tertiary {
    @apply text-fm-color-primary;
    background-color: transparent;

    &:disabled {
      cursor: not-allowed;
      @apply text-fm-color-neutral-gray-200;
      @apply bg-fm-color-neutral-white;
    }
  }

  &--destructive {
    @apply text-fm-color-typo-white;
    @apply bg-fm-color-system-error-300;

    &:disabled {
      @extend .fm-btn--disabled;
    }
  }

  &--fab {
    @apply text-fm-color-typo-white;
    @apply rounded-full;
    @apply bg-fm-color-primary;
    padding: 16px !important;
    min-height: 56px;
    min-width: 56px;

    &:disabled {
      @extend .fm-btn--disabled;
    }
  }
}

// States
.fm-btn {
  &:hover:before {
    content: '';
    @apply bg-fm-color-opacity-sm;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
}

// Sizes
.fm-btn {
  &--md {
    height: 40px;
    padding: 8px 16px;

    &--just-icon {
      padding: 8px;
    }
  }

  &--lg {
    height: 48px;
    padding: 12px 16px;

    &--just-icon {
      padding: 12px;
    }
  }
}

// Icon
.fm-btn--icon {
  height: 24px;
  width: 24px;
  padding: 2px;
}

.fm-btn:deep(span.ripple) {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 1s forwards;
  background-color: rgba(0, 0, 0, 0.08);
  pointer-events: none;
}

@keyframes ripple {
  30% {
    transform: scale(4);
    opacity: 1;
  }

  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.fm-btn--disabled {
  @apply bg-fm-color-neutral-gray-100;
  cursor: not-allowed;
  @apply text-fm-color-neutral-gray-200;
}
</style>
