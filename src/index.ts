import { Action, ObjectTween } from "./Types";
import * as Utility from "./Utilities";

export default class<K extends keyof Tweenable & Instance> {
	//properties
	Objects: ObjectTween<K>[];
	Info: TweenInfo;
	Action: Action<K>;

	Tweens: Tween[] = [];
	isActive = false;
	PlaybackState: Enum.PlaybackState | undefined;
	LastAction = "";

	constructor(_instance: Instance | Instance[], info: TweenInfo, Action: Action<K>) {
		this.Info = info;

		if (type(_instance) === "table") {
			this.Objects = _instance as ObjectTween<K>[];
		} else {
			this.Objects = [_instance] as ObjectTween<K>[];
		}
		this.Action = Utility.Clear_Action(this.Objects, Action);
		this.Tweens = Utility.CreateTweens(this.Objects, info, this.Action);
	}

	ChangeAction(Action: Action<K>) {
		this.Action = Utility.Clear_Action(this.Objects, Action);
		this.Cancel();
	}
	Play() {
		this.LastAction = "Play";
		this.isActive = true;

		this.Tweens.forEach((tween) => {
			task.defer(() => {
				tween.Play();
			});
		});

		this.isActive = false;
	}
	Wait() {
		this.LastAction = "Wait";
		this.isActive = true;

		this.Tweens.forEach((tween) => {
			task.defer(() => {
				tween.Play();
			});
		});

		let isCompleted = false;
		task.defer(() => {
			while (!isCompleted) {
				this.Tweens.every((tween) => {
					const playbackState = tween.PlaybackState;
					if (playbackState === Enum.PlaybackState.Completed) {
						isCompleted = true;
					} else if (playbackState === Enum.PlaybackState.Cancelled) {
						isCompleted = true;
						return true;
					} else {
						isCompleted = false;
						return true;
					}
				});
				task.wait(0);
			}
			this.isActive = false;
		});
	}

	Pause() {
		this.LastAction = "Pause";
		this.isActive = true;

		this.Tweens.forEach((tween) => {
			task.defer(() => {
				tween.Pause();
			});
		});

		this.isActive = false;
	}

	Cancel() {
		this.LastAction = "Cancel";
		this.isActive = false;

		this.Tweens.forEach((tween) => {
			task.defer(() => {
				tween.Cancel();
			});
		});
	}
}
