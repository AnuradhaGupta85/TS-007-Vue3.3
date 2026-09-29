<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import TransactionForm from '../components/TransactionForm.vue'
import { useTransactionStore } from '../stores/transactions'
import type { Transaction, TransactionInput } from '../types'

const toast = getCurrentInstance()!.appContext.config.globalProperties.$toast as { success: (message: string) => void }
const route = useRoute(); const router = useRouter(); const store = useTransactionStore(); const existing = ref<Transaction | null>(null); const loading = ref(Boolean(route.params.id))
const isEdit = computed(() => Boolean(route.params.id))
onMounted(async () => { if (route.params.id) { existing.value = await store.getById(route.params.id as string); loading.value = false } })
async function save(input: TransactionInput) { if (isEdit.value) { await store.update(route.params.id as string, input); toast.success('Transaction updated.'); } else { await store.create(input); toast.success('Transaction added.'); }; router.push('/transactions') }
</script>

<template><section class="mx-auto max-w-3xl p-5 md:p-8 lg:p-10"><button class="mb-5 text-sm font-semibold text-primary" @click="router.back()">← Back to transactions</button><h1 class="text-3xl font-bold">{{ isEdit ? 'Edit transaction' : 'Add transaction' }}</h1><p class="mt-1 text-sm text-muted">{{ isEdit ? 'Update this financial record.' : 'Capture income or an expense.' }}</p><div v-if="loading" class="mt-8 h-96 animate-pulse rounded-card bg-slate-200" /><TransactionForm v-else-if="!isEdit || existing" class="mt-8" :initial="existing || undefined" :submit-label="isEdit ? 'Save changes' : 'Save transaction'" @submit="save" /><div v-else class="mt-8 rounded-card bg-white p-8 text-center shadow-card"><p>Transaction not found.</p><button class="mt-4 text-primary" @click="router.push('/transactions')">Return to transactions</button></div></section></template>
