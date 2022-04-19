import {CreepRole} from '../types/creepTypes'

export const getRoleCount = (role: CreepRole) => {
    const roles = Object.entries(Game.creeps).filter(([_, data]) => data.memory.role === role)
    return roles.length
}
