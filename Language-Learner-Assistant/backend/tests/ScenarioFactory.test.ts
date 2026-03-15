import { describe, expect, it } from "vitest";
import { ScenarioFactory } from "../scenarios/ScenarioFactory";
import type { RoleplayScenario } from "@shared/types/RoleplayScenario";
import Scenario from "../scenarios/Scenario";
import Hotel from "../scenarios/Hotel";

const scenarioFactory = new ScenarioFactory();

describe("Returns correct scenario class ", () => {
  it("Gives us an instance of the Hotel class", () => {
    let hotel: RoleplayScenario = "Hotel";
    const scenarioClass: Scenario = scenarioFactory.getScenario(hotel);
    expect(scenarioClass).toBeInstanceOf(Hotel);
  });
});
