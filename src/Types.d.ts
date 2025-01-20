export type functAction = (instance: Instance) => Tweenable;

export type ObjectTween = Instance & { [key in keyof Tweenable]: boolean | undefined };
export type Action = Map<Tweenable, Tweenable | functAction>;
