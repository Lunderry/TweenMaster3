import { TweenService } from "@rbxts/services";
import { Action, functAction, ObjectTween } from "./Types";

function verifyAction(object: ObjectTween, action: Action): Action {
	const newAction: Action = {};

	for (const [index, property] of pairs(action)) {
		let result;

		if (type(property) === "function") {
			const funct = property as functAction;
			result = funct(object);
		}

		const success = pcall(() => {
			return object[property as keyof Tweenable & Instance];
		});

		if (success === undefined) {
			continue;
		}

		if (result === undefined) {
			result = success;
		}

		newAction[index] = result;
	}
	return newAction;
}
export function CreateTweens(objects: ObjectTween[], info: TweenInfo, action: Action): Tween[] {
	const tweens = [];
	for (const obj of objects) {
		const _action = verifyAction(obj, action) as Partial<ExtractMembers<Instance, Tweenable>>;
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
