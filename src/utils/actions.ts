import {ROOM, SPAWN, visualizePath} from './constants'
import { Debris, getNotFullEnergyStores, getStoresWhereEnergy } from './mapScraper'

export const mineEnergy = (creep: Creep): boolean => {
    // Gather energy from source
    if(creep.store.getFreeCapacity() === 0) return true;
    const sources = creep.room.find(FIND_SOURCES)
    if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE){
        creep.moveTo(sources[0], visualizePath.energy)
    }
    return false
}

export const storeEnergy = (creep: Creep): boolean => {
    const target = getNotFullEnergyStores()[0]
    if(!target || creep.store.getUsedCapacity() === 0) return true
    if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
        creep.moveTo(target,visualizePath.energy)
    }
    return false
}

export const getEnergyFromStore = (creep: Creep) => {
    const target = getStoresWhereEnergy()[0]
    if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, visualizePath.energy);
    }
}

export const upgrade = (creep: Creep): boolean => {
    if(!ROOM.controller) return true
    if(creep.pos.isNearTo(ROOM.controller)){
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) return true
        creep.upgradeController(ROOM.controller)
    }else{
        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
            getEnergyFromStore(creep)
        }else{
            creep.moveTo(ROOM.controller, visualizePath.upgrade)
        }
    }
    return false
}

export const haul = (creep: Creep, target: Debris) => {
    if(creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0){
        storeEnergy(creep)
    }else if(creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
        creep.moveTo(target, visualizePath.haul)
    }
    return true
}

export const clean = (creep: Creep, target: Resource<ResourceConstant>) => {
    if(creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0){
        storeEnergy(creep)
    }else if(creep.pickup(target) === ERR_NOT_IN_RANGE){
        creep.moveTo(target, visualizePath.haul)
    }
    return true
}
