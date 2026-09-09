export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiClient {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    return headers;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async toggleSavePrompt(promptId: string): Promise<{ saved: boolean; saveCount: number }> {
    return this.post<{ saved: boolean; saveCount: number }>(`/api/users/saved-prompts/${promptId}`, {});
  }

  async getSavedPrompts<T = any[]>(): Promise<T> {
    return this.get<T>('/api/users/saved-prompts');
  }

  private async handleResponse(response: Response) {
    const json = await response.json().catch(() => ({}));
    if (!response.ok || !json.success) {
      if (response.status === 401 && typeof window !== 'undefined') {
        // Handle unauthorized / token expired
        localStorage.removeItem('token');
        // Optionally redirect to login or dispatch an event
      }
      throw new Error(json.error || response.statusText || 'API Error');
    }
    return json.data;
  }
}

export const api = new ApiClient();
