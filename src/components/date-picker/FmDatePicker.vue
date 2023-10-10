<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { ref, computed, onMounted, onUnmounted } from 'vue';

export interface Props {
  label: string;
  disabled: boolean;
}

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<Props>(), {
  label: '',
  disabled: false,
});

const calendar = ref<{ date: Dayjs; isCurrentMonth: boolean }[][]>([]);
const _selectedDate = ref<Dayjs | null>(null);
const opened = ref<boolean>(false);
const activeMonth = ref<Dayjs>(dayjs());

const buttonEl = ref<HTMLElement | null>(null);
const dropdownEl = ref<HTMLElement | null>(null);

const selectDate = (date: Dayjs) => {
  _selectedDate.value = date;
  emit('update:modelValue', date.format('YYYY-MM-DD'));
  opened.value = false;
};

const generateCalendar = () => {
  calendar.value = [];
  const firstDayOfMonth = dayjs(activeMonth.value).startOf('month');
  console.log(firstDayOfMonth);
  const lastDayOfMonth = firstDayOfMonth.endOf('month');
  const currentMonth = firstDayOfMonth.month();

  let currentDay = firstDayOfMonth.startOf('week');
  let calendarWeek = [];

  while (currentDay.isBefore(lastDayOfMonth.endOf('week'))) {
    if (currentDay.day() === 0 && calendarWeek.length > 0) {
      calendar.value.push(calendarWeek);
      calendarWeek = [];
    }

    calendarWeek.push({
      date: currentDay,
      isCurrentMonth: currentDay.month() === currentMonth,
    });

    currentDay = currentDay.add(1, 'day');
  }

  if (calendarWeek.length > 0) {
    calendar.value.push(calendarWeek);
  }
};

const handleClick = () => {
  if (props.disabled) return;
  opened.value = !opened.value;
  requestAnimationFrame(() => {
    const buttonRect = buttonEl.value?.getBoundingClientRect();

    dropdownEl.value!.style.top = `${buttonRect!.height + 4}px`;
    dropdownEl.value!.style.left = `0px`;
  });
};

// Auto close when clicking outside element
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleWindowClick = (ev: any) => {
  const path = ev.path || ev.composedPath();
  for (const el of path) {
    if (el == buttonEl.value || el == dropdownEl.value) return;
  }
  opened.value = false;
};

/** @param nextMonth true if next month, false if previous month */
const changeMonth = (nextMonth: boolean) => {
  activeMonth.value = nextMonth
    ? activeMonth.value.add(1, 'month')
    : activeMonth.value.subtract(1, 'month');
  generateCalendar();
};

const namesOfDays = computed(() =>
  Array.from(Array(7), (_empty, i) => dayjs().day(i).format('ddd')),
);

onMounted(() => {
  window.addEventListener('click', handleWindowClick);
  generateCalendar();
});

onUnmounted(() => {
  window.removeEventListener('click', handleWindowClick);
});
</script>

<template>
  <div class="relative">
    <label
      ref="buttonEl"
      @click="handleClick"
    >
      <div
        class="fm-typo-body-lg-400"
        :class="[
          props.disabled
            ? 'text-fm-color-typo-disabled cursor-not-allowed'
            : 'text-fm-color-typo-primary cursor-pointer',
        ]"
      >
        {{ props.label }}
      </div>
      <div
        class="fm-date-picker__container"
        :class="{
          'fm-date-picker__container--opened': opened,
          'fm-date-picker__container--disabled': props.disabled,
        }"
      >
        <div
          class="fm-typo-body-lg-400"
          :class="[
            props.disabled
              ? 'text-fm-color-typo-disabled'
              : _selectedDate
              ? 'text-fm-color-typo-primary'
              : 'text-fm-color-typo-tertiary',
          ]"
        >
          {{ _selectedDate?.format('D MMM YYYY') ?? 'DD MM YYYY' }}
        </div>
      </div>
    </label>
    <!-- Calendar -->
    <div
      ref="dropdownEl"
      class="absolute fm-calendar gap-6 p-3 rounded-2xl shadow-light-300 w-[360px]"
      :class="[opened ? 'block' : 'hidden']"
    >
      <div class="w-full">
        <div class="flex h-10 justify-between p-2">
          <div class="fm-shadow-light-text fm-typo-body-lg-400">
            {{ activeMonth.format('MMMM YYYY') }}
          </div>
          <div class="flex gap-1 items-center justify-center">
            <div
              class="cursor-pointer"
              @click="() => changeMonth(false)"
            >
              B
            </div>
            <div
              class="cursor-pointer"
              @click="() => changeMonth(true)"
            >
              N
            </div>
          </div>
        </div>
        <div>
          <!-- Day Names -->
          <div class="fm-calendar__row fm-typo-body-lg-400 text-fm-color-typo-tertiary">
            <div
              v-for="day in namesOfDays"
              :key="day"
              class="fm-calendar__cell"
            >
              {{ day }}
            </div>
          </div>
          <!-- Week Row -->
          <div>
            <div
              v-for="(week, index) in calendar"
              :key="index"
              class="fm-calendar__row fm-typo-body-lg-400"
            >
              <div
                v-for="day in week"
                :key="day.date.date()"
                class="fm-calendar__cell"
              >
                <button
                  v-if="day.isCurrentMonth"
                  class="fm-calendar__cell__button"
                  :class="{ 'fm-calendar__cell__button--selected': _selectedDate === day.date }"
                  @click="() => selectDate(day.date)"
                >
                  {{ day.date.date() }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fm-date-picker {
  &__container {
    @apply mt-1 rounded-lg h-12;
    @apply border-[1px] border-fm-color-neutral-gray-300;
    @apply py-[11px] px-[7px];
    @apply cursor-pointer;

    &:hover:not(&--opened):not(&--disabled) {
      @apply border-fm-color-neutral-gray-400;
    }

    &--opened {
      @apply border-2 border-fm-color-primary;
      @apply py-[10px] px-[6px];
    }

    &--disabled {
      cursor: not-allowed;
      @apply border-fm-color-neutral-gray-200;
    }
  }
}

.fm-calendar {
  @apply bg-fm-color-neutral-white;

  &__row {
    @apply h-12 w-full flex;
  }

  &__cell {
    @apply h-12 w-12 flex justify-center items-center;

    &__button {
      @apply h-full w-full rounded-full;

      &:hover:not(&--selected) {
        @apply bg-fm-color-opacity-sm;
      }

      &--selected {
        @apply bg-fm-color-primary text-fm-color-neutral-white;
      }
    }
  }
}
</style>
