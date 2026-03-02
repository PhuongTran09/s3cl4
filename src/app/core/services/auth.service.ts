import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface SendOtpRequest {
  email: string;
}

export interface VerifyResetRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface AuthResponse {
  message: string;
  accessToken?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfigService
  ) {}

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.buildUrl('auth', 'login'), payload);
  }

  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.buildUrl('auth', 'register'), payload);
  }

  sendOtp(payload: SendOtpRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.buildUrl('auth', 'sendOtp'), payload);
  }

  verifyReset(payload: VerifyResetRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.buildUrl('auth', 'verifyReset'), payload);
  }
}
