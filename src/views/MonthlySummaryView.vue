<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MetricCard from '../components/MetricCard.vue'
import { useTransactionStore } from '../stores/transactions'
import type { Transaction } from '../types'
import { formatCurrency } from '../utils/formatters'

const store = useTransactionStore()
const transactions = ref<Transaction[]>([])
const loading = ref(true)
const month = ref(new Date().toISOString().slice(0, 7))
const year = ref(new Date().getFullYear())

onMounted(async () => {
  transactions.value = await store.getAll()
  loading.value = false
})

const filtered = computed(() => transactions.value.filter((transaction) => transaction.date.startsWith(month.value)))
const income = computed(() => filtered.value.filter((item) => item.type === 'Income').reduce((sum, item) => sum + item.amount, 0))
const expenses = computed(() => filtered.value.filter((item) => item.type === 'Expense').reduce((sum, item) => sum + item.amount, 0))
const breakdown = computed(() => Object.entries(filtered.value.filter((item) => item.type === 'Expense').reduce<Record<string, number>>((all, item) => ({ ...all, [item.category]: (all[item.category] || 0) + item.amount }), {})).sort((first, second) => second[1] - first[1]))
const years = computed(() => [...new Set([new Date().getFullYear(), ...transactions.value.map((item) => Number(item.date.slice(0, 4)))])].sort((first, second) => second - first))
const monthlyTrend = computed(() => Array.from({ length: 12 }, (_, index) => {
  const key = `${year.value}-${String(index + 1).padStart(2, '0')}`
  const items = transactions.value.filter((item) => item.date.startsWith(key))
  const income = items.filter((item) => item.type === 'Income').reduce((sum, item) => sum + item.amount, 0)
  const expenses = items.filter((item) => item.type === 'Expense').reduce((sum, item) => sum + item.amount, 0)
  return { key, label: new Date(year.value, index).toLocaleDateString(undefined, { month: 'short' }), income, expenses, balance: income - expenses }
}))
const trendMaximum = computed(() => Math.max(1, ...monthlyTrend.value.flatMap((item) => [item.income, item.expenses])))
</script>

<template>
  <section class="mx-auto max-w-6xl p-5 md:p-8 lg:p-10">
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><h1 class="text-3xl font-bold">Monthly summary</h1><p class="mt-1 text-sm text-muted">See where your money went this month.</p></div>
      <label class="text-sm font-semibold">Month<input v-model="month" type="month" class="form-input"></label>
    </div>
    <div v-if="loading" class="mt-8 h-32 animate-pulse rounded-card bg-slate-200" />
    <template v-else>
      <div class="mt-8 grid gap-4 sm:grid-cols-3"><MetricCard label="Income" :value="formatCurrency(income)" tone="income" /><MetricCard label="Expenses" :value="formatCurrency(expenses)" tone="expense" /><MetricCard label="Balance" :value="formatCurrency(income - expenses)" :tone="income - expenses >= 0 ? 'primary' : 'expense'" /></div>
      <article class="mt-8 rounded-card border border-border bg-white p-6 shadow-card">
        <h2 class="text-lg font-bold">Expense breakdown</h2>
        <div v-if="breakdown.length" class="mt-6 space-y-5"><div v-for="[category, amount] in breakdown" :key="category"><div class="flex justify-between text-sm"><span>{{ category }}</span><span class="font-semibold">{{ formatCurrency(amount) }}</span></div><div class="mt-2 h-2 rounded-full bg-slate-100"><div class="h-full rounded-full bg-primary" :style="{ width: `${Math.max(8, (amount / expenses) * 100)}%` }" /></div></div></div>
        <div v-else class="py-12 text-center"><p class="font-semibold">No transactions for this month</p><p class="mt-1 text-sm text-muted">Choose another month or add a transaction.</p></div>
      </article>
      <article class="mt-8 rounded-card border border-border bg-white p-6 shadow-card">
        <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 class="text-lg font-bold">Yearly trend</h2><p class="mt-1 text-sm text-muted">Compare income and expenses across every month.</p></div><label class="text-sm font-semibold">Year<select v-model.number="year" class="form-input"><option v-for="option in years" :key="option" :value="option">{{ option }}</option></select></label></div>
        <div class="mt-8 overflow-x-auto"><div class="grid min-w-[620px] grid-cols-12 items-end gap-3" style="height: 220px"><div v-for="item in monthlyTrend" :key="item.key" class="flex h-full flex-col justify-end"><div class="flex flex-1 items-end justify-center gap-1"><span class="w-3 rounded-t bg-income" :style="{ height: `${(item.income / trendMaximum) * 100}%` }" :title="`${item.label} income: ${formatCurrency(item.income)}`" /><span class="w-3 rounded-t bg-expense" :style="{ height: `${(item.expenses / trendMaximum) * 100}%` }" :title="`${item.label} expenses: ${formatCurrency(item.expenses)}`" /></div><span class="mt-2 text-center text-xs font-medium text-muted">{{ item.label }}</span></div></div></div>
        <div class="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted"><span class="inline-flex items-center gap-2"><i class="h-2.5 w-2.5 rounded-full bg-income" />Income</span><span class="inline-flex items-center gap-2"><i class="h-2.5 w-2.5 rounded-full bg-expense" />Expenses</span></div>
        <div class="mt-5 grid gap-2 border-t border-border pt-4 text-sm sm:grid-cols-3"><div v-for="item in monthlyTrend" :key="`${item.key}-details`" class="flex justify-between rounded-lg bg-slate-50 px-3 py-2"><span>{{ item.label }}</span><span :class="item.balance >= 0 ? 'text-income' : 'text-expense'" class="font-semibold">{{ formatCurrency(item.balance) }}</span></div></div>
      </article>
    </template>
  </section>
</template>
