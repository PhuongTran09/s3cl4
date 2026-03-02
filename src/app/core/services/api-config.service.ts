import { Inject, Injectable } from '@angular/core';
import { API_CONFIG, ApiConfig } from '../config/api.config';

type EndpointGroup = keyof ApiConfig['endpoints'];
type EndpointKey<TGroup extends EndpointGroup> = keyof ApiConfig['endpoints'][TGroup];

@Injectable({ providedIn: 'root' })
export class ApiConfigService {
  constructor(@Inject(API_CONFIG) private readonly config: ApiConfig) {}

  get timeoutMs(): number {
    return this.config.timeoutMs;
  }

  buildUrl<TGroup extends EndpointGroup>(group: TGroup, key: EndpointKey<TGroup>): string {
    const baseUrl = this.config.baseUrl.replace(/\/$/, '');
    const endpoint = String(this.config.endpoints[group][key]);
    return `${baseUrl}${endpoint}`;
  }
}
