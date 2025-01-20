import { Action, ObjectTween } from "./Types";
import * as Utility from "./Utilities";

export default class {
	//properties
	Objects: ObjectTween[];
	Info: TweenInfo;
	Action: Action;

	Tweens: Tween[] = [];
	isActive = false;
	LastAction = "";

	constructor(_instance: Instance | Instance[], info: TweenInfo, Action: Action) {
		this.Info = info;

		if (type(_instance) === "table") {
			this.Objects = _instance as ObjectTween[];
		} else {
			this.Objects = [_instance] as ObjectTween[];
		}
		this.Action = Action;
	}

	ChangeAction(Action: Action) {
		this.Action = Action;
		this.Cancel();
	}
	ChangeInfo(info: TweenInfo) {
		this.Info = info;
		this.Cancel();
	}
	Play() {
		this.Tweens = Utility.CreateTweens(this.Objects, this.Info, this.Action);

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
		this.Tweens = Utility.CreateTweens(this.Objects, this.Info, this.Action);

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
