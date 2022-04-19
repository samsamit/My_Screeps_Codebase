import { SPAWN } from "../utils/constants"
import {clean, haul, mineEnergy, storeEnergy, upgrade} from "../utils/actions"
import { getDebris, getDropped } from "utils/mapScraper"

type Action = "idle" | "mine" | "store" | "upgrade" | "haul" | "clean"
export const Handyman = {
    run: (creep: Creep) => {
        setAction(creep)
        switch(creep.memory.action as Action){
            case "mine":
                if(mineEnergy(creep)){
                    creep.memory.action = "idle"
                }
                break;
            case "store":
                if(storeEnergy(creep)){
                    creep.memory.action = "idle"
                }
                break;
            case "upgrade":
                if(upgrade(creep)){
                    creep.memory.action = "idle"
                }
                break;
            case "haul":
                const debris = getDebris()
                if(haul(creep, debris[getHandymans('haul')])){
                    creep.memory.action = "idle"
                }
                break;
            case "clean":
                const dropped = getDropped()
                if(clean(creep, dropped[getHandymans('clean')])){
                    creep.memory.action = "idle"
                }
                break;
            default:
                break;
        }
    },
    create: () => {
        SPAWN.spawnCreep(
            ["work", "work", "carry", "move"],
            `handyman-${Game.time}`,
            {memory: {role: "handyman", action: "idle"}})
    }
}

const setAction = (creep: Creep) => {
    if(creep.memory.action !== "idle") return;
    if(SPAWN.store.getFreeCapacity(RESOURCE_ENERGY) === 0){
        creep.say('Upgr')
        creep.memory.action = "upgrade"
        return
    }
    if(getDropped().length > getHandymans('clean')){
        creep.memory.action = "clean"
        creep.say('Clen')
        return
    }
    if(getDebris().length > getHandymans('haul')){
        creep.memory.action = "haul"
        creep.say('Haul')
        return
    }
    if(creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0){
        creep.say('Stor')
        creep.memory.action = "store"
        return
    }
    if(creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0){
        creep.say('Mine')
        creep.memory.action = "mine"
        return
    }
}


const getHandymans = (action: Action) => {
    const hauling = Object.entries(Game.creeps).filter(([_, creep]) => creep.memory.action === action)
    return hauling.length
}
