import { TweenService } from "@rbxts/services";
import { Action, functAction, ObjectTween } from "./Types";

export function Clear_Action<K extends keyof Tweenable & Instance>(object: Instance[], action: Action<K>): Action<K> {
	const map: Action<K> = new Map();

	for (const [property, act] of action) {
		if (type(act) === "function") {
			const funct = act as functAction<K>;
			map.set(property, funct(object));
			continue;
		}
		const result = act;

		map.set(property, result);
	}
	return map;
}

function verifyAction<K extends keyof Tweenable & Instance>(object: ObjectTween<K>, Action: Action<K>): Action<K> {
	const action: Action<K> = new Map();

	Action.forEach((property, index) => {
		if (type(property) === "function") {
			return;
		}
		const success = pcall(() => {
			return object[property as K];
		});

		if (success === undefined) {
			return;
		}
		action.set(index, property);
	});

	return action;
}
export function CreateTweens<K extends keyof Tweenable & Instance>(
	objects: ObjectTween<K>[],
	info: TweenInfo,
	Action: Action<K>,
): Tween[] {
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

print("a");
