export interface ClientEvents {
  [key: string]: () => void | undefined;
}
