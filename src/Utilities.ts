import { TweenService } from "@rbxts/services";
import { Action, functAction, ObjectTween } from "./Types";

function verifyAction(object: ObjectTween, Action: Action): Action {
	const action: Action = new Map();

	Action.forEach((property, index) => {
		let result;

		if (type(property) === "function") {
			const funct = property as functAction;
			result = funct(object);
		}

		const success = pcall(() => {
			return object[property as keyof Tweenable & Instance];
		});

		if (success === undefined) {
			return;
		}

		if (result === undefined) {
			result = success;
		}

		action.set(index, result);
	});

	return action;
}
export function CreateTweens(objects: ObjectTween[], info: TweenInfo, Action: Action): Tween[] {
	const tweens = [];
	for (const obj of objects) {
		const _action = verifyAction(obj, Action) as Partial<ExtractMembers<Instance, Tweenable>>;
		const _tween = TweenService.Create(obj, info, _action);
		tweens.push(_tween);
	}
	return tweens;
}

export function _InitModel(model: Model): CFrameValue {
	const cframeValue = new Instance("CFrameValue", script);
	cframeValue.Name = "_TweenModel";
	cframeValue.Value = model.GetPivot();

	const getPropertyChangedSignal = cframeValue.GetPropertyChangedSignal("Value").Connect(() => {
		model.PivotTo(cframeValue.Value);
	});

	cframeValue.Destroying.Once(() => {
		getPropertyChangedSignal.Disconnect();
	});

	return cframeValue;
}
