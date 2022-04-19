import { Handyman } from "../roles/handyman"
import { CreepRole } from "../types/creepTypes"

export const runCreeps = () => {
    for(let name in Game.creeps){
        const creep = Game.creeps[name]
        switch(creep.memory.role as CreepRole){
            case "handyman":
                Handyman.run(creep)
        }
    }
}
