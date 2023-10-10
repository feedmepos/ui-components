<script setup lang="ts">
import FmButton from '@/components/button/FmButton.vue';
import FmDatePicker from './components/date-picker/FmDatePicker.vue';
import { ref } from 'vue';
// import componentMap from './component-map';
// import { defineAsyncComponent } from 'vue';
// const components = Object.keys(componentMap).reduce((obj: { [k: string]: object }, k) => {
//   obj[k] = defineAsyncComponent(() => import(componentMap[k]));
//   return obj;
// }, {});

const x = ref('');
const disabled = ref(false);
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
</template>
