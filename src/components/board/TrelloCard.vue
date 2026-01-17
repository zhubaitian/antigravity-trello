<script setup lang="ts">
import type { Card } from '../../stores/board'
import { Pencil } from 'lucide-vue-next'

defineProps<{
  card: Card
}>()
</script>

<template>
  <div class="trello-card group relative bg-white p-3 rounded-lg shadow-sm mb-2 cursor-pointer hover:bg-gray-50 border border-gray-200">
    <div class="flex justify-between items-start">
      <span class="text-sm font-medium text-gray-700">{{ card.title }}</span>
      <button class="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded text-gray-500 transition-opacity">
        <Pencil class="w-3 h-3" />
      </button>
    </div>
    <div v-if="card.labels?.length" class="flex gap-1 mt-2 flex-wrap">
      <span 
        v-for="label in card.labels" 
        :key="label"
        class="h-2 w-8 rounded-full bg-red-400 block"
      ></span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.trello-card {
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-1px);
  }
}
</style>
