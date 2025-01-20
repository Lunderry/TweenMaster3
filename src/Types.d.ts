export type functAction<K> = (instance: Instance[]) => K;

export type ObjectTween<K> = Instance & { [key in keyof K]: boolean | undefined };
export type Action<K extends keyof Tweenable & Instance> = Map<Tweenable, K | functAction<K>>;
