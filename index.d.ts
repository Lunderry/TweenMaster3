import { Action, ObjectTween } from "./src/shared/Types";

declare class TweenMaster3 {
	Objects: ObjectTween[];
	Info: TweenInfo;
	Action: Action;

	Tweens: Tween[];
	isActive: boolean;
	LastAction: string;
	constructor(_instance: Instance | Instance[], info: TweenInfo, action: Action);

	ChangeAction(Action: Action): void;
	ChangeInfo(info: TweenInfo): void;
	Play(): void;
	Stop(): void;
	Pause(): void;
	Wait(): void;
	Cancel(): void;
}

declare class ServerTweenMaster3 extends TweenMaster3 {
	private readonly ID: string;

	ChangeAction(Action: Action, plr?: Player): void;
	ChangeInfo(info: TweenInfo, plr?: Player): void;
	Play(plr?: Player): void;
	Stop(plr?: Player): void;
	Pause(plr?: Player): void;
	Wait(plr?: Player): void;
	Cancel(plr?: Player): void;
}
