import { filter } from "lodash";
import { ROOM } from "./constants";

interface isAreaFreeProps{
    radius: number;
    filterCreeps?: boolean;
}
export const isAreaFree = ({radius = 1, filterCreeps}: isAreaFreeProps) => {

}

export const getEnergyStores = (): Array<StructureExtension | StructureSpawn | StructureContainer> => ROOM.find(FIND_STRUCTURES, {
    filter: (struct) => (
        struct.structureType === STRUCTURE_EXTENSION
        || struct.structureType === STRUCTURE_CONTAINER
        || struct.structureType === STRUCTURE_SPAWN
        )
    });

export const getStoresWhereEnergy = () => {
    const energyStores = getEnergyStores();
    const filtered = energyStores.filter(store => {
        if(store.store.getFreeCapacity(RESOURCE_ENERGY)){
            return store.store.getUsedCapacity(RESOURCE_ENERGY)! < 0
        }
        return false
    })
    return filtered
}

export const getNotFullEnergyStores = () => {
    const energyStores = getEnergyStores();
    const filtered = energyStores.filter(store => {
        if(store.store.getFreeCapacity(RESOURCE_ENERGY)){
            return store.store.getFreeCapacity(RESOURCE_ENERGY)! > 0
        }
        return false
    })
    return filtered
}

export type Debris = Tombstone | Ruin
export const getDebris = (): Array<Debris> => {
    const tombstones = ROOM.find(FIND_TOMBSTONES)
    const ruins = ROOM.find(FIND_RUINS, {filter: (ruin) => ruin.store.getUsedCapacity() > 0})
    return [...tombstones, ...ruins]
}

export const getDropped = (): Resource<ResourceConstant>[] => {
    const dropped = ROOM.find(FIND_DROPPED_RESOURCES)
    return [...dropped]
}
