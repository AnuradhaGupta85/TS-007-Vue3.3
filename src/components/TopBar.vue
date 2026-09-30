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
      <a
        href="https://web.whatsapp.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-white px-3 text-sm font-semibold text-ink transition hover:bg-slate-50"
        aria-label="Open WhatsApp Web"
      >
        <svg class="h-4 w-4 text-income" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0012.07 0C5.51 0 .17 5.34.17 11.9c0 2.1.55 4.15 1.6 5.95L.07 24l6.31-1.66a11.9 11.9 0 005.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.44-8.36zM12.07 21.8a9.9 9.9 0 01-5.05-1.38l-.36-.21-3.75.99 1-3.65-.23-.38a9.87 9.87 0 01-1.52-5.27c0-5.48 4.46-9.94 9.94-9.94 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 012.9 7.02c0 5.48-4.46 9.94-9.94 9.94zm5.45-7.45c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47a8.97 8.97 0 01-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.2 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.48 1.69.61.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" /></svg>
        <span class="hidden sm:inline">WhatsApp Web</span>
      </a>
      <a
        href="https://web.telegram.org/"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-white px-3 text-sm font-semibold text-ink transition hover:bg-slate-50"
        aria-label="Open Telegram Web"
      >
        <svg class="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.04 15.37l-.37 5.2c.53 0 .76-.23 1.04-.5l2.5-2.4 5.18 3.8c.95.53 1.62.25 1.88-.88l3.4-15.93h.01c.3-1.4-.51-1.95-1.44-1.6L1.26 10.78C-.1 11.31-.08 12.07 1.03 12.41l5.11 1.6L18 6.6c.56-.37 1.07-.16.65.21z" /></svg>
        <span class="hidden sm:inline">Telegram</span>
      </a>
      <button class="theme-toggle" type="button" :aria-pressed="isDark" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'" @click="toggleTheme">
        <svg v-if="isDark" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36-1.41 1.41M7.05 16.95l-1.41 1.41m12.73 0-1.41-1.41M7.05 7.05 5.64 5.64M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 1015.354 20.354z" /></svg>
      </button>
      <div class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-primary">PW</div>
    </div>
  </header>
</template>
