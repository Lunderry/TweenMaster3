import { Action, ObjectTween } from "./Types";
export default abstract class {
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
    Wait(): void;
    Pause(): void;
    Cancel(): void;
}
