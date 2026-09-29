import { defineStore } from 'pinia'
import { mockCategories } from '../data/mockData'
import { api } from '../services/api'
import type { Category } from '../types'

const USE_MOCK = true
const storageKey = 'expense_tracker_categories'

export const useCategoryStore = defineStore('categories', () => {
  // MOCK: Reads seeded categories and any custom categories saved in browser storage.
  function load(): Category[] {
    const saved = localStorage.getItem(storageKey)
    if (saved) return JSON.parse(saved) as Category[]
    localStorage.setItem(storageKey, JSON.stringify(mockCategories))
    return [...mockCategories]
  }
  // MOCK: Returns locally persisted category records.
  function localGetAll(): Category[] { return load() }
  // MOCK: Creates a custom browser-persisted category.
  function localCreate(name: string): Category {
    const categories = load()
    const category = { id: crypto.randomUUID(), name, type: 'custom' as const }
    categories.push(category)
    localStorage.setItem(storageKey, JSON.stringify(categories))
    return category
  }
  // MOCK: Deletes a custom category from browser storage.
  function localDelete(id: string): void { localStorage.setItem(storageKey, JSON.stringify(load().filter((category) => category.id !== id))) }

  // TODO(USE_MOCK): verify categories API paths and response schema before setting false.
  async function getAll(): Promise<Category[]> { return USE_MOCK ? localGetAll() : (await api.get<Category[]>('/api/v1/categories')).data }
  async function create(name: string): Promise<Category> { return USE_MOCK ? localCreate(name) : (await api.post<Category>('/api/v1/categories', { name })).data }
  async function remove(id: string): Promise<void> { if (USE_MOCK) localDelete(id); else await api.delete(`/api/v1/categories/${id}`) }

  return { getAll, create, remove }
})
