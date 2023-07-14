import { ENCOUNTER, roll } from "./common";
import { yesNo } from "./yesNo";

export const encounter = (_modifier: number): ENCOUNTER => {
  let hasEncounter = yesNo(_modifier);

  if (!hasEncounter.toLowerCase().contains("yes")) {
    return ENCOUNTER.NONE;
  }

  const rolled = roll();

  if (rolled < 10) {
    return ENCOUNTER.REQUEST;
  }
  if (rolled < 20) {
    return ENCOUNTER.INCONSEQUENTIAL;
  }
  if (rolled < 30) {
    return ENCOUNTER.INFORMATIVE;
  }
  if (rolled < 40) {
    return ENCOUNTER.DISRUPTIVE;
  }
  if (rolled < 50) {
    return ENCOUNTER.DECEPTIVE;
  }
  if (rolled < 60) {
    return ENCOUNTER.DEFENSIVE;
  }
  if (rolled < 70) {
    return ENCOUNTER.REQUEST;
  }
  if (rolled < 80) {
    return ENCOUNTER.INFORMATIVE;
  }
  if (rolled < 90) {
    return ENCOUNTER.INCONSEQUENTIAL;
  }
  return ENCOUNTER.AGGRESSIVE;
};
