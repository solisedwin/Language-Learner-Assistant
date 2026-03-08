import type {RoleplayScenario} from '@shared/types/RoleplayScenario'
import Scenario from './Scenario.ts'
import Hotel from './Hotel.ts'
import SuperMarket from './SuperMarket.ts'
import TrainStation from './TrainStation.ts'

 export class ScenarioFactory {
    getScenario(scenario: RoleplayScenario) : Scenario {
        switch(scenario){
            case 'Supermarket':
                return new SuperMarket();
            case 'TrainStation':
                return new TrainStation();
            case 'Hotel':
                return new Hotel();
            default:
                let unknownScenario: never = scenario;
                return unknownScenario
        }
    }
 }