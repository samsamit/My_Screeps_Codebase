import { breeder } from "main/breeder";
import { runCreeps } from "main/runCreeps";
import { CreepRole } from "types/creepTypes";
import { ErrorMapper } from "utils/ErrorMapper";

export const loop = ErrorMapper.wrapLoop(() => {
  breeder()
  runCreeps()

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});

declare global {
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory{
    role: CreepRole;
    action: string;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

