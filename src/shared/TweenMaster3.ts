import { HttpService, Players, ReplicatedStorage } from "@rbxts/services";
import BaseTweenMaster from "./BaseTweenMaster";
import { Action } from "./Types";

export class TweenMaster3 extends BaseTweenMaster {}

const SendTweenEvent = ReplicatedStorage.WaitForChild("_SendTweenMaster3") as RemoteEvent;
const GetTweenEvent = ReplicatedStorage.WaitForChild("_GetTweenMaster3") as RemoteFunction;

export class ServerTweenMaster3 extends BaseTweenMaster {
	private readonly ID: string;
	constructor(_instance: Instance | Instance[], info: TweenInfo, action: Action) {
		super(_instance, info, action);
		this.ID = HttpService.GenerateGUID(true);
	}
	private SendControl(name: string, plr?: Player, otherData?: unknown): void {
		if (plr !== undefined) {
			SendTweenEvent.FireClient(plr, this.ID, name, otherData);
		} else {
			SendTweenEvent.FireAllClients(this.ID, name, otherData);
		}
	}

	ChangeAction(action: Action, plr?: Player) {
		this.SendControl("ChangeAction", plr, action);
		this.Cancel();
	}
	ChangeInfo(info: TweenInfo, plr?: Player) {
		this.SendControl("ChangeInfo", plr, info);
		this.Info = info;
	}

	Play(plr?: Player): void {
		this.SendControl("Play", plr);
	}
	// It only works with player
	Wait(plr?: Player): void {
		if (plr === undefined) {
			return;
		}
		GetTweenEvent.InvokeClient(plr);
	}

	Pause(plr?: Player): void {
		this.SendControl("Pause", plr);
	}

	Cancel(plr?: Player): void {
		this.SendControl("Cancel", plr);
	}
}
