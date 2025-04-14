import { HttpService, Players, ReplicatedStorage, RunService } from "@rbxts/services";
import BaseTweenMaster from "./BaseTweenMaster";
import { Action } from "./Types";
import CreateRemoteTweenServer from "./server/CreateRemoteTweenServer";
import ReplicatedClient from "./client/ReplicatedClient";

export class TweenMaster3 extends BaseTweenMaster {}

const SendTweenEvent = ReplicatedStorage.WaitForChild("_SendTweenMaster3") as RemoteEvent;
const GetTweenEvent = ReplicatedStorage.WaitForChild("_GetTweenMaster3") as RemoteFunction;

export class ServerTweenMaster3 extends BaseTweenMaster {
	private readonly ID: string;
	constructor(_instance: Instance | Instance[], info: TweenInfo, action: Action) {
		super(_instance, info, action);
		this.ID = HttpService.GenerateGUID(true);
	}
	private SendControl(name: string, plr?: Player): void {
		const dataTween = {
			Objects: this.Objects,
			Info: this.Info,
			Action: this.Action,
		};
		if (plr !== undefined) {
			SendTweenEvent.FireClient(plr, this.ID, name, dataTween);
		} else {
			SendTweenEvent.FireAllClients(this.ID, name, dataTween);
		}
	}
	private FinishAction(_wait = false): void {
		const t = _wait === true ? 0 : this.Info.Time;

		task.delay(t, () => {
			this.Objects.forEach((object) => {
				for (const [i, v] of pairs(this.Action)) {
					const obj = object as unknown as Record<string, unknown>;

					obj[i] = v;
				}
			});
		});
	}

	ChangeAction(action: Action, plr?: Player) {
		this.SendControl("ChangeAction", plr);
		this.Action = action;
	}
	ChangeInfo(info: TweenInfo, plr?: Player) {
		this.SendControl("ChangeInfo", plr);
		this.Info = info;
	}

	Play(plr?: Player): void {
		this.SendControl("Play", plr);
		this.FinishAction();
	}
	// It only works with player
	Wait(plr?: Player): void {
		if (plr === undefined) {
			return;
		}
		GetTweenEvent.InvokeClient(plr);
		this.FinishAction(true);
	}

	Pause(plr?: Player): void {
		this.SendControl("Pause", plr);
	}

	Cancel(plr?: Player): void {
		this.SendControl("Cancel", plr);
	}
}

export function Initialization() {
	if (RunService.IsServer()) {
		CreateRemoteTweenServer();
	} else {
		ReplicatedClient(TweenMaster3);
	}
}
