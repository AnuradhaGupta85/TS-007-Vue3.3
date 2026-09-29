<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: 'home' },
  { label: 'Transactions', to: '/transactions', icon: 'arrows' },
  { label: 'Categories', to: '/categories', icon: 'tag' },
  { label: 'Monthly Summary', to: '/summary', icon: 'chart' },
]
</script>

<template>
  <button
    class="fixed left-4 top-4 z-30 rounded-lg bg-ink p-2 text-white lg:hidden"
    aria-label="Toggle navigation"
    @click="isOpen = !isOpen"
  >
    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
  </button>
  <aside :class="['fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-ink px-4 py-6 text-slate-300 transition-transform lg:translate-x-0', isOpen ? 'translate-x-0' : '-translate-x-full']">
    <RouterLink to="/dashboard" class="mb-10 flex items-center gap-3 px-3 text-xl font-bold text-white" @click="isOpen = false">
      <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">$</span>
      Pennywise
    </RouterLink>
    <nav class="space-y-1">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        active-class="bg-white/10 text-white"
        class="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-white/5 hover:text-white"
        @click="isOpen = false"
      >
        <svg v-if="item.icon === 'home'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z" /></svg>
        <svg v-else-if="item.icon === 'arrows'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6-1v12m0 0l-4-4m4 4l4-4" /></svg>
        <svg v-else-if="item.icon === 'tag'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M3 3h7l11 11-7 7L3 10V3z" /></svg>
        <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 19V5m0 14h16M8 17v-5m4 5V7m4 10v-8" /></svg>
        {{ item.label }}
      </RouterLink>
    </nav>
    <div class="mt-auto rounded-xl border border-white/10 bg-white/5 p-3 text-xs leading-5 text-slate-400">
      Track every dollar, build better habits.
    </div>
  </aside>
</template>
