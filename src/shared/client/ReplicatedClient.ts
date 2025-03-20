import { ReplicatedStorage } from "@rbxts/services";
import { TweenMaster3 } from "../../..";
import { Action } from "../Types";

const SendTweenEvent = ReplicatedStorage.WaitForChild("_SendTweenMaster3") as RemoteEvent;
const GetTweenEvent = ReplicatedStorage.WaitForChild("_GetTweenMaster3") as RemoteFunction;

const Save: { [id: string]: TweenMaster3 } = {};

SendTweenEvent.OnClientEvent.Connect((...args: unknown[]) => {
	const [id, name, data] = args as [string, string, { Objects: Instance[]; Info: TweenInfo; Action: Action }];

	if (Save[id] === undefined) {
		const t = new TweenMaster3(data.Objects, data.Info, data.Action);
		Save[id] = t;
	}
	const tween = Save[id];

	switch (name) {
		case "Play": {
			tween.Play();
			break;
		}
		case "Pause": {
			tween.Pause();
			break;
		}
		case "Cancel": {
			tween.Cancel();
			break;
		}
		case "ChangeInfo": {
			tween.ChangeInfo(data.Info);
			break;
		}
		case "ChangeAction": {
			tween.ChangeAction(data.Action);
			break;
		}
		default: {
			break;
		}
	}
});
GetTweenEvent.OnClientInvoke = (...args: unknown[]) => {
	const [id, _, data] = args as [string, string, { Objects: Instance[]; Info: TweenInfo; Action: Action }];

	if (Save[id] === undefined) {
		const t = new TweenMaster3(data.Objects, data.Info, data.Action);
		Save[id] = t;
	}
	const tween = Save[id];
	tween.Wait();
};
