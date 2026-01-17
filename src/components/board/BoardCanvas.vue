<script setup lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable' // Ensure this dependency acts correctly
import { useBoardStore } from '../../stores/board'
import TrelloList from './TrelloList.vue'
import { Plus } from 'lucide-vue-next'

const store = useBoardStore()

const lists = computed({
  get: () => store.board.lists,
  set: (val) => {
    store.updateListOrder(val)
  }
})

const isAddingList = ref(false)
const newListTitle = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const startAddingList = () => {
  isAddingList.value = true
  setTimeout(() => inputRef.value?.focus(), 0)
}

const addList = () => {
    if(!newListTitle.value.trim()) {
        isAddingList.value = false
        return
    }
    store.addList(newListTitle.value)
    newListTitle.value = ''
    isAddingList.value = false
}

const cancelAddList = () => {
    isAddingList.value = false
    newListTitle.value = ''
}
</script>

<template>
  <div class="flex-1 overflow-x-auto overflow-y-hidden h-full">
    <div class="inline-flex h-full items-start px-4 pb-4">
      <draggable
        v-model="lists"
        group="lists"
        item-key="id"
        handle=".handle"
        :animation="200"
        class="flex h-full items-start"
        ghost-class="ghost-list"
      >
        <template #item="{ element }">
          <TrelloList :list="element" />
        </template>
      </draggable>

      <!-- Add List Button -->
      <div 
        v-if="!isAddingList"
        @click="startAddingList"
        class="w-72 bg-white/20 hover:bg-white/30 cursor-pointer rounded-xl p-3 flex items-center gap-2 text-white transition-colors h-auto flex-shrink-0 backdrop-blur-sm"
      >
        <Plus class="w-5 h-5" />
        <span class="font-medium text-sm">Add another list</span>
      </div>

      <!-- Add List Form -->
      <div v-else class="w-72 bg-gray-100 rounded-xl p-2 flex-shrink-0 shadow-lg">
         <input
            ref="inputRef"
            v-model="newListTitle"
            placeholder="Enter list title..."
            class="w-full px-2 py-1.5 text-sm border-2 border-blue-500 rounded outline-none mb-2"
            @keydown.enter="addList"
            @keydown.esc="cancelAddList"
         />
         <div class="flex items-center gap-2">
            <button 
                @click="addList"
                class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-3 rounded"
            >
                Add list
            </button>
            <button @click="cancelAddList" class="text-gray-500 hover:text-gray-700">
                <Plus class="w-6 h-6 rotate-45" />
            </button>
         </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ghost-list {
  opacity: 0.5;
}

/* Custom Scrollbar for horizontal scrolling */
.overflow-x-auto {
  &::-webkit-scrollbar {
    height: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
