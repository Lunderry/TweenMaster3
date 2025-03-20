import { ReplicatedStorage } from "@rbxts/services";

const SendTweenEvent = new Instance("RemoteEvent", ReplicatedStorage);
SendTweenEvent.Name = "_SendTweenMaster3";

const GetTweenEvent = new Instance("RemoteFunction", ReplicatedStorage);
GetTweenEvent.Name = "_GetTweenMaster3";
