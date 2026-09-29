<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MetricCard from '../components/MetricCard.vue'
import { useTransactionStore } from '../stores/transactions'
import type { Transaction } from '../types'
import { formatCurrency } from '../utils/formatters'

const store = useTransactionStore(); const transactions = ref<Transaction[]>([]); const loading = ref(true); const month = ref(new Date().toISOString().slice(0, 7))
onMounted(async () => { transactions.value = await store.getAll(); loading.value = false })
const filtered = computed(() => transactions.value.filter((transaction) => transaction.date.startsWith(month.value)))
const income = computed(() => filtered.value.filter((item) => item.type === 'Income').reduce((sum, item) => sum + item.amount, 0)); const expenses = computed(() => filtered.value.filter((item) => item.type === 'Expense').reduce((sum, item) => sum + item.amount, 0))
const breakdown = computed(() => Object.entries(filtered.value.filter((item) => item.type === 'Expense').reduce<Record<string, number>>((all, item) => ({ ...all, [item.category]: (all[item.category] || 0) + item.amount }), {})).sort((first, second) => second[1] - first[1]))
</script>

<template><section class="mx-auto max-w-6xl p-5 md:p-8 lg:p-10"><div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 class="text-3xl font-bold">Monthly summary</h1><p class="mt-1 text-sm text-muted">See where your money went this month.</p></div><label class="text-sm font-semibold">Month<input v-model="month" type="month" class="form-input"></label></div><div v-if="loading" class="mt-8 h-32 animate-pulse rounded-card bg-slate-200" /><template v-else><div class="mt-8 grid gap-4 sm:grid-cols-3"><MetricCard label="Income" :value="formatCurrency(income)" tone="income" /><MetricCard label="Expenses" :value="formatCurrency(expenses)" tone="expense" /><MetricCard label="Balance" :value="formatCurrency(income - expenses)" :tone="income - expenses >= 0 ? 'primary' : 'expense'" /></div><article class="mt-8 rounded-card border border-border bg-white p-6 shadow-card"><h2 class="text-lg font-bold">Expense breakdown</h2><div v-if="breakdown.length" class="mt-6 space-y-5"><div v-for="[category, amount] in breakdown" :key="category"><div class="flex justify-between text-sm"><span>{{ category }}</span><span class="font-semibold">{{ formatCurrency(amount) }}</span></div><div class="mt-2 h-2 rounded-full bg-slate-100"><div class="h-full rounded-full bg-primary" :style="{ width: `${Math.max(8, (amount / expenses) * 100)}%` }" /></div></div></div><div v-else class="py-12 text-center"><p class="font-semibold">No transactions for this month</p><p class="mt-1 text-sm text-muted">Choose another month or add a transaction.</p></div></article></template></section></template>
