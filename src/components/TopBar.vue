<script setup lang="ts">
import { onMounted, ref } from 'vue'

const savedTheme = localStorage.getItem('expense_tracker_theme')
const isDark = ref(savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches)

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('expense_tracker_theme', isDark.value ? 'dark' : 'light')
}

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme()
}

onMounted(applyTheme)
</script>

<template>
  <header class="flex h-20 items-center justify-between border-b border-border bg-white px-6 lg:px-10">
    <div class="pl-10 lg:pl-0">
      <p class="text-xs font-medium uppercase tracking-wider text-muted">Personal finance</p>
      <p class="text-sm font-semibold text-ink">Keep your money in focus</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="theme-toggle" type="button" :aria-pressed="isDark" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'" @click="toggleTheme">
        <svg v-if="isDark" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36-1.41 1.41M7.05 16.95l-1.41 1.41m12.73 0-1.41-1.41M7.05 7.05 5.64 5.64M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 1015.354 20.354z" /></svg>
      </button>
      <div class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-primary">PW</div>
    </div>
  </header>
</template>
