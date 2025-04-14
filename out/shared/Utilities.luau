-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local TweenService = TS.import(script, TS.getModule(script, "@rbxts", "services")).TweenService
local function verifyAction(object, action)
	local newAction = {}
	for index, property in pairs(action) do
		local result
		if type(property) == "function" then
			local funct = property
			result = funct(object)
		end
		local success = pcall(function()
			return object[property]
		end)
		if success == nil then
			continue
		end
		if result == nil then
			result = success
		end
		newAction[index] = result
	end
	return newAction
end
local function CreateTweens(objects, info, action)
	local tweens = {}
	for _, obj in objects do
		local _action = verifyAction(obj, action)
		local _tween = TweenService:Create(obj, info, _action)
		table.insert(tweens, _tween)
	end
	return tweens
end
local function _InitModel(model)
	local cframeValue = Instance.new("CFrameValue", script)
	cframeValue.Name = "_TweenModel"
	cframeValue.Value = model:GetPivot()
	local getPropertyChangedSignal = cframeValue:GetPropertyChangedSignal("Value"):Connect(function()
		model:PivotTo(cframeValue.Value)
	end)
	cframeValue.Destroying:Once(function()
		getPropertyChangedSignal:Disconnect()
	end)
	return cframeValue
end
return {
	CreateTweens = CreateTweens,
	_InitModel = _InitModel,
}
