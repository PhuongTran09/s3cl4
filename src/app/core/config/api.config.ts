import { InjectionToken } from '@angular/core';

export interface ApiConfig {
  baseUrl: string;
  timeoutMs: number;
  endpoints: {
    auth: {
      login: string;
      register: string;
      sendOtp: string;
      verifyReset: string;
    };
  };
}

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

export const defaultApiConfig: ApiConfig = {
  baseUrl: 'https://api.example.com',
  timeoutMs: 10000,
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      sendOtp: '/auth/send-otp',
      verifyReset: '/auth/reset-password'
    }
  }
};
