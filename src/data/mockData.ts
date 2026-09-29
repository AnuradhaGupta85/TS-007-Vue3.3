// MOCK DATA — placeholder records for local development only.
// Replace with real API data before production use.
import type { Category, Transaction } from '../types'

export const mockCategories: Category[] = [
  'Food', 'Travel', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other',
].map((name, index) => ({ id: `category-${index + 1}`, name, type: 'predefined' }))

export const mockTransactions: Transaction[] = [
  { id: 't1', amount: 4200, type: 'Income', category: 'Salary', date: '2025-03-01', description: 'Monthly salary', createdAt: '2025-03-01T09:00:00Z', updatedAt: '2025-03-01T09:00:00Z' },
  { id: 't2', amount: 82.4, type: 'Expense', category: 'Food', date: '2025-03-04', description: 'Weekly grocery shop', createdAt: '2025-03-04T10:00:00Z', updatedAt: '2025-03-04T10:00:00Z' },
  { id: 't3', amount: 48.5, type: 'Expense', category: 'Travel', date: '2025-03-06', description: 'Train tickets', createdAt: '2025-03-06T11:00:00Z', updatedAt: '2025-03-06T11:00:00Z' },
  { id: 't4', amount: 18.99, type: 'Expense', category: 'Entertainment', date: '2025-03-08', description: 'Streaming subscription', createdAt: '2025-03-08T12:00:00Z', updatedAt: '2025-03-08T12:00:00Z' },
  { id: 't5', amount: 320, type: 'Income', category: 'Freelance', date: '2025-03-10', description: 'Design project', createdAt: '2025-03-10T13:00:00Z', updatedAt: '2025-03-10T13:00:00Z' },
  { id: 't6', amount: 125.3, type: 'Expense', category: 'Bills', date: '2025-03-12', description: 'Electricity bill', createdAt: '2025-03-12T14:00:00Z', updatedAt: '2025-03-12T14:00:00Z' },
  { id: 't7', amount: 36, type: 'Expense', category: 'Health', date: '2025-02-18', description: 'Pharmacy', createdAt: '2025-02-18T14:00:00Z', updatedAt: '2025-02-18T14:00:00Z' },
  { id: 't8', amount: 64, type: 'Expense', category: 'Shopping', date: '2025-02-22', description: 'Home supplies', createdAt: '2025-02-22T14:00:00Z', updatedAt: '2025-02-22T14:00:00Z' },
]
