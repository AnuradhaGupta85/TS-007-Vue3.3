import { defineStore } from 'pinia'
import { mockTransactions } from '../data/mockData'
import { api } from '../services/api'
import type { Transaction, TransactionInput } from '../types'

const USE_MOCK = true
const storageKey = 'expense_tracker_transactions'

export const useTransactionStore = defineStore('transactions', () => {
  // MOCK: Reads seeded local transaction records until a real transactions endpoint is connected.
  function load(): Transaction[] {
    const saved = localStorage.getItem(storageKey)
    if (saved) return JSON.parse(saved) as Transaction[]
    localStorage.setItem(storageKey, JSON.stringify(mockTransactions))
    return [...mockTransactions]
  }

  // MOCK: Returns the locally persisted transaction collection.
  function localGetAll(): Transaction[] { return load() }
  // MOCK: Returns one locally persisted transaction by its identifier.
  function localGetById(id: string): Transaction | undefined { return load().find((transaction) => transaction.id === id) }
  // MOCK: Creates and persists a transaction in browser storage.
  function localCreate(input: TransactionInput): Transaction {
    const transactions = load()
    const timestamp = new Date().toISOString()
    const transaction = { ...input, id: crypto.randomUUID(), createdAt: timestamp, updatedAt: timestamp }
    transactions.unshift(transaction)
    localStorage.setItem(storageKey, JSON.stringify(transactions))
    return transaction
  }
  // MOCK: Updates and persists a transaction in browser storage.
  function localUpdate(id: string, input: TransactionInput): Transaction | undefined {
    const transactions = load()
    const index = transactions.findIndex((transaction) => transaction.id === id)
    if (index < 0) return undefined
    transactions[index] = { ...transactions[index], ...input, updatedAt: new Date().toISOString() }
    localStorage.setItem(storageKey, JSON.stringify(transactions))
    return transactions[index]
  }
  // MOCK: Deletes a transaction from browser storage.
  function localDelete(id: string): void {
    localStorage.setItem(storageKey, JSON.stringify(load().filter((transaction) => transaction.id !== id)))
  }

  // TODO(USE_MOCK): verify transaction API paths and response schema before setting false.
  async function getAll(): Promise<Transaction[]> { return USE_MOCK ? localGetAll() : (await api.get<Transaction[]>('/api/v1/transactions')).data }
  async function getById(id: string): Promise<Transaction | undefined> { return USE_MOCK ? localGetById(id) : (await api.get<Transaction>(`/api/v1/transactions/${id}`)).data }
  async function create(input: TransactionInput): Promise<Transaction> { return USE_MOCK ? localCreate(input) : (await api.post<Transaction>('/api/v1/transactions', input)).data }
  async function update(id: string, input: TransactionInput): Promise<Transaction | undefined> { return USE_MOCK ? localUpdate(id, input) : (await api.put<Transaction>(`/api/v1/transactions/${id}`, input)).data }
  async function remove(id: string): Promise<void> { if (USE_MOCK) localDelete(id); else await api.delete(`/api/v1/transactions/${id}`) }

  return { getAll, getById, create, update, remove }
})
