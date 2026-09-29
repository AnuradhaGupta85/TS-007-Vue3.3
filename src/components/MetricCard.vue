<script setup lang="ts">
defineProps<{ label: string; value: string; tone: 'income' | 'expense' | 'primary' | 'ink' }>()
</script>

<template>
  <article class="rounded-card border border-border bg-surface p-5 shadow-card">
    <p class="text-sm font-medium text-muted">{{ label }}</p>
    <p :class="['mt-3 text-2xl font-bold tabular-nums', tone === 'income' ? 'text-income' : tone === 'expense' ? 'text-expense' : tone === 'primary' ? 'text-primary' : 'text-ink']">{{ value }}</p>
  </article>
</template>
