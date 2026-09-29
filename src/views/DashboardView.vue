<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import MetricCard from '../components/MetricCard.vue'
import { useTransactionStore } from '../stores/transactions'
import type { Transaction } from '../types'
import { formatCurrency, formatDate } from '../utils/formatters'

const router = useRouter()
const store = useTransactionStore()
const transactions = ref<Transaction[]>([])
const loading = ref(true)

onMounted(async () => { transactions.value = await store.getAll(); loading.value = false })
const income = computed(() => transactions.value.filter((item) => item.type === 'Income').reduce((sum, item) => sum + item.amount, 0))
const expenses = computed(() => transactions.value.filter((item) => item.type === 'Expense').reduce((sum, item) => sum + item.amount, 0))
const categories = computed(() => Object.entries(transactions.value.filter((item) => item.type === 'Expense').reduce<Record<string, number>>((all, item) => ({ ...all, [item.category]: (all[item.category] || 0) + item.amount }), {})).sort((first, second) => second[1] - first[1]))
const recent = computed(() => [...transactions.value].sort((first, second) => second.date.localeCompare(first.date)).slice(0, 5))
</script>

<template>
  <section class="mx-auto max-w-7xl p-5 md:p-8 lg:p-10">
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div><h1 class="text-3xl font-bold tracking-tight">Dashboard</h1><p class="mt-1 text-sm text-muted">Your money, at a glance.</p></div>
      <button class="btn-primary gap-2" @click="router.push('/transactions/new')"><span class="text-lg leading-none">+</span> Add transaction</button>
    </div>
    <div v-if="loading" class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"><div v-for="number in 4" :key="number" class="h-28 animate-pulse rounded-card bg-slate-200" /></div>
    <template v-else>
      <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total income" :value="formatCurrency(income)" tone="income" /><MetricCard label="Total expenses" :value="formatCurrency(expenses)" tone="expense" /><MetricCard label="Current balance" :value="formatCurrency(income - expenses)" :tone="income - expenses >= 0 ? 'primary' : 'expense'" /><MetricCard label="Transactions" :value="String(transactions.length)" tone="ink" />
      </div>
      <div class="mt-8 grid gap-6 lg:grid-cols-5">
        <article class="rounded-card border border-border bg-white p-6 shadow-card lg:col-span-2"><h2 class="text-lg font-bold">Spending by category</h2><div v-if="categories.length" class="mt-6 space-y-5"><div v-for="[category, total] in categories" :key="category"><div class="mb-2 flex justify-between text-sm"><span>{{ category }}</span><span class="font-semibold">{{ formatCurrency(total) }}</span></div><div class="h-2 overflow-hidden rounded-full bg-slate-100"><div class="h-full rounded-full bg-primary" :style="{ width: `${Math.max(8, (total / expenses) * 100)}%` }" /></div></div></div><p v-else class="mt-6 text-sm text-muted">No expense categories to show yet.</p></article>
        <article class="rounded-card border border-border bg-white p-6 shadow-card lg:col-span-3"><div class="flex items-center justify-between"><h2 class="text-lg font-bold">Recent transactions</h2><button class="text-sm font-semibold text-primary hover:underline" @click="router.push('/transactions')">View all</button></div><div v-if="recent.length" class="mt-4 divide-y divide-border"><button v-for="transaction in recent" :key="transaction.id" class="flex w-full items-center justify-between py-4 text-left hover:bg-slate-50" @click="router.push(`/transactions/${transaction.id}/edit`)"><div><p class="font-medium">{{ transaction.description }}</p><p class="mt-1 text-xs text-muted">{{ transaction.category }} · {{ formatDate(transaction.date) }}</p></div><span :class="transaction.type === 'Income' ? 'text-income' : 'text-expense'" class="font-bold tabular-nums">{{ transaction.type === 'Income' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}</span></button></div><div v-else class="py-10 text-center text-sm text-muted">No transactions yet — add your first one.</div></article>
      </div>
    </template>
  </section>
</template>
