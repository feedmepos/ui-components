<script setup lang="ts">
import FmButton from '@/components/button/FmButton.vue';
import FmDatePicker from './components/date-picker/FmDatePicker.vue';
import { ref } from 'vue';
import FmBreadcrumb from './components/breadcrumb/FmBreadcrumb.vue';
import FmProgressIndicator from './components/progress-indicator/FmProgressIndicator.vue';
import FmProgressIndicatorItem from './components/progress-indicator/FmProgressIndicatorItem.vue';
// import componentMap from './component-map';
// import { defineAsyncComponent } from 'vue';
// const components = Object.keys(componentMap).reduce((obj: { [k: string]: object }, k) => {
//   obj[k] = defineAsyncComponent(() => import(componentMap[k]));
//   return obj;
// }, {});

const x = ref('');
const disabled = ref(false);
const items = ref([
  { label: 'Home', route: '/', disabled: true },
  { label: 'Marketing', route: '/marketing' },
  { label: 'My campaign', route: '/marketing/campaign' },
  { label: 'Create campaign', route: '/marketing/campaign/create' },
]);
</script>

<template>
  <FmButton label="This is my first button" />
  <div class="p-10">
    <FmDatePicker
      v-model="x"
      label="something"
      :disabled="disabled"
    ></FmDatePicker>
    <div @click="disabled = !disabled">Disable</div>
    <div>{{ x }}</div>
  </div>
  <FmBreadcrumb :items="items"></FmBreadcrumb>
  <FmProgressIndicator orientation="horizontal">
    <FmProgressIndicatorItem
      orientation="horizontal"
      title-text="Title"
      supporting-text="Supporting"
      status="default"
    ></FmProgressIndicatorItem>
    <FmProgressIndicatorItem
      orientation="horizontal"
      title-text="Title"
      supporting-text="Supporting"
      status="default"
    ></FmProgressIndicatorItem>
    <FmProgressIndicatorItem
      orientation="horizontal"
      title-text="Title"
      supporting-text="Supporting"
      status="default"
    ></FmProgressIndicatorItem>
    <FmProgressIndicatorItem
      orientation="horizontal"
      title-text="Title"
      supporting-text="Supporting"
      status="default"
    ></FmProgressIndicatorItem>
  </FmProgressIndicator>
</template>
