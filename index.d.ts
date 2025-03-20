import { Action, ObjectTween } from "./src/shared/Types";

declare class TweenMaster3 {
	Objects: ObjectTween[];
	Info: TweenInfo;
	Action: Action;

	Tweens: Tween[];
	isActive: boolean;
	LastAction: string;
	constructor(_instance: Instance | Instance[], info: TweenInfo, Action: Action);

	ChangeAction(Action: Action): void;
	ChangeInfo(info: TweenInfo): void;
	Play(): void;
	Stop(): void;
	Pause(): void;
	Wait(): void;
	Cancel(): void;
}
