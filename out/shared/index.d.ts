import BaseTweenMaster from "./BaseTweenMaster";
import { Action } from "./Types";
export declare class TweenMaster3 extends BaseTweenMaster {
}
export declare class ServerTweenMaster3 extends BaseTweenMaster {
    private readonly ID;
    constructor(_instance: Instance | Instance[], info: TweenInfo, action: Action);
    private SendControl;
    private FinishAction;
    ChangeAction(action: Action, plr?: Player): void;
    ChangeInfo(info: TweenInfo, plr?: Player): void;
    Play(plr?: Player): void;
    Wait(plr?: Player): void;
    Pause(plr?: Player): void;
    Cancel(plr?: Player): void;
}
export declare function Initialization(): void;
