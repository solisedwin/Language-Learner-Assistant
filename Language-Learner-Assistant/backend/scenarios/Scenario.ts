
export default abstract class Scenario {
    scenario: string;
    abstract START_CONVERSATION: string;
    abstract CONTINUE_CONVERSATION: string;
    constructor(scenario : string) {
        this.scenario = scenario;
    }
}
