import { Client } from '../client/client';

export interface ReboundEvent {
  id?: string,
  event: string,
  value?: string | number | object
}

export interface ReboundType {
  [key: string]: (name: {} | string, data?: string) => void;
}

export interface ReboundConfig {
	id: string,
	client: Client,
	autoConnect?: boolean
}