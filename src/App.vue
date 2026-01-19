<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="h-screen w-full bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden flex flex-col">
    <header class="h-12 bg-black/20 backdrop-blur-sm flex items-center px-4 justify-between border-b border-white/10 flex-shrink-0">
        <div class="flex items-center gap-4">
            <RouterLink to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <span class="font-bold text-white text-lg tracking-tight">Trello</span>
            </RouterLink>
            <nav class="flex gap-4">
                <RouterLink 
                    to="/about" 
                    class="text-white/80 hover:text-white text-sm font-medium transition-colors"
                    active-class="text-white font-bold"
                >
                    关于
                </RouterLink>
            </nav>
        </div>
        <div class="flex items-center gap-2">
             <div class="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white/20">
                AG
             </div>
        </div>
    </header>
    <main class="flex-1 overflow-hidden relative">
      <RouterView />
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
