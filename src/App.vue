<script setup lang="ts">
import BoardCanvas from './components/board/BoardCanvas.vue'
</script>

<template>
  <div class="h-screen w-full bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden flex flex-col">
    <header class="h-12 bg-black/20 backdrop-blur-sm flex items-center px-4 justify-between border-b border-white/10 flex-shrink-0">
        <div class="flex items-center gap-2">
            <span class="font-bold text-white text-lg tracking-tight">TrelloClone</span>
        </div>
        <div class="flex items-center gap-2">
             <div class="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white/20">
                AG
             </div>
        </div>
    </header>
    <main class="flex-1 overflow-hidden relative">
      <BoardCanvas />
    </main>
  </div>
</template>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
}
</style>
