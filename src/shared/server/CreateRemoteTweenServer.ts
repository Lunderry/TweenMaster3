import { ReplicatedStorage } from "@rbxts/services";

export default function () {
	const SendTweenEvent = new Instance("RemoteEvent", ReplicatedStorage);
	SendTweenEvent.Name = "_SendTweenMaster3";

	const GetTweenEvent = new Instance("RemoteFunction", ReplicatedStorage);
	GetTweenEvent.Name = "_GetTweenMaster3";
}
