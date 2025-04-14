-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local HttpService = _services.HttpService
local ReplicatedStorage = _services.ReplicatedStorage
local RunService = _services.RunService
local BaseTweenMaster = TS.import(script, script, "BaseTweenMaster").default
local CreateRemoteTweenServer = TS.import(script, script, "server", "CreateRemoteTweenServer").default
local ReplicatedClient = TS.import(script, script, "client", "ReplicatedClient").default
local TweenMaster3
do
	local super = BaseTweenMaster
	TweenMaster3 = setmetatable({}, {
		__tostring = function()
			return "TweenMaster3"
		end,
		__index = super,
	})
	TweenMaster3.__index = TweenMaster3
	function TweenMaster3.new(...)
		local self = setmetatable({}, TweenMaster3)
		return self:constructor(...) or self
	end
	function TweenMaster3:constructor(...)
		super.constructor(self, ...)
	end
end
local SendTweenEvent = ReplicatedStorage:WaitForChild("_SendTweenMaster3")
local GetTweenEvent = ReplicatedStorage:WaitForChild("_GetTweenMaster3")
local ServerTweenMaster3
do
	local super = BaseTweenMaster
	ServerTweenMaster3 = setmetatable({}, {
		__tostring = function()
			return "ServerTweenMaster3"
		end,
		__index = super,
	})
	ServerTweenMaster3.__index = ServerTweenMaster3
	function ServerTweenMaster3.new(...)
		local self = setmetatable({}, ServerTweenMaster3)
		return self:constructor(...) or self
	end
	function ServerTweenMaster3:constructor(_instance, info, action)
		super.constructor(self, _instance, info, action)
		self.ID = HttpService:GenerateGUID(true)
	end
	function ServerTweenMaster3:SendControl(name, plr)
		local dataTween = {
			Objects = self.Objects,
			Info = self.Info,
			Action = self.Action,
		}
		if plr ~= nil then
			SendTweenEvent:FireClient(plr, self.ID, name, dataTween)
		else
			SendTweenEvent:FireAllClients(self.ID, name, dataTween)
		end
	end
	function ServerTweenMaster3:ChangeAction(action, plr)
		self:SendControl("ChangeAction", plr)
		self.Action = action
	end
	function ServerTweenMaster3:ChangeInfo(info, plr)
		self:SendControl("ChangeInfo", plr)
		self.Info = info
	end
	function ServerTweenMaster3:Play(plr)
		self:SendControl("Play", plr)
	end
	function ServerTweenMaster3:Wait(plr)
		if plr == nil then
			return nil
		end
		GetTweenEvent:InvokeClient(plr)
	end
	function ServerTweenMaster3:Pause(plr)
		self:SendControl("Pause", plr)
	end
	function ServerTweenMaster3:Cancel(plr)
		self:SendControl("Cancel", plr)
	end
end
local function Initialization()
	if RunService:IsServer() then
		CreateRemoteTweenServer()
	else
		ReplicatedClient(TweenMaster3)
	end
end
return {
	Initialization = Initialization,
	TweenMaster3 = TweenMaster3,
	ServerTweenMaster3 = ServerTweenMaster3,
}
