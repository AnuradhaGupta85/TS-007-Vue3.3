<script setup lang="ts">
defineProps<{ open: boolean; title: string; message: string; confirmLabel?: string }>()
defineEmits<{ confirm: []; cancel: [] }>()
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
    <div class="w-full max-w-md rounded-card bg-white p-6 shadow-xl">
      <h2 class="text-lg font-bold text-ink">{{ title }}</h2>
      <p class="mt-2 text-sm leading-6 text-muted">{{ message }}</p>
      <div class="mt-6 flex justify-end gap-3">
        <button class="btn-secondary" @click="$emit('cancel')">Cancel</button>
        <button class="rounded-lg bg-expense px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700" @click="$emit('confirm')">{{ confirmLabel || 'Delete' }}</button>
      </div>
    </div>
  </div>
</template>
