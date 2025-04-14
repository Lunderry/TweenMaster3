-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local ReplicatedStorage = TS.import(script, TS.getModule(script, "@rbxts", "services")).ReplicatedStorage
local function default(TweenMaster3)
	local SendTweenEvent = ReplicatedStorage:WaitForChild("_SendTweenMaster3")
	local GetTweenEvent = ReplicatedStorage:WaitForChild("_GetTweenMaster3")
	local Save = {}
	SendTweenEvent.OnClientEvent:Connect(function(...)
		local args = { ... }
		local _binding = args
		local id = _binding[1]
		local name = _binding[2]
		local data = _binding[3]
		if Save[id] == nil then
			local t = TweenMaster3.new(data.Objects, data.Info, data.Action)
			Save[id] = t
		end
		local tween = Save[id]
		repeat
			if name == "Play" then
				tween:Play()
				break
			end
			if name == "Pause" then
				tween:Pause()
				break
			end
			if name == "Cancel" then
				tween:Cancel()
				break
			end
			if name == "ChangeInfo" then
				tween:ChangeInfo(data.Info)
				break
			end
			if name == "ChangeAction" then
				tween:ChangeAction(data.Action)
				break
			end
			do
				break
			end
		until true
	end)
	GetTweenEvent.OnClientInvoke = function(...)
		local args = { ... }
		local _binding = args
		local id = _binding[1]
		local _ = _binding[2]
		local data = _binding[3]
		if Save[id] == nil then
			local t = TweenMaster3.new(data.Objects, data.Info, data.Action)
			Save[id] = t
		end
		local tween = Save[id]
		tween:Wait()
	end
end
return {
	default = default,
}
