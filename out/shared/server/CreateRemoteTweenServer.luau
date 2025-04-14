-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local ReplicatedStorage = TS.import(script, TS.getModule(script, "@rbxts", "services")).ReplicatedStorage
local function default()
	local SendTweenEvent = Instance.new("RemoteEvent", ReplicatedStorage)
	SendTweenEvent.Name = "_SendTweenMaster3"
	local GetTweenEvent = Instance.new("RemoteFunction", ReplicatedStorage)
	GetTweenEvent.Name = "_GetTweenMaster3"
end
return {
	default = default,
}
