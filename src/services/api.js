// src/services/api.js
import config from '../config/config';

export const apiService = {
  // Base fetch wrapper with common configuration
  async fetch(endpoint, options = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      // Add auth header if token exists
      ...(localStorage.getItem('token') && {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };

    const response = await fetch(`${config.API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  },

  // Common API methods
  get(endpoint) {
    return this.fetch(endpoint);
  },

  post(endpoint, data) {
    return this.fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put(endpoint, data) {
    return this.fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(endpoint, data) {
    return this.fetch(endpoint, {
      method: 'DELETE',
      ...(data && { body: JSON.stringify(data) }),
    });
  },
};