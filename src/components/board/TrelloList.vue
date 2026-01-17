<script setup lang="ts">
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import type { List, Card } from '../../stores/board'
import TrelloCard from './TrelloCard.vue'
import { Plus, MoreHorizontal } from 'lucide-vue-next'
import { useBoardStore } from '../../stores/board'

const props = defineProps<{
  list: List
}>()

const store = useBoardStore()
const isAddingCard = ref(false)
const newCardTitle = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const cards = computed({
  get: () => props.list.cards,
  set: (val: Card[]) => {
    store.updateCardOrder(props.list.id, val)
  }
})

const startAddingCard = () => {
  isAddingCard.value = true
  setTimeout(() => {
    textareaRef.value?.focus()
  }, 0)
}

const addCard = () => {
  if (!newCardTitle.value.trim()) {
    isAddingCard.value = false
    return
  }
  store.addCard(props.list.id, newCardTitle.value)
  newCardTitle.value = ''
  isAddingCard.value = false // or keep open to add more
}

const cancelAddCard = () => {
  isAddingCard.value = false
  newCardTitle.value = ''
}
</script>

<template>
  <div class="trello-list flex flex-col w-72 max-h-full bg-gray-100 rounded-xl mr-4 flex-shrink-0 shadow-md">
    <!-- Header -->
    <div class="p-3 flex justify-between items-center cursor-pointer handle">
      <h3 class="font-semibold text-gray-700 text-sm pl-1">{{ list.title }}</h3>
      <button class="p-1 hover:bg-gray-300 rounded text-gray-500">
        <MoreHorizontal class="w-4 h-4" />
      </button>
    </div>

    <!-- Cards Area -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden px-2 min-h-2">
      <draggable
        v-model="cards"
        group="cards"
        item-key="id"
        ghost-class="ghost-card"
        drag-class="drag-card"
        :animation="200"
        class="flex flex-col gap-0 h-full min-h-[10px]"
      >
        <template #item="{ element }">
          <TrelloCard :card="element" />
        </template>
      </draggable>
      
      <!-- Add Card Form -->
      <div v-if="isAddingCard" class="bg-white rounded-lg shadow-sm p-2 mb-2 border border-blue-500">
        <textarea
          ref="textareaRef"
          v-model="newCardTitle"
          class="w-full resize-none text-sm outline-none text-gray-700"
          placeholder="Enter a title for this card..."
          rows="3"
          @keydown.enter.prevent="addCard"
          @keydown.esc="cancelAddCard"
        ></textarea>
        <div class="flex items-center gap-2 mt-2">
          <button 
            @click="addCard"
            class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 px-3 rounded transition-colors"
          >
            Add Card
          </button>
          <button @click="cancelAddCard" class="text-gray-500 hover:text-gray-700">
            <Plus class="w-5 h-5 rotate-45" />
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="!isAddingCard" class="p-2 pt-1">
      <button 
        @click="startAddingCard"
        class="w-full flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg text-gray-600 text-sm transition-colors text-left"
      >
        <Plus class="w-4 h-4" />
        <span>Add a card</span>
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.trello-list {
  background-color: #f1f2f4; // Trello-ish gray
}

.ghost-card {
  opacity: 0.5;
  background: #c1c1c1;
  border: 1px dashed #444;
}

.drag-card {
  transform: rotate(2deg);
}

/* Custom Scrollbar for list */
.overflow-y-auto {
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bdc3c7;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
}
</style>
