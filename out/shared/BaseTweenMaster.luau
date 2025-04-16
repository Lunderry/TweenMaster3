-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local Utility = TS.import(script, script.Parent, "Utilities")
local default
do
	default = {}
	function default:constructor(_instance, info, Action)
		self.Tweens = {}
		self.isActive = false
		self.LastAction = ""
		self.Info = info
		if type(_instance) == "table" then
			self.Objects = _instance
		else
			self.Objects = { _instance }
		end
		self.Action = Action
	end
	function default:ChangeAction(Action)
		self.Action = Action
		self:Cancel()
	end
	function default:ChangeInfo(info)
		self.Info = info
		self:Cancel()
	end
	function default:Play()
		self.Tweens = Utility.CreateTweens(self.Objects, self.Info, self.Action)
		self.LastAction = "Play"
		self.isActive = true
		local _exp = self.Tweens
		-- ▼ ReadonlyArray.forEach ▼
		local _callback = function(tween)
			task.defer(function()
				tween:Play()
			end)
		end
		for _k, _v in _exp do
			_callback(_v, _k - 1, _exp)
		end
		-- ▲ ReadonlyArray.forEach ▲
		self.isActive = false
	end
	function default:Wait()
		self.Tweens = Utility.CreateTweens(self.Objects, self.Info, self.Action)
		self.LastAction = "Wait"
		self.isActive = true
		local _exp = self.Tweens
		-- ▼ ReadonlyArray.forEach ▼
		local _callback = function(tween)
			task.defer(function()
				tween:Play()
			end)
		end
		for _k, _v in _exp do
			_callback(_v, _k - 1, _exp)
		end
		-- ▲ ReadonlyArray.forEach ▲
		local isCompleted = false
		while not isCompleted do
			local _exp_1 = self.Tweens
			-- ▼ ReadonlyArray.every ▼
			local _result = true
			local _callback_1 = function(tween)
				local playbackState = tween.PlaybackState
				if playbackState == Enum.PlaybackState.Completed then
					isCompleted = true
				elseif playbackState == Enum.PlaybackState.Cancelled then
					isCompleted = true
					return true
				else
					isCompleted = false
					return true
				end
			end
			for _k, _v in _exp_1 do
				if not _callback_1(_v, _k - 1, _exp_1) then
					_result = false
					break
				end
			end
			-- ▲ ReadonlyArray.every ▲
			task.wait(0)
		end
		self.isActive = false
	end
	function default:Pause()
		self.LastAction = "Pause"
		self.isActive = true
		local _exp = self.Tweens
		-- ▼ ReadonlyArray.forEach ▼
		local _callback = function(tween)
			task.defer(function()
				tween:Pause()
			end)
		end
		for _k, _v in _exp do
			_callback(_v, _k - 1, _exp)
		end
		-- ▲ ReadonlyArray.forEach ▲
		self.isActive = false
	end
	function default:Cancel()
		self.LastAction = "Cancel"
		self.isActive = false
		local _exp = self.Tweens
		-- ▼ ReadonlyArray.forEach ▼
		local _callback = function(tween)
			task.defer(function()
				tween:Cancel()
			end)
		end
		for _k, _v in _exp do
			_callback(_v, _k - 1, _exp)
		end
		-- ▲ ReadonlyArray.forEach ▲
	end
end
return {
	default = default,
}
