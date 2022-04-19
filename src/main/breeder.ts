import {SETTINGS} from "../utils/constants"
import { getRoleCount } from "../utils/functions"
import {Handyman} from "../roles/handyman"

export const breeder = () => {
    if(getRoleCount('handyman') < SETTINGS.maxHandymans){
        Handyman.create()
    }
}
