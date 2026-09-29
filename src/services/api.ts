const toast = {
  error: (message: string) => window.dispatchEvent(new CustomEvent('expense-tracker-api-error', { detail: message })),
}

const baseUrl = import.meta.env.VITE_API_URL || ''

async function request<T>(path: string, options: RequestInit = {}): Promise<{ data: T }> {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
    if (!response.ok) throw new Error('Request failed. Please try again.')
    return { data: await response.json() as T }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Request failed. Please try again.')
    throw error
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
