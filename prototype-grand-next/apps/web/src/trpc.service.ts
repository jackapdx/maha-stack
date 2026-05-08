import { Injectable } from '@angular/core';
import { httpBatchLink, type TRPCClient } from '@trpc/client';
import { createTRPCProxyClient } from '@trpc/client';
import type { AppRouter } from '../../api/src/trpc/trpc.router';

export function provideTrpcClient() {
  return {
    provide: TrpcService,
    useFactory: () => new TrpcService(),
    deps: [],
  };
}

@Injectable({
  providedIn: 'root',
})
export class TrpcService {
  public readonly client: TRPCClient<AppRouter> = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: this.getApiUrl(),
        fetch: (url, options) => {
          return fetch(url, {
            ...options,
            credentials: 'include',
          });
        },
      }),
    ],
  });

  private getApiUrl(): string {
    const envBaseUrl =
      (typeof process !== 'undefined' && process.env?.['API_URL']) ||
      (typeof (import.meta as any) !== 'undefined' && (import.meta as any).env?.['VITE_API_URL']);

    const baseUrl = envBaseUrl || 'http://localhost:3000';
    return `${baseUrl}/trpc`;
  }

  async getHealth() {
    return this.client.health.query();
  }

  async getUsers() {
    return this.client.users.list.query();
  }

  async getUser(id: string) {
    return this.client.users.get.query({ id });
  }

  async createUser(data: { name: string; email: string; role: 'user' | 'admin' }) {
    return this.client.users.create.mutate(data);
  }

  async login(email: string, password: string) {
    return this.client.auth.login.mutate({ email, password });
  }

  async register(name: string, email: string, password: string) {
    return this.client.auth.register.mutate({ name, email, password });
  }
}
