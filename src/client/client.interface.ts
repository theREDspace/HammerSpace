export interface ClientEvents {
  [key: string]: (data?: {}) => void | undefined;
}

export interface ClientType {
  [key: string]: (
    name: {} | string,
    data?: string,
    isRebound?: boolean
  ) => void;
}
