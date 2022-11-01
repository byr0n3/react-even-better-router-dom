type EventListener<T extends Event = Event> = (this: Window, event: T) => void;

export type { EventListener };
