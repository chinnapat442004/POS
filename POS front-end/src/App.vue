<script setup lang="ts">
import { useRoute } from 'vue-router'
import FullLayout from './layout/fullLayout.vue'
import MainLayout from './layout/mainLayout.vue'

const route = useRoute()
</script>

<template>
  <component :is="route.meta.layout === 'fullLayout' ? FullLayout : MainLayout"></component>
</template>
